
// This file acts as an aggregator. 
// Content has been split into `data/` folder for better maintainability.

import { S1_LEVELS, S1_META } from './data/levels/s1';
import { S2_LEVELS, S2_META } from './data/levels/s2';
import { S3_LEVELS, S3_META } from './data/levels/s3';

export * from './data/gamification';
export * from './data/elements';

// Combine Curriculum Metadata
export const CHAPTER_METADATA = { 
  ...S1_META, 
  ...S2_META, 
  ...S3_META 
};

// Combine All Levels
export const INITIAL_LEVELS = [
  ...S1_LEVELS, 
  ...S2_LEVELS, 
  ...S3_LEVELS
];
