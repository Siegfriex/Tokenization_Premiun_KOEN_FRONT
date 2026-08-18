import React, { useState } from 'react';
import { useUILanguage } from '../features/change-language';
import { getLocalizedText } from '../shared/i18n';
import { ARTICLE_CONTENT } from '../entities/article-content';
import { DOMAIN_DISTRIBUTION_DATA } from '../entities/domain-distribution';
import { Container, SectionHeading, HeadingAccent, SelectableCard } from '../shared/ui';
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
    <section id="patterns" data-widget="TokenPremiumSection" data-section="patterns" className="py-20 sm:py-28 bg-surface-alt text-ink border-b border-rule scroll-mt-16">
      <Container gutter className="space-y-12">
        {/* Eyebrow & Headline */}
        <SectionHeading eyebrow={isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}>
          {isKo ? (
            <>
              한/영 말뭉치
              <br />
              <HeadingAccent>69,432건 정밀 분석</HeadingAccent>
            </>
          ) : (
            <>
              Corpus Analysis:
              <br />
              <HeadingAccent>69,432 Verified KO-EN Pairs</HeadingAccent>
            </>
          )}
        </SectionHeading>

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
        <ArticleFullWidthBreak figure className="my-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column (5 cols): Oversized Metric Stat Display */}
            <div className="lg:col-span-5 space-y-8">
              {/* Tier 1 — primary evidence panel: the slide's one central number (docs/qa/DESIGN_LAW.md) */}
              <div className="bg-surface border-2 border-rule-strong rounded-xs p-6 sm:p-8 space-y-6 shadow-sm">
                <dl data-role="stat" data-semantic-target="dl" className="text-xs font-mono text-ink-muted uppercase tracking-widest border-b border-rule pb-3 flex items-center justify-between">
                  <dt data-source="widget">{isKo ? '핵심 실측 지표' : 'CORE EMPIRICAL METRIC'}</dt>
                  <dd data-source="widget" className="text-ink font-bold">o200k_base benchmark</dd>
                </dl>

                <div data-role="stat" data-semantic-target="dl" className="space-y-2">
                  <span data-source="widget" className="text-xs font-mono text-ink-muted uppercase tracking-wider block">
                    {isKo ? '관측된 토큰 프리미엄 비율' : 'OBSERVED TOKEN PREMIUM RATIO'}
                  </span>
                  <div
                    className="text-5xl sm:text-6xl lg:text-7xl font-black font-mono tracking-tight text-ink whitespace-nowrap"
                  >
                    1.29<span className="text-2xl sm:text-3xl text-ink-muted font-sans">×</span>
                    <span className="text-2xl sm:text-3xl text-ink-muted font-light mx-1.5">~</span>
                    1.83<span className="text-2xl sm:text-3xl text-ink font-sans">×</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono text-ink-body pt-3 border-t border-rule">
                  <dl data-role="stat" data-semantic-target="dl" className="flex justify-between py-1 border-b border-rule/60">
                    <dt data-source="widget" className="text-ink-muted">Average Token Premium:</dt>
                    <dd className="text-ink font-bold">1.68× (+68%)</dd>
                  </dl>
                  <dl data-role="stat" data-semantic-target="dl" className="flex justify-between py-1 border-b border-rule/60">
                    <dt data-source="widget" className="text-ink-muted">Baseline (English):</dt>
                    <dd className="text-ink-body">1.00× (Standard)</dd>
                  </dl>
                  <dl data-role="stat" data-semantic-target="dl" className="flex justify-between py-1">
                    <dt data-source="widget" className="text-ink-muted">Domain Range:</dt>
                    <dd className="text-ink font-bold">Business (1.44×) ~ Daily (1.83×)</dd>
                  </dl>
                </div>
              </div>

              {/* Tier 3 — tertiary annotation panel: definitional, not evidentiary (docs/qa/DESIGN_LAW.md) */}
              <div data-role="stat" data-semantic-target="dl" className="p-4 bg-surface-alt border border-rule rounded-xs font-mono text-xs text-ink-body space-y-2">
                <span data-source="widget" className="text-[10px] text-ink uppercase font-bold tracking-widest block">
                  {isKo ? '산출 공식' : 'MATHEMATICAL FORMULA'}
                </span>
                <p data-source="widget" className="text-ink font-semibold text-sm">
                  {isKo ? 'Token Premium = 한국어 토큰 수 ÷ 영어 토큰 수' : 'Token Premium = Tokens(Hangul) / Tokens(English)'}
                </p>
                <p data-source="widget" className="text-ink-muted text-[11px] font-sans">
                  동일 의미 전달 조건하에서 언어별 토큰 소비량의 비율을 산출한 지표입니다.
                </p>
              </div>
            </div>

            {/* Right Column (7 cols): Domain Distribution Exhibit */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-surface border border-rule rounded-xs p-6 space-y-6 shadow-xs">
                <div data-role="stat" data-semantic-target="dl" className="flex items-center justify-between border-b border-rule pb-3">
                  <dl data-role="stat" data-semantic-target="dl">
                    <dt data-source="widget" className="text-xs font-mono text-ink font-bold uppercase tracking-wider block">
                      {isKo ? '도메인별 분포' : 'DOMAIN DISTRIBUTION EXHIBIT'}
                    </dt>
                    <dd data-source="widget" className="text-[11px] font-mono text-ink-muted">
                      분야별 토큰 소비 비율 분포 분석
                    </dd>
                  </dl>
                  <span className="text-xs font-mono text-ink-muted">7 Benchmark Domains</span>
                </div>

                {/* Minimal Bar & Dot Distribution List — ledger rhythm, not floating cards (Director redline: 감사 자료 패널) */}
                <ul data-collection="domain-distribution" className="space-y-3 pt-2">
                  {DOMAIN_DISTRIBUTION_DATA.map((item) => {
                    const isSelected = item.id === selectedDomainId;
                    return (
                      <li key={item.id}>
                      <SelectableCard
                        selected={isSelected}
                        onSelect={() => setSelectedDomainId(item.id)}
                        itemId={item.id}
                        surface="surface-alt"
                        className="p-3.5 space-y-2 text-left w-full"
                      >
                        <span data-role="stat" data-semantic-target="dl" className="flex items-center justify-between text-xs font-mono">
                          <span className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isSelected ? 'bg-on-accent' : 'bg-accent'
                              }`}
                            ></span>
                            <span className={`font-bold ${isSelected ? 'text-on-accent' : 'text-ink'}`}>
                              {getLocalizedText(item.label, language)}
                            </span>
                          </span>
                          <span className="flex items-center gap-3">
                            <span data-source="widget"
                              className={
                                isSelected
                                  ? 'text-on-accent-muted text-[11px] tabular-nums'
                                  : 'text-ink-muted text-[11px] tabular-nums'
                              }
                            >
                              {item.enTokens} vs {item.koTokens} tokens
                            </span>
                            <span className={`font-bold font-mono text-sm tabular-nums ${isSelected ? 'text-on-accent' : 'text-ink'}`}>
                              {item.ratio.toFixed(2)}×
                            </span>
                          </span>
                        </span>

                        {/* Visual Proportional Bar */}
                        <span className="h-2 w-full bg-mark-track rounded-xs overflow-hidden flex border border-rule">
                          <span
                            className={`h-full rounded-xs transition-all duration-300 ${
                              isSelected ? 'bg-on-accent' : 'bg-mark'
                            }`}
                            style={{ width: `${(item.ratio / 2.0) * 100}%` }}
                          ></span>
                        </span>
                      </SelectableCard>
                      </li>
                    );
                  })}
                </ul>

                <dl data-role="stat" data-semantic-target="dl" className="pt-2 text-xs font-mono text-ink-muted flex items-center justify-between border-t border-rule">
                  <dt>Baseline: 1.00× (English)</dt>
                  <dd className="text-ink font-bold">Max Observed: 1.83×</dd>
                </dl>
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
      </Container>
    </section>
  );
};
