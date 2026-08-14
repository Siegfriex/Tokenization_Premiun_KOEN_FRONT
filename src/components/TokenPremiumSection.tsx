import React, { useState } from 'react';
import { UILanguage } from '../types';
import { ARTICLE_CONTENT } from '../data/articleContent';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleParagraph,
  ArticleFigureCaption,
  ArticleFinding,
  ArticleFullWidthBreak,
} from './ArticleElements';

interface TokenPremiumSectionProps {
  uiLang: UILanguage;
}

const DOMAIN_DISTRIBUTION_DATA = [
  { domain: 'Colloquial / Daily', ratio: 1.38, koTokens: 11, enTokens: 8, labelKo: '구어체 (일상적 표현)' },
  { domain: 'Dialogue / Chat', ratio: 1.45, koTokens: 13, enTokens: 9, labelKo: '대화체 (질의응답 및 메신저)' },
  { domain: 'News / Media', ratio: 1.72, koTokens: 24, enTokens: 14, labelKo: '뉴스 및 보도 기사' },
  { domain: 'Public / Municipal Web', ratio: 1.75, koTokens: 14, enTokens: 8, labelKo: '지자체 웹사이트 및 조례' },
  { domain: 'Korean Literature', ratio: 1.65, koTokens: 20, enTokens: 12, labelKo: '한국문학 및 수필' },
  { domain: 'Legal / Formal Documents', ratio: 1.13, koTokens: 26, enTokens: 23, labelKo: '법률 문서 및 정형 계약' },
];

export const TokenPremiumSection: React.FC<TokenPremiumSectionProps> = ({ uiLang }) => {
  const isKo = uiLang === 'ko';
  const articleData = ARTICLE_CONTENT.corpusAnalysis;
  const [selectedDomain, setSelectedDomain] = useState<string>('Colloquial / Daily');

  return (
    <section id="patterns" className="py-20 sm:py-28 bg-[#F1F2F2] text-[#111111] border-b border-[#DADAD6] scroll-mt-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Eyebrow & Headline */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs font-mono text-[#777773] font-bold tracking-widest uppercase">
            {isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
            {isKo ? (
              <>
                한/영 말뭉치
                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  69,432건 정밀 분석
                </span>
              </>
            ) : (
              <>
                Corpus Analysis:
                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  69,432 Verified KO-EN Pairs
                </span>
              </>
            )}
          </h2>
        </div>

        {/* READING COLUMN: Pre-Figure Journalism Text */}
        <ArticleReadingColumn>
          <ArticleLead>
            {isKo ? articleData.lead?.ko : articleData.lead?.en}
          </ArticleLead>

          {isKo
            ? articleData.preFigureParagraphs?.ko.map((p, idx) => (
                <ArticleParagraph key={idx}>{p}</ArticleParagraph>
              ))
            : articleData.preFigureParagraphs?.en.map((p, idx) => (
                <ArticleParagraph key={idx}>{p}</ArticleParagraph>
              ))}
        </ArticleReadingColumn>

        {/* FULL-WIDTH BREAKOUT: Big Number Reveal + Asymmetric Distribution Layout */}
        <ArticleFullWidthBreak className="my-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column (5 cols): Oversized Metric Stat Display */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#FFFFFF] border border-[#DADAD6] rounded-xs p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="text-xs font-mono text-[#777773] uppercase tracking-widest border-b border-[#DADAD6] pb-3 flex items-center justify-between">
                  <span>CORE EMPIRICAL METRIC</span>
                  <span className="text-[#111111] font-bold">o200k_base benchmark</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#777773] uppercase tracking-wider block">
                    OBSERVED TOKEN PREMIUM RATIO
                  </span>
                  <div className="text-6xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tight text-[#111111]">
                    1.29<span className="text-3xl sm:text-4xl text-[#777773] font-sans">×</span>
                    <span className="text-3xl sm:text-4xl text-[#777773] font-light mx-2">~</span>
                    1.83<span className="text-3xl sm:text-4xl text-[#111111] font-sans">×</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono text-[#4A4A47] pt-3 border-t border-[#DADAD6]">
                  <div className="flex justify-between py-1 border-b border-[#DADAD6]/60">
                    <span className="text-[#777773]">Average Token Premium:</span>
                    <span className="text-[#111111] font-bold">1.68× (+68%)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#DADAD6]/60">
                    <span className="text-[#777773]">Baseline (English):</span>
                    <span className="text-[#4A4A47]">1.00× (Standard)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#777773]">Domain Range:</span>
                    <span className="text-[#111111] font-bold">Business (1.44×) ~ Daily (1.83×)</span>
                  </div>
                </div>
              </div>

              {/* Formula Notation Box */}
              <div className="p-4 bg-[#FFFFFF] border border-[#DADAD6] rounded-xs font-mono text-xs text-[#4A4A47] space-y-2">
                <span className="text-[10px] text-[#111111] uppercase font-bold tracking-widest block">
                  MATHEMATICAL FORMULA
                </span>
                <p className="text-[#111111] font-semibold text-sm">
                  Token Premium = Tokens(Hangul) / Tokens(English)
                </p>
                <p className="text-[#777773] text-[11px] font-sans">
                  동일 의미 전달 조건하에서 언어별 토큰 소비량의 비율을 산출한 지표입니다.
                </p>
              </div>
            </div>

            {/* Right Column (7 cols): Domain Distribution Exhibit */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#FFFFFF] border border-[#DADAD6] rounded-xs p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#DADAD6] pb-3">
                  <div>
                    <span className="text-xs font-mono text-[#111111] font-bold uppercase tracking-wider block">
                      DOMAIN DISTRIBUTION EXHIBIT
                    </span>
                    <span className="text-[11px] font-mono text-[#777773]">
                      분야별 토큰 소비 비율 분포 분석
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#777773]">7 Benchmark Domains</span>
                </div>

                {/* Minimal Bar & Dot Distribution List */}
                <div className="space-y-4 pt-2">
                  {DOMAIN_DISTRIBUTION_DATA.map((item) => {
                    const isSelected = item.domain === selectedDomain;
                    return (
                      <div
                        key={item.domain}
                        onClick={() => setSelectedDomain(item.domain)}
                        className={`p-3.5 rounded-xs border transition-all cursor-pointer space-y-2 ${
                          isSelected
                            ? 'bg-[#111111] border-[#111111] text-[#FFFFFF]'
                            : 'bg-[#F7F7F5] border-[#DADAD6] hover:border-[#111111]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isSelected ? 'bg-[#FFFFFF]' : 'bg-[#111111]'
                              }`}
                            ></span>
                            <span className={`font-bold ${isSelected ? 'text-[#FFFFFF]' : 'text-[#111111]'}`}>
                              {isKo ? item.labelKo : item.domain}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={isSelected ? 'text-[#DADAD6] text-[11px]' : 'text-[#777773] text-[11px]'}>
                              {item.enTokens} vs {item.koTokens} tokens
                            </span>
                            <span className={`font-bold font-mono text-sm ${isSelected ? 'text-[#FFFFFF]' : 'text-[#111111]'}`}>
                              {item.ratio.toFixed(2)}×
                            </span>
                          </div>
                        </div>

                        {/* Visual Proportional Bar */}
                        <div className="h-2 w-full bg-[#E8E8E4] rounded-xs overflow-hidden flex border border-[#DADAD6]">
                          <div
                            className={`h-full rounded-xs transition-all duration-300 ${
                              isSelected ? 'bg-[#FFFFFF]' : 'bg-[#161616]'
                            }`}
                            style={{ width: `${(item.ratio / 2.0) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 text-xs font-mono text-[#777773] flex items-center justify-between border-t border-[#DADAD6]">
                  <span>Baseline: 1.00× (English)</span>
                  <span className="text-[#111111] font-bold">Max Observed: 1.83×</span>
                </div>
              </div>
            </div>
          </div>

          {/* Figure Caption & Source */}
          <ArticleFigureCaption
            figNum={articleData.figureNumber}
            caption={isKo ? articleData.figureCaption?.ko : articleData.figureCaption?.en}
            source={isKo ? articleData.figureSource?.ko : articleData.figureSource?.en}
          />
        </ArticleFullWidthBreak>

        {/* READING COLUMN: Post-Figure Analytical Interpretation & Key Finding */}
        <ArticleReadingColumn>
          {isKo
            ? articleData.postFigureParagraphs?.ko.map((p, idx) => (
                <ArticleParagraph key={idx}>{p}</ArticleParagraph>
              ))
            : articleData.postFigureParagraphs?.en.map((p, idx) => (
                <ArticleParagraph key={idx}>{p}</ArticleParagraph>
              ))}

          <ArticleFinding
            label={isKo ? articleData.keyFinding?.label?.ko : articleData.keyFinding?.label?.en}
            statement={isKo ? articleData.keyFinding?.statement.ko : articleData.keyFinding?.statement.en}
          />
        </ArticleReadingColumn>
      </div>
    </section>
  );
};
