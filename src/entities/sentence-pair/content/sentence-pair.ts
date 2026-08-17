/**
 * Moved unchanged from src/data/storyData.ts (CURATED_PAIRED_SENTENCES).
 * PROTECTED research content: alphabetCount / hangulCount / tokenPremium
 * and the token-segmentation arrays are unchanged from the legacy source.
 */
import { PairedSentenceItem } from '../../../types';

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
