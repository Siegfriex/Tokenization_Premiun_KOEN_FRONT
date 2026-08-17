import React from 'react';
import { UILanguage } from '../types';
import { ChevronDown, ArrowDownRight } from 'lucide-react';
import { ARTICLE_CONTENT } from '../data/articleContent';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleParagraph,
  ArticlePullQuote,
  ArticleBigFinding,
} from './ArticleElements';

interface NewsHeroSectionProps {
  uiLang: UILanguage;
}

export const NewsHeroSection: React.FC<NewsHeroSectionProps> = ({ uiLang }) => {
  const isKo = uiLang === 'ko';
  const heroData = ARTICLE_CONTENT.hero;
  const introData = ARTICLE_CONTENT.introTheQuestion;

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between bg-[#FFFFFF] text-[#111111] py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-b border-[#DADAD6]"
    >
      <div className="max-w-[1360px] mx-auto w-full space-y-16 sm:space-y-20 my-auto">
        {/* Top Project Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DADAD6] pb-4 text-xs font-mono text-[#777773]">
          <div className="flex items-center gap-3">
            <span className="text-[#111111] font-bold tracking-widest uppercase">
              {isKo ? heroData.eyebrow?.ko : heroData.eyebrow?.en}
            </span>
            <span className="text-[#DADAD6]">/</span>
            <span>Data Journalism Investigation</span>
            <span className="text-[#DADAD6]">/</span>
            <span className="text-[#111111] font-bold">2026</span>
          </div>
          <div className="text-[#8A8A85] font-mono text-[11px]">
            <span>COVER &amp; CORE THESIS</span>
          </div>
        </div>

        {/* Asymmetric Editorial Hero Layout: Left 60% / Right 40% */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 60% (7 cols on lg): Large Black Korean Typography */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777773] uppercase tracking-wider font-semibold">
              <span>EXPLORING LINGUISTIC EFFICIENCY IN GEN-AI</span>
              <ArrowDownRight className="w-3.5 h-3.5 text-[#111111]" />
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] leading-[1.15]">
                {isKo ? (
                  <>
                    같은 질문,
                    <br />
                    <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                      다른 청구서
                    </span>
                  </>
                ) : (
                  <>
                    Same Question,
                    <br />
                    <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                      Different Bill
                    </span>
                  </>
                )}
              </h1>

              <p className="text-xl sm:text-2xl font-serif text-[#111111] font-normal pt-2">
                {isKo ? heroData.subtitle?.ko : heroData.subtitle?.en}
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#4A4A47] leading-relaxed max-w-[720px] font-normal border-l-2 border-[#111111] pl-4">
              {isKo ? heroData.deck?.ko : heroData.deck?.en}
            </p>

            {/* Quick Context Stat Ribbon */}
            <div className="pt-4 border-t border-[#DADAD6] flex flex-wrap items-center gap-8 text-xs font-mono text-[#4A4A47]">
              <div>
                <span className="text-[#8A8A85] block text-[10px] uppercase">ANALYSIS TARGET</span>
                <span className="text-[#111111] font-bold">o200k_base &amp; Flores-200</span>
              </div>
              <div>
                <span className="text-[#8A8A85] block text-[10px] uppercase">CORE METRIC</span>
                <span className="text-[#111111] font-bold">Token Premium Ratio</span>
              </div>
              <div>
                <span className="text-[#8A8A85] block text-[10px] uppercase">OBSERVED GAP</span>
                <span className="text-[#111111] font-bold">+78% Hangul Token Burden</span>
              </div>
            </div>
          </div>

          {/* Right 40% (5 cols on lg): Minimal Editorial Data Exhibit */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            {/* Minimal Token Contrast Visual */}
            <div className="bg-[#F7F7F5] border border-[#DADAD6] rounded-xs p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[#DADAD6] pb-3">
                <span className="text-xs font-mono text-[#111111] font-bold uppercase tracking-wider">
                  FIG. 01 / REAL TOKEN SPLIT EXHIBIT
                </span>
                <span className="text-[11px] font-mono text-[#8A8A85]">Pair Benchmark</span>
              </div>

              {/* Korean Row */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#111111] font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#111111]"></span>
                    Korean (한국어)
                  </span>
                  <span className="text-[#111111] font-bold text-sm">31 TOKENS</span>
                </div>
                <div className="h-3 w-full bg-[#E8E8E4] rounded-xs overflow-hidden border border-[#DADAD6]">
                  <div className="h-full bg-[#161616] rounded-xs w-[100%] transition-all"></div>
                </div>
                <p className="text-[11px] text-[#4A4A47] font-mono italic">
                  "인공지능 모델의 다국어 토큰화 처리 효율성..."
                </p>
              </div>

              {/* English Row */}
              <div className="space-y-2 pt-2 border-t border-[#DADAD6]">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#4A4A47] font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#777773]"></span>
                    English (영어)
                  </span>
                  <span className="text-[#4A4A47] font-bold text-sm">18 TOKENS</span>
                </div>
                <div className="h-3 w-full bg-[#E8E8E4] rounded-xs overflow-hidden border border-[#DADAD6]">
                  <div className="h-full bg-[#777773] rounded-xs w-[58%] transition-all"></div>
                </div>
                <p className="text-[11px] text-[#8A8A85] font-mono italic">
                  "Multilingual tokenization processing efficiency..."
                </p>
              </div>

              {/* Takeaway line */}
              <div className="pt-3 border-t border-[#DADAD6] flex items-center justify-between text-xs font-mono">
                <span className="text-[#8A8A85]">Relative Ratio:</span>
                <span className="text-[#111111] font-bold text-sm">1.72× (+72% Difference)</span>
              </div>
            </div>

            {/* News Archive Context Note */}
            <div className="border-l-2 border-[#111111] pl-4 py-1 space-y-1">
              <span className="text-[11px] font-mono text-[#111111] uppercase font-bold tracking-wider block">
                {isKo ? '보도 및 인프라 동향 아카이브' : 'News Evidence & Infrastructure Wave'}
              </span>
              <p className="text-xs text-[#4A4A47] leading-relaxed">
                {isKo
                  ? '국가 AI 인프라 컴퓨팅 센터 구축 및 기업 전사적 AI 도입이 본격화되면서, 토큰 처리 효율성은 개인의 문제를 넘어 시스템의 문제로 확장되고 있습니다.'
                  : 'As national AI infrastructure and enterprise adoption scale rapidly, token efficiency transforms from a prompt issue into a structural computing issue.'}
              </p>
            </div>
          </div>
        </div>

        {/* LONG-FORM ARTICLE ESSAY / INTRODUCTORY BODY COLUMN */}
        <div className="pt-12 sm:pt-16 border-t border-[#DADAD6]">
          <ArticleReadingColumn>
            <div className="text-xs font-mono text-[#777773] font-bold uppercase tracking-widest mb-4">
              {isKo ? introData.eyebrow?.ko : introData.eyebrow?.en}
            </div>

            <ArticleLead>
              {isKo ? introData.lead?.ko : introData.lead?.en}
            </ArticleLead>

            {isKo
              ? introData.preFigureParagraphs?.ko.map((p, idx) => (
                  <ArticleParagraph key={idx}>{p}</ArticleParagraph>
                ))
              : introData.preFigureParagraphs?.en.map((p, idx) => (
                  <ArticleParagraph key={idx}>{p}</ArticleParagraph>
                ))}

            <ArticlePullQuote citation={isKo ? '토큰 프리미엄 탐사 취재팀' : 'Token Premium Research Investigation'}>
              {isKo ? introData.pullQuote?.ko : introData.pullQuote?.en}
            </ArticlePullQuote>

            <ArticleBigFinding
              bigNumber={introData.keyFinding?.bigNumber || '약 1.2× ~ 1.8×'}
              label={isKo ? introData.keyFinding?.label?.ko : introData.keyFinding?.label?.en}
              statement={isKo ? introData.keyFinding?.statement.ko : introData.keyFinding?.statement.en}
            />
          </ArticleReadingColumn>
        </div>
      </div>

      {/* Minimal Scroll Down Prompt */}
      <div className="max-w-[1360px] mx-auto w-full pt-12 flex justify-start">
        <a
          href="#compare"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#777773] hover:text-[#111111] transition-colors group cursor-pointer"
        >
          <span className="tracking-wider uppercase font-semibold">
            {isKo ? 'S1. 토큰 분절 실험실로 스크롤' : 'Scroll to S1. Tokenization Compare Lab'}
          </span>
          <ChevronDown className="w-4 h-4 text-[#111111] group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};
