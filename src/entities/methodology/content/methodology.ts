/**
 * Moved unchanged from src/data/storyData.ts (METHODOLOGY_ITEMS,
 * WHAT_WE_DO_NOT_CLAIM). PROTECTED research content — the six
 * "what we do not claim" boundary statements and methodology pillar
 * wording must not be reworded without Research Director approval.
 */
export const METHODOLOGY_ITEMS = [
  {
    id: 'semantic-equivalence',
    title: {
      ko: '의미론적 동등성 (Semantic Equivalence)',
      en: 'Semantic Equivalence',
    },
    content: {
      ko: '비교에 사용된 한국어와 영문 문장쌍은 정확히 동일한 정보량과 의도를 전달하도록 정밀 교차 검증된 대응 문장만을 사용합니다. 임의의 자유 문장은 어휘 구성 왜곡을 유발할 수 있으므로 큐레이션된 기준 세트를 적용합니다.',
      en: 'Analyzed sentence pairs are verified to convey functionally and semantically equivalent information to ensure unbiased token comparisons.',
    },
  },
  {
    id: 'tokenizer-dependency',
    title: {
      ko: '토크나이저 의존성 (Tokenizer Dependency)',
      en: 'Tokenizer Dependency',
    },
    content: {
      ko: '측정된 토큰 수는 특정 토크나이저 아키텍처(예: OpenAI o200k_base, Tiktoken, SentencePiece 등)의 어휘집(Vocabulary) 크기 및 분포에 의존합니다. 토크나이저 버전마다 수치가 상이할 수 있습니다.',
      en: 'Token counts directly depend on specific tokenizer architectures, vocabulary allocation, and release versions.',
    },
  },
  {
    id: 'model-dependency',
    title: {
      ko: '모델 일반화 한계 (Model Dependency)',
      en: 'Model Dependency',
    },
    content: {
      ko: '단일 모델이나 특정 토크나이저의 결과를 모든 생성형 AI 시스템(Gemini, Claude, Llama 등)으로 자동 일반화할 수 없습니다. 각 모델 제품군마다 자체 다국어 어휘집을 구축하여 운용합니다.',
      en: 'Results from one tokenizer should not be universally extrapolated to all generative AI systems.',
    },
  },
  {
    id: 'dataset-dependency',
    title: {
      ko: '데이터셋 표본 한계 (Dataset Dependency)',
      en: 'Dataset Dependency',
    },
    content: {
      ko: '분석 결과는 포함된 표본 문장군 및 직무 데이터의 특성에 영향을 받습니다. 일상 대화, 전문 법률, 소스코드 등 도메인에 따라 Token Premium 비율의 편차가 존재합니다.',
      en: 'Findings depend on the sample domain characteristics, showing variance across daily dialogue, legal text, and code.',
    },
  },
  {
    id: 'occupational-assumptions',
    title: {
      ko: '직무별 사용량 가정의 한계 (Occupational Assumptions)',
      en: 'Occupational Assumptions',
    },
    content: {
      ko: '직무 분석은 개념적 분석 프레임워크(AI 노출도 × 언어집약도 × Token Premium)에 기반하며, 실제 현업 사용자의 실측 프롬프트 로그가 아닌 대표적 업무 워크플로우를 가정한 것입니다.',
      en: 'Occupational burden is structured as an analytical framework based on typical workflows rather than comprehensive user logs.',
    },
  },
  {
    id: 'scope',
    title: {
      ko: '연구 범위 (Scope)',
      en: 'Scope',
    },
    content: {
      ko: '본 기사는 한글과 알파벳(영어) 기반 텍스트 간의 서브워드 분절 효율성 차이에 집중하며, 전 세계 모든 언어 체계에 대한 보편적 우열을 논증하지 않습니다.',
      en: 'This study focuses specifically on Hangul vs. Alphabet text representation efficiency without claiming universal language hierarchy.',
    },
  },
];

export const WHAT_WE_DO_NOT_CLAIM = [
  {
    ko: '한국어 AI의 추론 성능이나 지능이 영어보다 떨어진다고 주장하지 않습니다.',
    en: 'We do not claim Korean AI reasoning or intelligence is inferior to English.',
  },
  {
    ko: '한국어 사용자가 항상 모든 상황에서 더 많은 비용을 지불한다고 단정하지 않습니다.',
    en: 'We do not claim Korean users always pay more in every scenario.',
  },
  {
    ko: '모든 한국어 문장이 예외 없이 영어보다 더 많은 토큰을 필요로 한다고 일반화하지 않습니다.',
    en: 'We do not claim every single Korean sentence invariably requires more tokens.',
  },
  {
    ko: '모든 상용 토크나이저가 한글에 동일한 수준의 분절 페널티를 부여한다고 주장하지 않습니다.',
    en: 'We do not claim all commercial tokenizers disadvantage Hangul equally.',
  },
  {
    ko: '단순 토큰 수 차이가 모델 응답의 최종 품질을 직접 결정한다고 보지 않습니다.',
    en: 'We do not claim token counts directly determine the final quality of model reasoning.',
  },
  {
    ko: '현재의 토큰 차이가 확정적인 사회경제적 불평등의 원인이라고 단정하지 않습니다.',
    en: 'We do not assert current token variations as proven direct economic causality.',
  },
];
