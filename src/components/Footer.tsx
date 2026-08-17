import React from 'react';
import { useUILanguage } from '../features/change-language';
import { Database, ShieldCheck, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';

  return (
    <footer className="bg-[#FFFFFF] text-[#777773] py-16 px-4 sm:px-6 lg:px-12 border-t border-[#DADAD6] font-sans text-xs">
      <div className="max-w-[1360px] mx-auto space-y-12">
        {/* Top Branding & Meta */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#DADAD6] pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#111111]"></span>
              <span className="font-bold text-lg text-[#111111] tracking-tight">
                {isKo ? 'Token Premium Interactive Data Story' : 'Token Premium Interactive Data Story'}
              </span>
            </div>
            <p className="text-[#4A4A47] text-xs max-w-xl">
              {isKo
                ? '생성형 인공지능의 토큰화 효율 격차가 사회·경제적 업무 환경에 미치는 잠재적 영향을 탐색하는 데이터 저널리즘 기획물입니다.'
                : 'An interactive data journalism piece investigating the representation efficiency of generative AI across language structures and occupations.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
            <span className="px-3 py-1 bg-[#F7F7F5] border border-[#DADAD6] rounded-xs text-[#4A4A47]">
              Tokenizer: o200k_base
            </span>
            <span className="px-3 py-1 bg-[#111111] border border-[#111111] rounded-xs text-[#FFFFFF] font-bold">
              Status: Public Research Release
            </span>
          </div>
        </div>

        {/* 3 Columns Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h4 className="font-mono font-bold text-[#111111] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#111111]" />
              <span>데이터 출처 및 기준</span>
            </h4>
            <p className="text-[#777773] leading-relaxed text-xs">
              OpenAI Tiktoken 및 BPE 어휘집 라이브러리, Flores-200 다국어 벤치마크, 한국노동연구원/고용정보원 AI 직무 노출도 연구 보고서, 과학기술정보통신부 국가 AI 인프라 정책 공시.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-mono font-bold text-[#111111] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#111111]" />
              <span>연구 윤리 및 중립성</span>
            </h4>
            <p className="text-[#777773] leading-relaxed text-xs">
              본 프로젝트는 특정 모델 벤더 또는 특정 언어의 상업적 이해관계와 무관하며, 데이터 무결성 원칙에 따라 검증되지 않은 수치는 배제하고 분석되었습니다.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-mono font-bold text-[#111111] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#111111]" />
              <span>조건부 연구 해석 안내</span>
            </h4>
            <p className="text-[#777773] leading-relaxed text-xs">
              모든 분석 수치는 제시된 토크나이저 및 표본 문장군에 국한되며, 모델 고도화 및 어휘집 개편에 따라 결과는 갱신될 수 있습니다.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-[#DADAD6] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#777773] font-mono">
          <div>
            © 2026 Token Premium Research Project. White Editorial Data Journalism Design.
          </div>
          <div>
            Scrollytelling Editorial Architecture
          </div>
        </div>
      </div>
    </footer>
  );
};
