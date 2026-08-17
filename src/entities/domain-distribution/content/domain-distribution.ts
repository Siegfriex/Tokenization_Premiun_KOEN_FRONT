/**
 * PROTECTED research content. Moved unchanged (ratio / koTokens / enTokens
 * values) from src/components/TokenPremiumSection.tsx's local
 * DOMAIN_DISTRIBUTION_DATA array. `domain` (English label) + `labelKo`
 * merged into a single `label: { ko, en }` field; this is a structural
 * move only, no value was altered.
 */
import { DomainDistributionItem } from '../model/types';

export const DOMAIN_DISTRIBUTION_DATA: DomainDistributionItem[] = [
  {
    id: 'colloquial-daily',
    label: { ko: '구어체 (일상적 표현)', en: 'Colloquial / Daily' },
    ratio: 1.38,
    koTokens: 11,
    enTokens: 8,
  },
  {
    id: 'dialogue-chat',
    label: { ko: '대화체 (질의응답 및 메신저)', en: 'Dialogue / Chat' },
    ratio: 1.45,
    koTokens: 13,
    enTokens: 9,
  },
  {
    id: 'news-media',
    label: { ko: '뉴스 및 보도 기사', en: 'News / Media' },
    ratio: 1.72,
    koTokens: 24,
    enTokens: 14,
  },
  {
    id: 'public-municipal-web',
    label: { ko: '지자체 웹사이트 및 조례', en: 'Public / Municipal Web' },
    ratio: 1.75,
    koTokens: 14,
    enTokens: 8,
  },
  {
    id: 'korean-literature',
    label: { ko: '한국문학 및 수필', en: 'Korean Literature' },
    ratio: 1.65,
    koTokens: 20,
    enTokens: 12,
  },
  {
    id: 'legal-formal-documents',
    label: { ko: '법률 문서 및 정형 계약', en: 'Legal / Formal Documents' },
    ratio: 1.13,
    koTokens: 26,
    enTokens: 23,
  },
];
