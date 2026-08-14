export type UILanguage = 'ko' | 'en';

export interface MultilingualTokenItem {
  id: string;
  name: BilingualText;
  scriptType: BilingualText;
  tokenCount: number; // Measured token count on standardized semantically equivalent corpus
  relativeRatio: number; // e.g. 1.0 for English baseline, 1.78 for Korean, etc.
  differencePercent: number; // e.g. 0% for English, +78% for Korean
  sampleCount: number; // Sample size
  tokenizerId: string; // e.g. "o200k_base"
  sourceDataset: string;
  isBaseline?: boolean;
  isTargetHangul?: boolean;
}

export interface BilingualText {
  ko: string;
  en: string;
}

export interface TokenBlock {
  id: string;
  text: string;
  colorClass?: string;
}

export interface PairedSentenceItem {
  id: string;
  title: BilingualText;
  contextTag: BilingualText;
  alphabetText: string;
  hangulText: string;
  alphabetTokens: string[];
  hangulTokens: string[];
  alphabetCount: number;
  hangulCount: number;
  tokenPremium: number; // e.g. 1.83
}

export interface OccupationCategory {
  id: string;
  title: BilingualText;
  badge: BilingualText;
  aiExposureLevel: string; // e.g. "High"
  languageIntensity: string; // e.g. "Medium-High" vs "Very High"
  tokenBurdenAssessment: BilingualText;
  occupations: {
    name: BilingualText;
    exposureIndex?: number;
    languageIntensityDesc: BilingualText;
    status: 'DATA_AVAILABLE' | 'PLACEHOLDER';
  }[];
}

export interface VerifiedDataSlot {
  id: string;
  title: BilingualText;
  category: string;
  status: 'REQUIRED' | 'VERIFIED';
  value?: string;
  unit?: string;
  period?: string;
  source?: string;
  sourceUrl?: string;
  publicationDate?: string;
  placeholderLabel: string;
}
