/** Moved unchanged from src/data/articleContent.ts (type definitions only). */
export interface SectionArticleContent {
  status?: 'verified' | 'draft' | 'pending';
  eyebrow?: { ko: string; en: string };
  headline?: { ko: string; en: string };
  subtitle?: { ko: string; en: string };
  deck?: { ko: string; en: string };
  lead?: { ko: string; en: string };
  preFigureParagraphs?: { ko: string[]; en: string[] };
  figureNumber?: string;
  figureCaption?: { ko: string; en: string };
  figureSource?: { ko: string; en: string };
  subheading?: { ko: string; en: string };
  postFigureParagraphs?: { ko: string[]; en: string[] };
  pullQuote?: { ko: string; en: string };
  keyFinding?: {
    label?: { ko: string; en: string };
    statement: { ko: string; en: string };
    bigNumber?: string;
  };
  footnotes?: { ko: string[]; en: string[] };
  sourcePlaceholder?: { ko: string; en: string };
}

export interface ArticleContentRegistry {
  hero: SectionArticleContent;
  introTheQuestion: SectionArticleContent;
  tokenUnit: SectionArticleContent;
  mechanism: SectionArticleContent;
  beyondKoreanPreview: SectionArticleContent;
  corpusAnalysis: SectionArticleContent;
  realSentences: SectionArticleContent;
  accumulatedBurden: SectionArticleContent;
  multilingualBenchmark: SectionArticleContent;
  koreaInfrastructure: SectionArticleContent;
  socioeconomicScale: SectionArticleContent;
  methodologyBoundaries: SectionArticleContent;
  conclusionSynthesis: SectionArticleContent;
}
