/**
 * Moved unchanged from src/components/ImpactSection.tsx's inline 3-level
 * "scale-up" cards (PERSON / WORK-ORGANIZATION / SOCIETY).
 */
import { BilingualText } from '../../../types';

export type ImpactScaleLevel = {
  id: string;
  levelLabelKo: string;
  title: BilingualText;
  description: BilingualText;
  unitNote: string;
  highlight: boolean;
};

/**
 * RESOLVED (Human Preview 01, HP01-S52-R01/R02, 2026-08-18): removed the
 * `levelBadge` field (`PROMPT LEVEL` / `WORKFLOW LEVEL` / `INFRASTRUCTURE`)
 * — pure decorative English dashboard chrome, redundant with `levelLabelKo`
 * + `title`. `levelLabelKo` simplified to drop the English "LEVEL" word.
 * No description/meaning changed.
 */
export const IMPACT_SCALE_LEVELS: ImpactScaleLevel[] = [
  {
    id: 'person',
    levelLabelKo: '1단계 · 개인',
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
    levelLabelKo: '2단계 · 조직 및 업무',
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
    levelLabelKo: '3단계 · 사회 및 국가',
    title: { ko: '국가 인프라와 디지털 마찰', en: 'Infrastructure & Digital Friction' },
    description: {
      ko: '생성형 AI가 국가 기간 인프라로 자리 잡을수록, 표기 체계별 표현 효율성 격차는 구조적인 디지털 마찰(Digital Friction) 이슈로 부상할 수 있습니다.',
      en: 'As generative AI becomes infrastructure, representation efficiency may become an increasingly relevant digital-friction issue.',
    },
    unitNote: '단위: 국가 인프라 / 소버린 AI(자국 데이터·인프라로 운용되는 자체 AI 체계)',
    highlight: true,
  },
];

/**
 * RESOLVED (Human Preview 01, HP01-S52-R02/R03/B01, 2026-08-18): was an
 * English-only flat string array rendered under the label "FINAL
 * CONCEPTUAL CAUSAL CHAIN" — both replaced. Now bilingual `{ ko, en }`
 * steps, and the component renders them under a non-causal "가능한 확장
 * 경로" (possible expansion pathway) framing instead of "causal chain".
 * The underlying 6-step sequence is unchanged — same steps, same order,
 * no research claim added or removed, only the causal-sounding label and
 * the English-only chip text.
 */
export const IMPACT_CAUSAL_CHAIN = [
  { ko: '언어 구조', en: 'Language Structure' },
  { ko: '토큰화', en: 'Tokenization' },
  { ko: 'Token Premium', en: 'Token Premium' },
  { ko: '업무 부담', en: 'Occupational Burden' },
  { ko: 'AI 확산 규모', en: 'AI Adoption at Scale' },
  // Reworded 2026-08-19 (Director list, #impact li:nth-child(11)). The step
  // read "잠재적 디지털 마찰 / Potential Digital Friction" — an abstraction a
  // first-time reader cannot picture, and the only vague link in a chain whose
  // other five steps are concrete. It now names the endpoint the article
  // actually argues for and the desk manuscript closes on: a fixed token
  // budget holds less when the same meaning costs more tokens.
  { ko: '같은 한도, 다른 사용량', en: 'Same Limit, Less Room' },
];
