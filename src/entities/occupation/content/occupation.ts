/**
 * Moved unchanged from src/data/storyData.ts (OCCUPATION_COMPARISON_DATA).
 * PROTECTED research content: aiExposureLevel / languageIntensity /
 * tokenBurdenAssessment wording is unchanged from the legacy source.
 */
import { OccupationCategory } from '../../../types';

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
