import React from 'react';
import { useUILanguage } from '../features/change-language';
import { Database, ShieldCheck, Layers } from 'lucide-react';
import { Container } from '../shared/ui';

export const Footer: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';

  return (
    <footer data-widget="Footer" data-role="site-footer" className="bg-surface text-ink-muted py-16 px-4 sm:px-6 lg:px-12 border-t border-rule font-sans text-xs">
      <Container className="space-y-12">
        {/* Top Branding & Meta */}
        <div data-role="stat" data-semantic-target="dl" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-rule pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
              <span data-source="widget" className="font-bold text-lg text-ink tracking-tight">
                {isKo ? 'Token Premium Interactive Data Story' : 'Token Premium Interactive Data Story'}
              </span>
            </div>
            <p data-source="widget" className="text-ink-body text-xs max-w-xl">
              {isKo
                ? '생성형 인공지능의 토큰화 효율 격차가 사회·경제적 업무 환경에 미치는 잠재적 영향을 탐색하는 데이터 저널리즘 기획물입니다.'
                : 'An interactive data journalism piece investigating the representation efficiency of generative AI across language structures and occupations.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
            <span data-source="widget" className="px-3 py-1 bg-surface-alt border border-rule rounded-xs text-ink-body">
              Tokenizer: o200k_base
            </span>
          </div>
        </div>

        {/* 3 Columns Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h2 data-role="heading" data-semantic-target="heading" className="font-mono font-bold text-ink uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-ink" />
              <span data-source="widget">데이터 출처 및 기준</span>
            </h2>
            <p data-source="widget" className="text-ink-muted leading-relaxed text-xs">
              OpenAI Tiktoken 및 BPE 어휘집 라이브러리, Flores-200 다국어 벤치마크, 한국노동연구원/고용정보원 AI 직무 노출도 연구 보고서, 과학기술정보통신부 국가 AI 인프라 정책 공시.
            </p>
          </div>

          <div className="space-y-2">
            <h2 data-role="heading" data-semantic-target="heading" className="font-mono font-bold text-ink uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-ink" />
              <span data-source="widget">연구 윤리 및 중립성</span>
            </h2>
            <p data-source="widget" className="text-ink-muted leading-relaxed text-xs">
              본 프로젝트는 특정 모델 벤더 또는 특정 언어의 상업적 이해관계와 무관하며, 데이터 무결성 원칙에 따라 검증되지 않은 수치는 배제하고 분석되었습니다.
            </p>
          </div>

          <div className="space-y-2">
            <h2 data-role="heading" data-semantic-target="heading" className="font-mono font-bold text-ink uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-ink" />
              <span data-source="widget">조건부 연구 해석 안내</span>
            </h2>
            <p data-source="widget" className="text-ink-muted leading-relaxed text-xs">
              모든 분석 수치는 제시된 토크나이저 및 표본 문장군에 국한되며, 모델 고도화 및 어휘집 개편에 따라 결과는 갱신될 수 있습니다.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
