import { PairedSentenceItem, OccupationCategory, VerifiedDataSlot, MultilingualTokenItem } from '../types';

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

export const CURATED_PAIRED_SENTENCES: PairedSentenceItem[] = [
  {
    id: 'pair-1',
    title: {
      ko: '예시 1: 일상 및 기술 개론 문장',
      en: 'Example 1: General & Technology Overview',
    },
    contextTag: {
      ko: '일반 서술 (Standard)',
      en: 'General Description',
    },
    alphabetText: 'Artificial intelligence is changing our lives.',
    hangulText: '인공지능은 우리의 삶을 변화시키고 있다.',
    alphabetTokens: ['Artificial', ' intelligence', ' is', ' changing', ' our', ' lives.'],
    hangulTokens: ['인공', '지능', '은', ' 우리', '의', ' 삶', '을', ' 변화', '시키', '고', ' 있다.'],
    alphabetCount: 6,
    hangulCount: 11,
    tokenPremium: 1.83,
  },
  {
    id: 'pair-2',
    title: {
      ko: '예시 2: 비즈니스 및 재무 보고 문장',
      en: 'Example 2: Business & Financial Report',
    },
    contextTag: {
      ko: '기업 실무 (Business)',
      en: 'Corporate Operations',
    },
    alphabetText: 'Please summarize the financial quarter results for the board.',
    hangulText: '이사회 제출용 분기 재무 실적 보고서를 요약해 주세요.',
    alphabetTokens: ['Please', ' summarize', ' the', ' financial', ' quarter', ' results', ' for', ' the', ' board.'],
    hangulTokens: ['이', '사회', ' 제출', '용', ' 분기', ' 재무', ' 실적', ' 보고', '서를', ' 요약', '해', ' 주', '세요.'],
    alphabetCount: 9,
    hangulCount: 13,
    tokenPremium: 1.44,
  },
  {
    id: 'pair-3',
    title: {
      ko: '예시 3: 학술 연구 및 모델 아키텍처',
      en: 'Example 3: Academic & Model Architecture',
    },
    contextTag: {
      ko: '학술 논문 (Academic)',
      en: 'Scientific Literature',
    },
    alphabetText: 'Multilingual neural language models require balanced subword vocabularies.',
    hangulText: '다국어 신경망 언어 모델은 균형 잡힌 서브워드 어휘집을 필요로 한다.',
    alphabetTokens: ['Multi', 'lingual', ' neural', ' language', ' models', ' require', ' balanced', ' subword', ' vocab', 'ularies.'],
    hangulTokens: ['다', '국어', ' 신경', '망', ' 언어', ' 모델', '은', ' 균형', ' 잡', '힌', ' 서', '브', '워드', ' 어휘', '집을', ' 필요', '로', ' 한다.'],
    alphabetCount: 10,
    hangulCount: 18,
    tokenPremium: 1.80,
  },
  {
    id: 'pair-4',
    title: {
      ko: '예시 4: 행정 및 공공 정책 지침',
      en: 'Example 4: Public Policy & Administration',
    },
    contextTag: {
      ko: '공공 정책 (Policy)',
      en: 'Public Administration',
    },
    alphabetText: 'The committee reviewed the regional development master plan.',
    hangulText: '위원회는 지역 발전 기본 계획안을 면밀히 검토했다.',
    alphabetTokens: ['The', ' committee', ' reviewed', ' the', ' regional', ' development', ' master', ' plan.'],
    hangulTokens: ['위원', '회는', ' 지역', ' 발전', ' 기본', ' 계획', '안을', ' 면', '밀', '히', ' 검', '토', '했', '다.'],
    alphabetCount: 8,
    hangulCount: 14,
    tokenPremium: 1.75,
  },
];

export const OCCUPATION_COMPARISON_DATA: OccupationCategory[] = [
  {
    id: 'engineering',
    title: {
      ko: '공학 및 기술 직무군 (Engineering / Technical)',
      en: 'Engineering & Technical Occupations',
    },
    badge: {
      ko: '코드/정형 데이터 중심',
      en: 'Code & Structured Data Focus',
    },
    aiExposureLevel: 'Very High (상위 10%)',
    languageIntensity: '중간 (코드, 영문 API 키워드 및 간결 프롬프트 비중 높음)',
    tokenBurdenAssessment: {
      ko: '코드 문법(Python, JS 등) 및 프로그래밍 키워드는 영문 토크나이저에 고도로 최적화되어 있어 한글 토큰화 페널티의 영향이 상대적으로 완충될 수 있음.',
      en: 'Programming keywords and code syntax align heavily with English BPE subwords, somewhat buffering Hangul token fragmentation penalties.',
    },
    occupations: [
      {
        name: { ko: '소프트웨어 엔지니어 / 개발자', en: 'Software Engineer / Developer' },
        languageIntensityDesc: { ko: '코드 생성 프롬프트 및 API 디버깅 중심', en: 'Code generation prompts & API debugging' },
        status: 'DATA_AVAILABLE',
      },
      {
        name: { ko: '데이터 사이언티스트 / AI 연구원', en: 'Data Scientist / AI Researcher' },
        languageIntensityDesc: { ko: '수식, 파이프라인 스크립트, 통계 분석', en: 'Formulas, pipeline scripts, statistical runs' },
        status: 'DATA_AVAILABLE',
      },
      {
        name: { ko: '시스템 엔지니어링 / 클라우드 아키텍트', en: 'Systems & Cloud Architect' },
        languageIntensityDesc: { ko: '인프라 설정 스크립트 및 로그 분석', en: 'Config scripts and infrastructure log reviews' },
        status: 'PLACEHOLDER',
      },
    ],
  },
  {
    id: 'social-science',
    title: {
      ko: '사회과학 및 지식집약 직무군 (Social Science / Knowledge-intensive)',
      en: 'Social Science & Knowledge-intensive Occupations',
    },
    badge: {
      ko: '자연어 텍스트 분석 중심',
      en: 'Natural Language & Text Synthesis Focus',
    },
    aiExposureLevel: 'High to Very High (상위 15%)',
    languageIntensity: '매우 높음 (긴 자연어 보고서, 법률/규제, 인터뷰, 정성적 맥락)',
    tokenBurdenAssessment: {
      ko: '장문의 한국어 텍스트 문맥(컨텍스트 윈도우 점유율)과 반복 프롬프팅을 대량으로 수행하므로, Token Premium으로 인한 절대적 토큰 누적 부담이 더 클 가능성이 높음.',
      en: 'Processes extensive long-form Korean text context; hence cumulative token burdens from Token Premium are likely to compound more severely.',
    },
    occupations: [
      {
        name: { ko: '경제·시장 분석가 / 정책 연구원', en: 'Economic & Policy Researcher' },
        languageIntensityDesc: { ko: '수백 페이지 규제 정책 및 거시 리포트 요약', en: 'Long-form regulatory policy & macro report synthesis' },
        status: 'DATA_AVAILABLE',
      },
      {
        name: { ko: '법률 고문 / 계약서 검토 분석가', en: 'Legal Advisor & Contract Analyst' },
        languageIntensityDesc: { ko: '장문 조항, 판례 분석, 규제 컴플라이언스', en: 'Legal clauses, case precedents, compliance documents' },
        status: 'DATA_AVAILABLE',
      },
      {
        name: { ko: '경영 전략 컨설턴트 / 행정 분석가', en: 'Management Consultant & Policy Analyst' },
        languageIntensityDesc: { ko: '정성적 인터뷰 정형화 및 전략 보고서 작성', en: 'Qualitative interview analysis & strategic report drafting' },
        status: 'PLACEHOLDER',
      },
    ],
  },
];

export const VERIFIED_POLICY_SLOTS: VerifiedDataSlot[] = [
  {
    id: 'policy-gov',
    title: {
      ko: '정부 AI 인프라 및 국가 컴퓨팅 지원 정책',
      en: 'National AI Infrastructure & Compute Policy',
    },
    category: '정부 정책 (Government Policy)',
    status: 'REQUIRED',
    placeholderLabel: '[VERIFIED POLICY DATA REQUIRED]',
  },
  {
    id: 'samsung-investment',
    title: {
      ko: '삼성전자 차세대 AI 반도체 및 인프라 투자 로드맵',
      en: 'Samsung Next-Gen AI Semiconductor Investment',
    },
    category: '기업 투자 (Corporate Investment)',
    status: 'REQUIRED',
    placeholderLabel: '[VERIFIED SAMSUNG INVESTMENT DATA REQUIRED]',
  },
  {
    id: 'sk-investment',
    title: {
      ko: 'SK그룹 HBM 및 AI 데이터센터 인프라 투자',
      en: 'SK Group HBM & AI Data Center Investment',
    },
    category: '기업 투자 (Corporate Investment)',
    status: 'REQUIRED',
    placeholderLabel: '[VERIFIED SK INVESTMENT DATA REQUIRED]',
  },
];

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
