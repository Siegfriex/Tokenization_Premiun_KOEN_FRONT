/**
 * Moved unchanged from src/data/storyData.ts (MULTILINGUAL_COMPARISON_DATA).
 * PROTECTED research content: relativeRatio / differencePercent / tokenCount
 * / tokenizerId / sourceDataset values are unchanged from the legacy source.
 */
import { MultilingualTokenItem } from '../../../types';

export const MULTILINGUAL_COMPARISON_DATA: MultilingualTokenItem[] = [
  {
    id: 'en',
    name: { ko: '영어 (English)', en: 'English' },
    scriptType: { ko: '라틴 알파벳 (Latin Script)', en: 'Latin Alphabet' },
    tokenCount: 100,
    relativeRatio: 1.0,
    differencePercent: 0,
    sampleCount: 1012,
    tokenizerId: 'o200k_base',
    sourceDataset: 'Flores-200 / Parallel Benchmark Corpus',
    isBaseline: true,
  },
  {
    id: 'es',
    name: { ko: '스페인어 (Spanish)', en: 'Spanish' },
    scriptType: { ko: '라틴 알파벳 (Latin Script)', en: 'Latin Alphabet' },
    tokenCount: 118,
    relativeRatio: 1.18,
    differencePercent: 18,
    sampleCount: 1012,
    tokenizerId: 'o200k_base',
    sourceDataset: 'Flores-200 / Parallel Benchmark Corpus',
  },
  {
    id: 'zh',
    name: { ko: '중국어 (Chinese)', en: 'Chinese (Simplified)' },
    scriptType: { ko: '한자 표의문자 (Hanzi Script)', en: 'Hanzi Script' },
    tokenCount: 145,
    relativeRatio: 1.45,
    differencePercent: 45,
    sampleCount: 1012,
    tokenizerId: 'o200k_base',
    sourceDataset: 'Flores-200 / Parallel Benchmark Corpus',
  },
  {
    id: 'ko',
    name: { ko: '한국어 (Korean / Hangul)', en: 'Korean (Hangul)' },
    scriptType: { ko: '한글 음절문자 (Hangul Script)', en: 'Hangul Syllabic Script' },
    tokenCount: 178,
    relativeRatio: 1.78,
    differencePercent: 78,
    sampleCount: 1012,
    tokenizerId: 'o200k_base',
    sourceDataset: 'Flores-200 / Parallel Benchmark Corpus',
    isTargetHangul: true,
  },
  {
    id: 'ar',
    name: { ko: '아랍어 (Arabic)', en: 'Arabic' },
    scriptType: { ko: '아랍 문자 (Arabic Abjad Script)', en: 'Arabic Script' },
    tokenCount: 205,
    relativeRatio: 2.05,
    differencePercent: 105,
    sampleCount: 1012,
    tokenizerId: 'o200k_base',
    sourceDataset: 'Flores-200 / Parallel Benchmark Corpus',
  },
];
