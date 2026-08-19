/**
 * PROTECTED — external citation, not this project's own measurement.
 * Source: Petrov, A., La Malfa, E., Torr, P. H. S., & Bibi, A. (2023).
 * "Language Model Tokenizers Introduce Unfairness Between Languages."
 * NeurIPS 2023. FLORES-200 parallel corpus, 2,000 semantically-equivalent
 * sentences, cl100k_base tokenizer. totalTokens = the paper's published
 * tokenization_lengths.csv total per language; ratio = totalTokens /
 * English totalTokens (English fixed at 1.00 as the paper's own baseline).
 * Verbatim source doc: AUDIT2/레퍼런스/기사용_언어별_Token_Premium_선행연구_요약.docx
 * (SHA-256 3c83050a493ae2e7a8c3f62394624483135d9279ad88eebd2637c7cf2b77d189,
 * logged docs/editorial/HUMAN_PREVIEW_01_SOURCE_MANIFEST.md).
 *
 * This is a DIFFERENT dataset and tokenizer from this project's own
 * MULTILINGUAL_COMPARISON_DATA (Flores-200 / o200k_base) — do not merge,
 * average, or directly compare the two ratio scales. Do not add languages
 * or rows beyond the 5 explicitly approved (Director instruction,
 * 2026-08-18): English, Chinese (Simplified), Korean, Russian, Standard
 * Arabic. The paper's own dataset has more rows; only these 5 ship.
 */
import { FloresCitationItem } from '../model/types';

export const FLORES_CITATION_DATA: FloresCitationItem[] = [
  {
    id: 'en',
    name: { ko: '영어', en: 'English' },
    totalTokens: 52835,
    ratio: 1.0,
    isBaseline: true,
  },
  {
    id: 'zh',
    name: { ko: '중국어 (간체)', en: 'Chinese (Simplified)' },
    totalTokens: 101138,
    ratio: 1.91,
  },
  {
    id: 'ko',
    name: { ko: '한국어', en: 'Korean' },
    totalTokens: 125737,
    ratio: 2.38,
    isTargetHangul: true,
  },
  {
    id: 'ru',
    name: { ko: '러시아어', en: 'Russian' },
    totalTokens: 131496,
    ratio: 2.49,
  },
  {
    id: 'ar',
    name: { ko: '표준 아랍어', en: 'Standard Arabic' },
    totalTokens: 160485,
    ratio: 3.04,
  },
];

/**
 * Prose accompanying FLORES_CITATION_DATA. Text authored directly by the
 * Director in-chat (2026-08-18, Human Preview 01 continuation) — quoted
 * near-verbatim, translated to English for the EN locale, not generated.
 * Kept as a standalone content block (not merged into
 * ARTICLE_CONTENT.multilingualBenchmark) so this citation's distinct
 * source/tokenizer stays structurally separate from this project's own
 * measurement, per the note above.
 *
 * RECONCILED 2026-08-19. cautionText names this project's own figures as
 * "우리 연구의 1.33배" / "약 384만 한-영 대응쌍". When it was written those
 * disagreed with the S3 headline the site was actually showing (69,432 pairs
 * / 1.29x-1.83x, then frozen by D1), and this comment recorded the conflict.
 *
 * The D1 ruling of 2026-08-19 resolved it in cautionText's favour: S3 now
 * renders 3,835,988 pairs and a median of 1.33x, from
 * NB08_RQ1_RESULTS_v001 @ 768a3bccc7d5d081. The Director's dictated text and
 * the page agree, and no wording here had to change for that to happen.
 *
 * The comparison caution itself still stands and must not be softened: the
 * Petrov figures are FLORES-200 + cl100k_base, ours are the AI-Hub cohort +
 * o200k_base. Different corpus, different tokenizer, not the same scale.
 */
export const FLORES_CITATION_NOTE = {
  headline: {
    ko: '한국어만의 문제인가? 선행연구는 아니라고 말한다',
    en: 'Is This a Korean-Only Problem? Prior Research Says No',
  },
  intro: {
    ko: '이 현상이 한글만의 특수한 예외인지 확인하려면 다른 언어를 같이 봐야 한다.',
    en: 'To check whether this is a special exception unique to Korean, other languages need to be looked at together.',
  },
  citationIntro: {
    ko: 'Petrov·La Malfa·Torr·Bibi 연구진은 NeurIPS 2023에서 FLORES-200의 동일 의미 병렬문장 2,000개를 여러 토크나이저로 비교했다. 연구진이 공개한 tokenization_lengths.csv의 cl100k_base 열을 영어=1로 다시 계산하면 다음과 같다.',
    en: 'Petrov, La Malfa, Torr, and Bibi compared 2,000 semantically-equivalent FLORES-200 parallel sentences across multiple tokenizers at NeurIPS 2023. Recalculating the cl100k_base column of their published tokenization_lengths.csv with English normalized to 1 yields the following.',
  },
  cautionText: {
    ko: '이 수치는 우리 연구의 1.33배와 직접 비교하면 안 된다. 데이터셋도 다르고 토크나이저도 다르다. Petrov 연구는 FLORES-200 + cl100k_base, 본 연구는 약 384만 한-영 대응쌍 + o200k_base다.',
    en: "These figures should not be directly compared to our own study's 1.33× median. Both the dataset and the tokenizer differ: the Petrov study uses FLORES-200 + cl100k_base, while our study uses roughly 3.84 million Korean-English sentence pairs + o200k_base.",
  },
  framingText: {
    ko: '하지만 방향은 중요하다. 높은 tokenization length가 한국어에서만 나타난 것이 아니다. 중국어, 러시아어, 아랍어에서도 영어보다 큰 격차가 나타났다. 따라서 기사 프레임은 "한글만 유독 비효율적"이 아니라 이렇게 잡는 편이 정확하다.',
    en: 'But the direction matters. Elevated tokenization length is not unique to Korean — Chinese, Russian, and Arabic all showed a larger gap than English as well. The article\'s frame should therefore not be "Korean is uniquely inefficient," but the following instead.',
  },
  callout: {
    label: { ko: '선행연구와의 정합성', en: 'Consistency With Prior Research' },
    statement: {
      ko: '영어 중심으로 보이지 않던 \'토크나이저의 언어별 격차\'가 한국어에서도 다시 관측됐다. 토크나이저와 데이터셋이 달라지면 격차의 크기는 달라진다. 다만 같은 의미를 세는 길이가 언어에 따라 달라지는 현상은 여러 토크나이저 조건에서 반복해서 관찰돼 왔다.',
      en: "A tokenizer-driven, per-language gap that stays invisible from an English-centric view was observed again in Korean. The size of the gap changes with the tokenizer and dataset. But the phenomenon itself — that the length used to count identical meaning varies by language — has been observed repeatedly, across multiple tokenizer conditions.",
    },
  },
  /**
   * Promoted from 'FIG. 06-1' on 2026-08-19.
   *
   * It was a sub-figure of FIG. 06, the project's own 12-language chart. That
   * chart was removed in PR #32 (it rendered a second, differently-sourced
   * Korean ratio in the same section), which left a sub-figure numbered
   * against a parent the reader could not find. This is now the section's
   * only exhibit, so it takes the parent number.
   */
  figureNumber: 'FIG. 06',
  figureCaption: {
    ko: '영어=1로 본 선행연구 언어별 tokenization length',
    en: "Prior-Research Tokenization Length by Language, Normalized to English=1",
  },
  figureSource: {
    ko: '출처: Petrov et al. (2023), NeurIPS — FLORES-200 / cl100k_base, N=2,000 병렬문장',
    en: 'Source: Petrov et al. (2023), NeurIPS — FLORES-200 / cl100k_base, N=2,000 parallel sentences',
  },
};
