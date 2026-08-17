import { LocalizedText } from './types';
import { UILanguage } from '../../types';

/** Minimal bilingual accessor — replaces the repeated `isKo ? x.ko : x.en` pattern. */
export function getLocalizedText(value: LocalizedText, language: UILanguage): string {
  return language === 'ko' ? value.ko : value.en;
}
