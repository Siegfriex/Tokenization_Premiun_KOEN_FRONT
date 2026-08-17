/**
 * Moved unchanged from src/components/ImpactSection.tsx's inline 3-level
 * "scale-up" cards (PERSON / WORK-ORGANIZATION / SOCIETY).
 */
import { BilingualText } from '../../../types';

export type ImpactScaleLevel = {
  id: string;
  levelLabelKo: string;
  levelBadge: string;
  title: BilingualText;
  description: BilingualText;
  unitNote: string;
  highlight: boolean;
};

export const IMPACT_SCALE_LEVELS: ImpactScaleLevel[] = [
  {
    id: 'person',
    levelLabelKo: 'LEVEL 01 / 개인',
    levelBadge: 'PROMPT LEVEL',
    title: { ko: '문장 표현의 토큰 요구량 차이', en: 'Different Token Requirements' },
    description: {
      ko: '동일한 의미와 의도를 전달하더라도, 한글 텍스트는 BPE 어휘 분절 구조상 더 많은 서브워드 토큰 조각을 소비하게 됩니다.',
      en: 'Different token requirements for semantically equivalent expressions under standard BPE tokenizers.',
    },
    unitNote: '단위: 개별 프롬프트 / 대화창',
    highlight: false,
  },
  {
    id: 'work-organization',
    levelLabelKo: 'LEVEL 02 / 조직 및 업무',
    levelBadge: 'WORKFLOW LEVEL',
    title: { ko: '고빈도 워크플로우의 누적 부담', en: 'Accumulated Computational Burden' },
    description: {
      ko: '지식집약적 직무나 전사적 AI 에이전트 도입 환경에서 대량의 장문 문맥이 지속적으로 오갈 때 누적 연산 부담이 확대될 수 있습니다.',
      en: 'High-frequency AI environments and long-context agent pipelines may accumulate larger absolute computational burdens.',
    },
    unitNote: '단위: 팀·기업 워크플로우 / 컨텍스트 점유율',
    highlight: false,
  },
  {
    id: 'society',
    levelLabelKo: 'LEVEL 03 / 사회 및 국가',
    levelBadge: 'INFRASTRUCTURE',
    title: { ko: '국가 인프라와 디지털 마찰', en: 'Infrastructure & Digital Friction' },
    description: {
      ko: '생성형 AI가 국가 기간 인프라로 자리 잡을수록, 표기 체계별 표현 효율성 격차는 구조적인 디지털 마찰(Digital Friction) 이슈로 부상할 수 있습니다.',
      en: 'As generative AI becomes infrastructure, representation efficiency may become an increasingly relevant digital-friction issue.',
    },
    unitNote: '단위: 국가 인프라 / 소버린 AI',
    highlight: true,
  },
];

/** Moved unchanged from ImpactSection.tsx's causal-chain chip list (English-only by design, like other diagram labels site-wide). */
export const IMPACT_CAUSAL_CHAIN = [
  'Language Structure',
  'Tokenization',
  'Token Premium',
  'Occupational Burden',
  'AI Adoption at Scale',
  'Potential Digital Friction',
];
