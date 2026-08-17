import { BilingualText, UILanguage } from '../../types';

/** Standard localized-text shape, per docs/CONTENT_CONTRACT.md. */
export type LocalizedText = BilingualText;

/** Preserves a hard line-break intent (e.g. a two-line headline) without serializing JSX. */
export type LocalizedLines = {
  ko: readonly string[];
  en: readonly string[];
};

export type { UILanguage };
