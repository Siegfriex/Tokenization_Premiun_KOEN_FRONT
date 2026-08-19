/**
 * PROTECTED research content — the boundary statements and methodology pillar
 * wording must not be reworded without Research Director approval.
 *
 * REVISED 2026-08-19 under KOEN-FRONT-S3-CANON-IMPL-v1.0 §7, which directs
 * that the site's boundary section be artifact-derived rather than
 * editorially invented. The RQ1 artifact ships its own `claim_status` block;
 * its prohibited list is mirrored here rather than paraphrased.
 *
 * Three boundaries were MISSING against that list and are added below:
 * Korean being intrinsically inefficient, morphology as a cause, and any
 * domain-effect claim. The last is not hypothetical — domain and source do
 * not cross cleanly in the cohort (verdict COMPOSITE_CELL_CONTROL_ONLY), so
 * a domain claim is unsupportable by construction, and the site previously
 * made one.
 *
 * Prose was also brought to the article's declarative register; no boundary
 * was weakened or removed in that pass.
 */
export const METHODOLOGY_ITEMS = [
  {
    id: 'semantic-equivalence',
    title: {
      ko: '의미가 대응되는 문장쌍만 비교했다',
      en: 'Semantic Equivalence',
    },
    content: {
      ko: '비교에는 서로 의미가 대응되도록 만들어진 한국어·영어 문장쌍만 썼다. 아무 문장이나 나란히 놓으면 어휘 구성이 달라 비교 자체가 성립하지 않기 때문이다. 다만 번역문에는 의역과 번역투가 남을 수 있고, 이 기사는 그 한계를 안고 있는 관찰 자료다.',
      en: 'Only sentence pairs built to correspond in meaning were compared — placing arbitrary sentences side by side would compare vocabulary rather than languages. Translations still carry paraphrase and translationese, and this remains observational data with that limitation.',
    },
  },
  {
    id: 'tokenizer-dependency',
    title: {
      ko: '토크나이저에 따라 값이 달라진다',
      en: 'Tokenizer Dependency',
    },
    content: {
      ko: '토큰 수는 어떤 토크나이저를 쓰느냐에 달려 있다. 이 기사의 값은 o200k_base 기준이며, 사전 구성이 다르면 값도 달라진다.',
      en: 'Token counts depend on which tokenizer is used. Every figure in this article is o200k_base; a different dictionary produces different numbers.',
    },
  },
  {
    id: 'model-dependency',
    title: {
      ko: '다른 AI로 넓혀 말할 수 없다',
      en: 'Model Dependency',
    },
    content: {
      ko: '토크나이저 하나에서 나온 결과를 모든 AI로 넓혀 말할 수 없다. 모델 제품군마다 자체 사전을 따로 만들어 쓴다.',
      en: 'A result from one tokenizer cannot be widened to every AI. Each model family builds and maintains its own dictionary.',
    },
  },
  {
    id: 'dataset-dependency',
    title: {
      ko: '말뭉치가 결과를 좌우한다',
      en: 'Dataset Dependency',
    },
    content: {
      ko: '결과는 어떤 말뭉치를 썼느냐에 좌우된다. 이 기사의 말뭉치에서는 분야와 출처가 엇갈려 있어, 분야에 따른 차이와 출처에 따른 차이를 갈라낼 수 없다. 그래서 분야별 비율은 싣지 않았다.',
      en: 'Results depend on which corpus was used. In ours, subject area and source corpus do not cross cleanly, so a difference by subject cannot be separated from a difference by source. No per-subject ratio is published.',
    },
  },
  {
    id: 'occupational-assumptions',
    title: {
      ko: '직무 계산은 가정에 기반한 예시다',
      en: 'Occupational Assumptions',
    },
    content: {
      ko: '직무별 누적 계산은 실제 사용 기록이 아니라 대표적인 업무 흐름을 가정한 산술 예시다.',
      en: 'The occupational tally is arithmetic on an assumed workflow, not a record of anyone’s real usage.',
    },
  },
  {
    id: 'scope',
    title: {
      ko: '다루는 범위',
      en: 'Scope',
    },
    content: {
      ko: '이 기사가 다루는 것은 한국어와 영어 사이의 토큰 수 차이다. 언어들 사이의 우열을 가리려는 것이 아니다.',
      en: 'This article is about the difference in token counts between Korean and English. It is not an attempt to rank languages.',
    },
  },
];

export const WHAT_WE_DO_NOT_CLAIM = [
  {
    ko: '한국어가 AI에 본질적으로 비효율적인 언어라고 말하지 않는다.',
    en: 'We do not claim Korean is intrinsically inefficient for AI.',
  },
  {
    ko: '한국어 AI의 추론 능력이 영어보다 떨어진다고 말하지 않는다.',
    en: 'We do not claim Korean AI reasoning is inferior to English.',
  },
  {
    ko: '한국어 사용자가 언제나 더 많은 비용을 낸다고 단정하지 않는다.',
    en: 'We do not claim Korean users always pay more.',
  },
  {
    ko: '모든 한국어 문장이 예외 없이 더 많은 토큰을 쓴다고 일반화하지 않는다. 실제로 6.9%는 더 적었고 5.1%는 같았다.',
    en: 'We do not claim every Korean sentence uses more tokens — 6.9% used fewer and 5.1% came out even.',
  },
  {
    ko: '모든 토크나이저가 한글을 같은 정도로 잘게 나눈다고 말하지 않는다.',
    en: 'We do not claim all tokenizers split Hangul to the same degree.',
  },
  {
    ko: '한국어의 형태소 구조가 토큰 차이의 원인이라고 말하지 않는다. 형태소 정보는 표면형을 고려한 뒤에도 설명력을 조금 더할 뿐이었다.',
    en: 'We do not claim Korean morphology causes the token gap — morphological features added only a small increment of explanatory power once surface form was accounted for.',
  },
  {
    ko: '분야에 따라 토큰 비율이 다르다고 말하지 않는다. 말뭉치에서 분야와 출처가 엇갈려 있어 둘을 갈라낼 수 없다.',
    en: 'We do not make any claim about a subject-area effect — subject and source corpus do not cross cleanly enough to separate them.',
  },
  {
    ko: '토큰 수 차이가 모델 응답의 품질을 결정한다고 보지 않는다.',
    en: 'We do not claim token counts determine the quality of a model’s answer.',
  },
  {
    ko: '지금의 토큰 차이가 사회경제적 불평등의 확인된 원인이라고 단정하지 않는다.',
    en: 'We do not assert the token gap as a confirmed cause of socioeconomic inequality.',
  },
];

/**
 * The one statement the RQ1 artifact permits, carried rather than paraphrased.
 * Source: NB08_RQ1_RESULTS_v001 @ 768a3bccc7d5d081, `claim_status.permitted`.
 */
export const PERMITTED_CLAIM = {
  ko: '고정된 o200k_base 원문 텍스트 측정과 정의된 한·영 문장쌍 코호트에서, 문장쌍 단위 토큰 비율의 중앙값이 1보다 크다는 증거가 관측되었다.',
  en: 'Under the fixed o200k_base raw-text measurement and the defined KO-EN pair cohort, evidence was observed that the pair-level median token ratio is greater than 1.',
  provenance: 'NB08_RQ1_RESULTS_v001 @ 768a3bccc7d5d081',
};
