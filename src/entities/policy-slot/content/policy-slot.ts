/** Moved unchanged from src/data/storyData.ts (VERIFIED_POLICY_SLOTS). */
import { VerifiedDataSlot } from '../../../types';

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
