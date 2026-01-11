
import React from 'react';

interface ChemicalTextProps {
  text: string;
  className?: string;
}

export const ChemicalText: React.FC<ChemicalTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // --- PARSER 1: LaTeX Mode (Content inside $...$) ---
  const parseLatex = (latex: string) => {
    let html = latex;
    
    // 1. Arrows and Equals
    html = html.replace(/->|\\rightarrow|\\to|=/g, ' <span class="mx-1">→</span> ');

    // 2. Explicit Superscripts ^{...}
    html = html.replace(/\^\{([^}]+)\}/g, '<sup class="text-[0.7em] align-super">$1</sup>');

    // 3. Explicit Subscripts _{...}
    html = html.replace(/_\{([^}]+)\}/g, '<sub class="text-[0.7em] align-sub">$1</sub>');

    // 4. Simple Superscripts ^2+ (legacy/lazy latex)
    html = html.replace(/\^([0-9+\-]+)/g, '<sup class="text-[0.7em] align-super">$1</sup>');

    // 5. Implicit Subscripts (Numbers after letters, NOT inside tags)
    html = html.replace(/([a-zA-Z)\]])(\d+)/g, '$1<sub class="text-[0.7em] align-sub">$2</sub>');
    
    // 6. Dot separator (\cdot)
    html = html.replace(/\\cdot/g, '·');

    return html;
  };

  // --- PARSER 2: Legacy Mode (Plain text detection) ---
  const parseLegacy = (str: string) => {
     // Fix Common Typo: H20 (zero) -> H2O (letter O)
     let cleanText = str.replace(/H20/g, 'H2O');
     
     // Fix Dot: " . " -> "·" (Middle Dot for hydrates)
     // CRITICAL FIX: Escape the dot \. to match literal dot only, not any char
     cleanText = cleanText.replace(/\s*\.\s*/g, '·');

     // Enhance Scientific Notation: 1.23 x 10^5 -> 1.23 × 10^5
     // Matches digit followed by x/X/* and then 10
     cleanText = cleanText.replace(/(\d)\s*[xX*]\s*(10)/g, '$1 × $2');

     // Pre-process: Caret handling "CO3 ^ 2-" -> "CO3^2-"
     cleanText = cleanText.replace(/\s*\^\s*/g, '^');
     
     // Merge "CO3 2-" -> "CO32-" if no caret
     if (!cleanText.includes('^')) {
         cleanText = cleanText.replace(/([a-zA-Z0-9)])\s+(\d+[+-])/g, '$1$2');
     }

     const parts = cleanText.split(/(\s+)/);

     const processed = parts.map((part, i) => {
        if (part.match(/^\s+$/)) return part;

        // Separate punctuation from the potential chemical part (Enhanced for unicode punctuation)
        const punctuationMatch = part.match(/[.,;!?:)"'，。！？：）”’]+$/);
        const punctuation = punctuationMatch ? punctuationMatch[0] : '';
        const core = punctuation ? part.slice(0, -punctuation.length) : part;

        // Simple Heuristic for Chemical Formula
        const isLikelyChemical = (
            !core.includes('**') && (
              core.includes('^') || 
              (/[A-Z]/.test(core) && (/\d/.test(core) || /[+-]/.test(core))) ||
              /^(\d*[+-]+)$/.test(core) || // Matches standalone ions like 2+
              core.includes('·')
            )
        );

        if (isLikelyChemical) {
             let html = core;
             
             // 1. Explicit Caret Superscripts (e.g. Fe^2+ or ^14C for isotopes)
             // Handles leading superscripts (isotopes) or trailing charges
             html = html.replace(/\^([0-9+\-a-zA-Z]+)/g, '<sup class="text-[0.7em] align-super">$1</sup>');

             // 2. Implicit End-of-String Charges (e.g. Fe2+, Na+, Cl-)
             // Must be done BEFORE subscripts
             if (!html.includes('sup>')) {
                 html = html.replace(/([a-zA-Z0-9)>])(\d*[+\-])$/g, '$1<sup class="text-[0.7em] align-super">$2</sup>');
             }

             // 3. Subscripts (e.g. H2O, CO2)
             // Match a letter followed by digits
             html = html.replace(/([a-zA-Z)])(\d+)/g, '$1<sub class="text-[0.7em] align-sub">$2</sub>');
             
             // Removed font-mono to fix "weird font" issue. 
             // Using font-bold and tracking-tight to keep formulas tight but matching UI font.
             return `<span class="font-bold tracking-tight">${html}</span>${punctuation}`;
        }
        return part;
     }).join('');

     // Apply Markdown Bold Formatting (**text**)
     return processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold mx-0.5">$1</strong>');
  };

  // --- MAIN RENDER LOGIC ---
  const segments = text.split('$');

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        const isLatex = index % 2 === 1;
        
        if (isLatex) {
           return (
             <span 
               key={index} 
               className="font-serif font-bold mx-0.5 text-slate-800 bg-black/5 px-1.5 py-0.5 rounded inline-block leading-none"
               dangerouslySetInnerHTML={{ __html: parseLatex(segment) }} 
             />
           );
        } else {
           if (!segment) return null;
           return (
             <span 
               key={index} 
               dangerouslySetInnerHTML={{ __html: parseLegacy(segment) }} 
             />
           );
        }
      })}
    </span>
  );
};
