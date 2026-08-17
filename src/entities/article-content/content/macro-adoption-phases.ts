/**
 * Moved unchanged from src/components/KoreaAIContextSection.tsx's inline
 * "Macro Adoption Chain" phase cards.
 *
 * KNOWN FINDING (Phase 3, not fixed here): unlike every other string in
 * this widget, these four cards were NOT behind an `isKo ?` branch in the
 * legacy source — `name` was always rendered in English and `description`
 * was always rendered in Korean, regardless of the selected UI language.
 * This is preserved exactly as-is (a structural move, not a translation
 * fix) rather than inventing new English copy that never existed in the
 * legacy source. Flagged for a future editorial pass to decide the
 * correct bilingual content, not decided here.
 */
export const MACRO_ADOPTION_PHASES = [
  {
    id: 'ai-investment',
    phaseLabel: 'PHASE 01',
    name: 'AI Investment ↑',
    description: '정부 및 주요 기업의 고성능 컴퓨팅 인프라 투자 가속화',
    highlight: false,
  },
  {
    id: 'infrastructure',
    phaseLabel: 'PHASE 02',
    name: 'Infrastructure ↑',
    description: '국가 컴퓨팅 센터 및 초거대 AI 데이터센터 확장',
    highlight: false,
  },
  {
    id: 'ai-adoption',
    phaseLabel: 'PHASE 03',
    name: 'AI Adoption ↑',
    description: '공공·금융·제조·교육 전 분야의 일상 업무 AI 보급',
    highlight: false,
  },
  {
    id: 'token-usage',
    phaseLabel: 'PHASE 04 ★',
    name: 'Token Usage ↑',
    description: '총 토큰 처리량 폭증에 따른 효율 격차 누적',
    highlight: true,
  },
];
