/**
 * Moved from src/components/KoreaAIContextSection.tsx's inline
 * "Macro Adoption Chain" phase cards.
 *
 * RESOLVED (Human Preview 01, HP01-S5-R02, 2026-08-18): `name` and
 * `description` are now proper `{ ko, en }` bilingual objects. The prior
 * state (name always English, description always Korean regardless of
 * UI language) was a known, deliberately-unresolved gap — HANDOFF.md
 * §6.5 / DIRECTOR_DECISIONS.md D6 — waiting on an editorial decision.
 * The Human Preview's explicit directive to Koreanize these labels is
 * that decision; English descriptions were newly written (not present
 * in the legacy source) to complete the bilingual pair, kept factually
 * equivalent to the existing Korean, no new claims introduced.
 */
export const MACRO_ADOPTION_PHASES = [
  {
    id: 'ai-investment',
    phaseLabel: { ko: '1단계', en: 'PHASE 01' },
    name: { ko: 'AI 투자 확대', en: 'AI Investment' },
    description: {
      ko: '정부 및 주요 기업의 고성능 컴퓨팅 인프라 투자 가속화',
      en: 'Accelerating government and corporate investment in high-performance computing infrastructure',
    },
    highlight: false,
  },
  {
    id: 'infrastructure',
    phaseLabel: { ko: '2단계', en: 'PHASE 02' },
    name: { ko: '인프라 확장', en: 'Infrastructure' },
    description: {
      ko: '국가 컴퓨팅 센터 및 초거대 AI 데이터센터 확장',
      en: 'Expansion of national computing centers and hyperscale AI data centers',
    },
    highlight: false,
  },
  {
    id: 'ai-adoption',
    phaseLabel: { ko: '3단계', en: 'PHASE 03' },
    name: { ko: 'AI 도입 확산', en: 'AI Adoption' },
    description: {
      ko: '공공·금융·제조·교육 전 분야의 일상 업무 AI 보급',
      en: 'AI adoption spreading into everyday work across public, financial, manufacturing, and education sectors',
    },
    highlight: false,
  },
  {
    id: 'token-usage',
    phaseLabel: { ko: '4단계', en: 'PHASE 04' },
    name: { ko: '토큰 사용량 증가', en: 'Token Usage' },
    description: {
      ko: '총 토큰 처리량 증가에 따른 효율 격차 누적',
      en: 'Cumulative efficiency gaps from rising total token throughput',
    },
    highlight: true,
  },
];
