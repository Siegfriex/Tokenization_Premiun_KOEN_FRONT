import React, { useState } from 'react';
import { useUILanguage } from '../features/change-language';
import { getLocalizedText } from '../shared/i18n';
import { ARTICLE_CONTENT } from '../entities/article-content';
import { DOMAIN_DISTRIBUTION_DATA } from '../entities/domain-distribution';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleParagraph,
  ArticleFigureCaption,
  ArticleFinding,
  ArticleFullWidthBreak,
} from './ArticleElements';

export const TokenPremiumSection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
  const articleData = ARTICLE_CONTENT.corpusAnalysis;
  const [selectedDomainId, setSelectedDomainId] = useState<string>(DOMAIN_DISTRIBUTION_DATA[0].id);

  return (
    <section id="patterns" className="py-20 sm:py-28 bg-surface-alt text-ink border-b border-rule scroll-mt-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Eyebrow & Headline */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs font-mono text-ink-muted font-bold tracking-widest uppercase">
            {isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-tight">
            {isKo ? (
              <>
                한/영 말뭉치
                <br />
                <span className="text-ink underline decoration-emphasis underline-offset-8 decoration-2">
                  69,432건 정밀 분석
                </span>
              </>
            ) : (
              <>
                Corpus Analysis:
                <br />
                <span className="text-ink underline decoration-emphasis underline-offset-8 decoration-2">
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
              <div className="bg-surface border border-rule rounded-xs p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="text-xs font-mono text-ink-muted uppercase tracking-widest border-b border-rule pb-3 flex items-center justify-between">
                  <span>CORE EMPIRICAL METRIC</span>
                  <span className="text-ink font-bold">o200k_base benchmark</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block">
                    OBSERVED TOKEN PREMIUM RATIO
                  </span>
                  <div className="text-6xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tight text-ink">
                    1.29<span className="text-3xl sm:text-4xl text-ink-muted font-sans">×</span>
                    <span className="text-3xl sm:text-4xl text-ink-muted font-light mx-2">~</span>
                    1.83<span className="text-3xl sm:text-4xl text-ink font-sans">×</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono text-ink-body pt-3 border-t border-rule">
                  <div className="flex justify-between py-1 border-b border-rule/60">
                    <span className="text-ink-muted">Average Token Premium:</span>
                    <span className="text-ink font-bold">1.68× (+68%)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-rule/60">
                    <span className="text-ink-muted">Baseline (English):</span>
                    <span className="text-ink-body">1.00× (Standard)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-ink-muted">Domain Range:</span>
                    <span className="text-ink font-bold">Business (1.44×) ~ Daily (1.83×)</span>
                  </div>
                </div>
              </div>

              {/* Formula Notation Box */}
              <div className="p-4 bg-surface border border-rule rounded-xs font-mono text-xs text-ink-body space-y-2">
                <span className="text-[10px] text-ink uppercase font-bold tracking-widest block">
                  MATHEMATICAL FORMULA
                </span>
                <p className="text-ink font-semibold text-sm">
                  Token Premium = Tokens(Hangul) / Tokens(English)
                </p>
                <p className="text-ink-muted text-[11px] font-sans">
                  동일 의미 전달 조건하에서 언어별 토큰 소비량의 비율을 산출한 지표입니다.
                </p>
              </div>
            </div>

            {/* Right Column (7 cols): Domain Distribution Exhibit */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-surface border border-rule rounded-xs p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <div>
                    <span className="text-xs font-mono text-ink font-bold uppercase tracking-wider block">
                      DOMAIN DISTRIBUTION EXHIBIT
                    </span>
                    <span className="text-[11px] font-mono text-ink-muted">
                      분야별 토큰 소비 비율 분포 분석
                    </span>
                  </div>
                  <span className="text-xs font-mono text-ink-muted">7 Benchmark Domains</span>
                </div>

                {/* Minimal Bar & Dot Distribution List */}
                <div className="space-y-4 pt-2">
                  {DOMAIN_DISTRIBUTION_DATA.map((item) => {
                    const isSelected = item.id === selectedDomainId;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setSelectedDomainId(item.id)}
                        aria-pressed={isSelected}
                        className={`p-3.5 rounded-xs border transition-all cursor-pointer space-y-2 text-left w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rule-strong ${
                          isSelected
                            ? 'bg-surface-inverse border-surface-inverse text-ink-inverse'
                            : 'bg-surface-alt border-rule hover:border-ink'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isSelected ? 'bg-ink-inverse' : 'bg-surface-inverse'
                              }`}
                            ></span>
                            <span className={`font-bold ${isSelected ? 'text-ink-inverse' : 'text-ink'}`}>
                              {getLocalizedText(item.label, language)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={isSelected ? 'text-[#DADAD6] text-[11px]' : 'text-ink-muted text-[11px]'}>
                              {item.enTokens} vs {item.koTokens} tokens
                            </span>
                            <span className={`font-bold font-mono text-sm ${isSelected ? 'text-ink-inverse' : 'text-ink'}`}>
                              {item.ratio.toFixed(2)}×
                            </span>
                          </div>
                        </div>

                        {/* Visual Proportional Bar */}
                        <div className="h-2 w-full bg-[#E8E8E4] rounded-xs overflow-hidden flex border border-rule">
                          <div
                            className={`h-full rounded-xs transition-all duration-300 ${
                              isSelected ? 'bg-ink-inverse' : 'bg-[#161616]'
                            }`}
                            style={{ width: `${(item.ratio / 2.0) * 100}%` }}
                          ></div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 text-xs font-mono text-ink-muted flex items-center justify-between border-t border-rule">
                  <span>Baseline: 1.00× (English)</span>
                  <span className="text-ink font-bold">Max Observed: 1.83×</span>
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
