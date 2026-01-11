
import { supabase, isSupabaseLive } from './supabaseClient';
import { Level, Question, LevelPhase } from '../types';

// Helper: Extract options from various potential column formats
const extractOptions = (row: any): string[] => {
    // 1. If 'detective_data' exists and has suspects, use them as options priority for detective type
    if (row.detective_data && row.detective_data.suspects && Array.isArray(row.detective_data.suspects)) {
        return row.detective_data.suspects;
    }
    // Handle stringified JSON in detective_data if coming from CSV import sometimes
    if (typeof row.detective_data === 'string') {
        try {
            const parsed = JSON.parse(row.detective_data);
            if (parsed.suspects && Array.isArray(parsed.suspects)) return parsed.suspects;
        } catch (e) {}
    }

    // 2. If 'options' column exists and is an array (JSONB)
    if (Array.isArray(row.options)) return row.options;

    // 3. If 'options' is a stringified JSON array
    if (typeof row.options === 'string') {
        try {
            const parsed = JSON.parse(row.options);
            if (Array.isArray(parsed)) return parsed;
        } catch (e) {
            // Not valid JSON, ignore
        }
    }

    const collected: string[] = [];

    // 4. Check for separate columns: option_a, option_b... (Common in CSV imports)
    if (row.option_a) collected.push(row.option_a.toString());
    if (row.option_b) collected.push(row.option_b.toString());
    if (row.option_c) collected.push(row.option_c.toString());
    if (row.option_d) collected.push(row.option_d.toString());
    if (row.option_e) collected.push(row.option_e.toString());

    if (collected.length > 0) return collected;

    // 5. Check for option1, option2...
    if (row.option1) collected.push(row.option1.toString());
    if (row.option2) collected.push(row.option2.toString());
    if (row.option3) collected.push(row.option3.toString());
    if (row.option4) collected.push(row.option4.toString());

    // 6. Check for A, B, C, D columns
    if (row.A) collected.push(row.A.toString());
    if (row.B) collected.push(row.B.toString());
    if (row.C) collected.push(row.C.toString());
    if (row.D) collected.push(row.D.toString());

    return collected;
};

// Helper: Determine correct index from various answer formats
const determineCorrectIndex = (row: any, options: string[]): number => {
    // 1. Explicit index column
    if (typeof row.correct_index === 'number') return row.correct_index;
    
    // 2. Parse from 'correct_answer' or 'answer' column
    const ans = row.correct_answer || row.answer;
    if (!ans) return 0; // Default fallback

    const ansStr = ans.toString().trim();

    // Check for "0", "1", "2"...
    if (/^\d+$/.test(ansStr)) {
        const parsed = parseInt(ansStr);
        if (parsed < options.length) return parsed;
    }

    // Check for "A", "B", "C", "D"
    const letterMap: Record<string, number> = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4 };
    if (letterMap[ansStr.toLowerCase()] !== undefined) {
        return letterMap[ansStr.toLowerCase()];
    }

    // Check if the answer string matches one of the options exactly
    const idx = options.findIndex(opt => opt.trim() === ansStr);
    if (idx !== -1) return idx;

    return 0;
};

// Helper to convert DB Row to Question Object
const convertRowToQuestion = (row: any): Question => {
    let finalOptions = extractOptions(row);
    let items: { id: string; content: string }[] = [];
    let correctOrder: string[] | undefined = undefined;
    let detectiveData: any = undefined;

    const rawType = (row.question_type || row.type || 'mcq').toLowerCase().trim();
    const type = (rawType === 'order' || rawType === 'sort') ? 'sort' : rawType;

    // Handle DETECTIVE type data parsing
    if (type === 'detective') {
        if (row.detective_data) {
            if (typeof row.detective_data === 'string') {
                try {
                    detectiveData = JSON.parse(row.detective_data);
                } catch(e) { console.error("Failed to parse detective_data", e); }
            } else {
                detectiveData = row.detective_data;
            }
        }
        // Sync options with suspects if valid
        if (detectiveData && detectiveData.suspects) {
            finalOptions = detectiveData.suspects;
        }
    }

    // Handle SORT questions items
    if (type === 'sort') {
        if (row.items && Array.isArray(row.items)) {
            items = row.items.map((content: string, idx: number) => ({ id: idx.toString(), content }));
        } else if (finalOptions.length > 0) {
            items = finalOptions.map((content, idx) => ({ id: idx.toString(), content }));
        }
    }

    // Handle Correct Answer Logic for SORT/INPUT
    const rawAnswer = row.correct_answer || row.answer || row.valid_answer;
    
    if (type === 'sort' && rawAnswer) {
        const rawStr = rawAnswer.toString();
        let rawParts = rawStr.split(/[,，|\->\n]+/).map((s: string) => s.trim()).filter((s: string) => s);
        const areIndices = rawParts.length > 0 && rawParts.every((p: string) => /^\d+$/.test(p));
        
        if (areIndices && items.length > 0) {
            const indices = rawParts.map((p: string) => parseInt(p));
            const maxIdx = Math.max(...indices);
            if (maxIdx < items.length) {
                correctOrder = indices.map((idx: number) => items[idx].content);
            } else if (Math.min(...indices) === 1 && maxIdx === items.length) {
                correctOrder = indices.map((idx: number) => items[idx - 1]?.content || '');
            } else {
                correctOrder = rawParts;
            }
        } else {
            correctOrder = rawParts;
        }
    }
    
    const correctIndex = determineCorrectIndex(row, finalOptions);
    const difficulty = row.difficulty ? parseInt(row.difficulty) : 1;

    return {
        id: row.id?.toString() || Math.random().toString(),
        type: type as any,
        text: row.question_text || row.text || row.question || "Untitled Question",
        options: finalOptions.length > 0 ? finalOptions : undefined,
        correctIndex: correctIndex,
        validAnswer: rawAnswer ? rawAnswer.toString() : undefined, 
        explanation: row.explanation || '',
        hint: row.hint,
        items: items.length > 0 ? items : undefined,
        correctOrder: correctOrder,
        template: row.template,
        difficulty: difficulty,
        detectiveData: detectiveData // Map the new field
    };
};

export const fetchQuestionsForLevel = async (level: Level): Promise<Level> => {
  if (!isSupabaseLive) {
      // Local fallback: count total questions in local phases
      const total = level.phases.reduce((acc, p) => acc + p.questions.length, 0);
      return { ...level, totalQuestionsCount: total };
  }

  try {
    // --- SPECIAL HANDLING FOR COMBINED LEVELS (e.g., "s1_ch1_all" or "1.1-1.4") ---
    // Only verify as a Combined Chapter if it ends with '_all' OR has a range like '1.1-1.4' in title.
    // This prevents single topics with multiple phases (e.g. 17.4) from triggering this logic.
    const isCombinedChapter = level.id.endsWith('_all') || level.title.includes('-');

    if (isCombinedChapter) {
        const chapterMatch = level.chapterId.match(/ch(\d+)/);
        const chapterNum = chapterMatch ? chapterMatch[1] : null;

        if (chapterNum) {
            console.log(`[ChemStep DB] 📚 Fetching Full Chapter: Grade=${level.grade}, Chapter=${chapterNum}`);
            
            const { data, error } = await supabase
                .from('questions')
                .select('*')
                .eq('grade', level.grade)
                .eq('chapter', chapterNum);

            if (!error && data && data.length > 0) {
                const newPhases = level.phases.map((phase, index) => {
                    // For combined chapters, Phase 1 corresponds to Subchapter 1, Phase 2 to Subchapter 2, etc.
                    const targetSubchapters = [(index + 1).toString(), `${chapterNum}.${index + 1}`];
                    
                    const phaseQuestions = data
                        .filter((row: any) => {
                            const sub = row.subchapter ? row.subchapter.toString() : '';
                            return targetSubchapters.includes(sub);
                        })
                        .map(convertRowToQuestion);

                    if (phaseQuestions.length > 0) {
                        return { ...phase, questions: phaseQuestions };
                    }
                    return phase;
                });

                // Inject local special phases if DB didn't cover them
                level.phases.forEach(localPhase => {
                    const hasDetective = localPhase.questions.some(q => q.type === 'detective');
                    const exists = newPhases.find(p => p.id === localPhase.id);
                    if (hasDetective && !exists) {
                        newPhases.push(localPhase);
                    } else if (hasDetective && exists) {
                        // If DB returned questions but they aren't the detective ones (unlikely but possible conflict), merge
                        if (exists.questions.length === 0) exists.questions = localPhase.questions;
                    }
                });

                const totalQ = newPhases.reduce((acc, p) => acc + p.questions.length, 0);
                return { ...level, phases: newPhases, isFromDB: true, totalQuestionsCount: totalQ };
            }
        }
    }

    // --- STANDARD HANDLING FOR SINGLE SUBCHAPTER LEVELS ---
    let questionsData: any[] = [];
    const shortId = level.title.split(' ')[0]; // "4.1"
    const parts = shortId.split('.'); // ["4", "1"]

    // Try structured match first
    if (parts.length === 2) {
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .eq('grade', level.grade)
            .eq('chapter', parts[0])
            .eq('subchapter', parts[1]);
        if (!error && data) questionsData = data;
    }

    // Fallback ID match
    if (questionsData.length === 0) {
        const possibleIds = [level.id, shortId, level.chapterId].filter(Boolean);
        const { data, error } = await supabase.from('questions').select('*').in('subchapter', possibleIds); 
        if (!error && data) questionsData = data;
    }

    if (questionsData.length === 0) {
      const total = level.phases.reduce((acc, p) => acc + p.questions.length, 0);
      return { ...level, totalQuestionsCount: total };
    }

    // Convert rows
    const allQuestions = questionsData.map(convertRowToQuestion);

    // --- NEW LOGIC: SEPARATE CASES FROM GENERAL QUESTIONS ---
    const caseMap = new Map<string, Question[]>();
    const generalQuestions: Question[] = [];

    allQuestions.forEach(q => {
        if (q.detectiveData && q.detectiveData.caseId) {
            const cid = q.detectiveData.caseId;
            if (!caseMap.has(cid)) caseMap.set(cid, []);
            caseMap.get(cid)?.push(q);
        } else {
            generalQuestions.push(q);
        }
    });

    const newPhases: LevelPhase[] = [];
    const basePhase = level.phases[0] || { id: 'base', title: '挑战', difficulty: 'normal', questions: [] };

    // 1. Process Case Groups (Create Independent Phases for each Case)
    caseMap.forEach((questions, caseId) => {
        // Sort questions by step
        questions.sort((a, b) => (a.detectiveData?.step || 0) - (b.detectiveData?.step || 0));
        
        // Use the title from the first question's mysteryTitle (strip Part info)
        const rawTitle = questions[0].detectiveData?.mysteryTitle || '神秘案件';
        const cleanTitle = rawTitle.split(/[:(]/)[0].trim(); // "案件 (1/3)" -> "案件"

        newPhases.push({
            id: `case_${caseId}`,
            title: `🕵️ ${cleanTitle}`,
            difficulty: 'hard', // Cases are usually hard/boss phases
            story: {
                title: cleanTitle,
                content: "Octo 收到了一份紧急委托！似乎有一些化学物质离奇失踪或变质了。请协助 Octo 按照步骤进行勘查，还原真相！",
                emoji: "🕵️",
                mood: "thinking"
            },
            questions: questions
        });
    });

    // 2. Process General Questions (Apply Difficulty Splitting if needed)
    if (generalQuestions.length > 0) {
        const groupedQuestions: Record<number, Question[]> = { 1: [], 2: [], 3: [] };
        let maxDiff = 1;
        
        generalQuestions.forEach(q => {
            const d = q.difficulty || 1;
            if (!groupedQuestions[d]) groupedQuestions[d] = [];
            groupedQuestions[d].push(q);
            if (d > maxDiff) maxDiff = d;
        });

        // Determine if splitting general questions is needed (only if >1 difficulty level found)
        const hasMultipleDiffs = Object.keys(groupedQuestions).filter(k => groupedQuestions[parseInt(k)].length > 0).length > 1;

        if (hasMultipleDiffs) {
            const baseStoryTitle = basePhase.story?.title || basePhase.title;
            
            if (groupedQuestions[1].length > 0) {
                newPhases.push({ ...basePhase, id: `${basePhase.id}_easy`, title: basePhase.title + ' (基础)', difficulty: 'normal', questions: groupedQuestions[1] });
            }
            if (groupedQuestions[2].length > 0) {
                newPhases.push({ 
                    ...basePhase, 
                    id: `${basePhase.id}_med`, 
                    title: '进阶应用', 
                    difficulty: 'normal', 
                    story: { title: `${baseStoryTitle} · 深入`, content: `挑战升级！我们需要更灵活的技巧来应对。`, emoji: '🧗', mood: 'nervous' }, 
                    questions: groupedQuestions[2] 
                });
            }
            // Add hard questions (Diff 3+)
            const hardQs = [...(groupedQuestions[3]||[]), ...(groupedQuestions[4]||[]), ...(groupedQuestions[5]||[])];
            if (hardQs.length > 0) {
                newPhases.push({ 
                    ...basePhase, 
                    id: `${basePhase.id}_hard`, 
                    title: '巅峰挑战', 
                    difficulty: 'hard', 
                    story: { title: `${baseStoryTitle} · 终章`, content: `这是最后的堡垒！拿下它！`, emoji: '🌋', mood: 'victory' }, 
                    questions: hardQs 
                });
            }
        } else {
            // No splitting needed, just add as one phase
            newPhases.push({ ...basePhase, questions: generalQuestions });
        }
    }

    // Fallback: If absolutely no questions found (and no cases), return local
    if (newPhases.length === 0) {
        return level; 
    }

    // Sort phases: Put Cases LAST (Boss Battles) usually, or strictly append
    // Current logic: Cases added first? No, let's put General phases first, Cases last.
    
    const finalPhases = [
        ...newPhases.filter(p => !p.id.startsWith('case_')), // General phases first
        ...newPhases.filter(p => p.id.startsWith('case_'))   // Case phases last
    ];

    return { ...level, phases: finalPhases, isFromDB: true, totalQuestionsCount: allQuestions.length };

  } catch (error) {
    console.error('[ChemStep DB] Service execution error:', error);
    const total = level.phases.reduce((acc, p) => acc + p.questions.length, 0);
    return { ...level, totalQuestionsCount: total };
  }
};
