import React from 'react';
import { ChevronDown, ArrowDownRight } from 'lucide-react';
import { useUILanguage } from '../features/change-language';
import { getLocalizedText } from '../shared/i18n';
import { ARTICLE_CONTENT } from '../entities/article-content';
import { Container, SectionEyebrow, HeadingAccent } from '../shared/ui';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleParagraph,
  ArticlePullQuote,
  ArticleBigFinding,
} from './ArticleElements';

export const NewsHeroSection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
  const heroData = ARTICLE_CONTENT.hero;
  const introData = ARTICLE_CONTENT.introTheQuestion;

  // hero.headline is authoritative (reconnected — see docs/CONTENT_AUDIT.md);
  // it embeds one '\n' marking the intentional two-line break, with the
  // second line carrying the underline emphasis treatment.
  const headlineText = heroData.headline ? getLocalizedText(heroData.headline, language) : '';
  const [headlineLine1, headlineLine2] = headlineText.split('\n');

  return (
    <section
      id="hero"
      data-widget="NewsHeroSection"
      data-section="hero"
      className="relative min-h-[92vh] flex flex-col justify-between bg-surface text-ink py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-b border-rule"
    >
      <Container className="space-y-16 sm:space-y-20 my-auto">
        {/* Top Project Metadata Header */}
        <div data-role="stat" data-semantic-target="dl" className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4 text-xs font-mono text-ink-muted">
          <div data-role="stat" data-semantic-target="dl" className="flex items-center gap-3">
            <span className="text-ink font-bold tracking-widest uppercase">
              {isKo ? heroData.eyebrow?.ko : heroData.eyebrow?.en}
            </span>
            <span className="text-rule-neutral">/</span>
            <span data-source="widget">Data Journalism Investigation</span>
            <span className="text-rule-neutral">/</span>
            <span className="text-ink font-bold">2026</span>
          </div>
          <div className="text-ink-subtle font-mono text-[11px]">
            <span data-source="widget">COVER &amp; CORE THESIS</span>
          </div>
        </div>

        {/* Asymmetric Editorial Hero Layout: Left 60% / Right 40% */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 60% (7 cols on lg): Large Black Korean Typography */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-ink-muted uppercase tracking-wider font-semibold">
              <span data-source="widget">EXPLORING LINGUISTIC EFFICIENCY IN GEN-AI</span>
              <ArrowDownRight className="w-3.5 h-3.5 text-ink" />
            </div>

            <div className="space-y-3">
              <h1 data-role="heading" data-semantic-target="heading" className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.1]">
                {headlineLine1}
                {headlineLine2 && (
                  <>
                    <br />
                    <HeadingAccent>{headlineLine2}</HeadingAccent>
                  </>
                )}
              </h1>

              <p className="text-xl sm:text-2xl font-serif text-ink font-normal pt-2">
                {isKo ? heroData.subtitle?.ko : heroData.subtitle?.en}
              </p>
            </div>

            <p className="text-base sm:text-lg text-ink-body leading-relaxed max-w-[720px] font-normal border-l-2 border-rule-strong pl-4">
              {isKo ? heroData.deck?.ko : heroData.deck?.en}
            </p>

            {/* Quick Context Stat Ribbon */}
            <div
              data-role="stat-ribbon"
              data-semantic-target="dl"
              className="pt-4 border-t border-rule flex flex-wrap items-center gap-8 text-xs font-mono text-ink-body"
            >
              <dl data-role="stat" data-stat="analysis-target">
                <dt data-source="widget" className="text-ink-subtle block text-[10px] uppercase">ANALYSIS TARGET</dt>
                <dd data-source="widget" className="text-ink font-bold">o200k_base &amp; Flores-200</dd>
              </dl>
              <dl data-role="stat" data-stat="core-metric">
                <dt data-source="widget" className="text-ink-subtle block text-[10px] uppercase">CORE METRIC</dt>
                <dd data-source="widget" className="text-ink font-bold">Token Premium Ratio</dd>
              </dl>
              <dl data-role="stat" data-stat="observed-gap">
                <dt data-source="widget" className="text-ink-subtle block text-[10px] uppercase">OBSERVED GAP</dt>
                <dd className="text-ink font-bold">+78% Hangul Token Burden</dd>
              </dl>
            </div>
          </div>

          {/* Right 40% (5 cols on lg): Minimal Editorial Data Exhibit — deliberately quiet (docs/qa/DESIGN_LAW.md): supports the H1's claim, must not compete with it */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            {/* Minimal Token Contrast Visual */}
            <div className="bg-surface-alt rounded-xs p-6 space-y-6">
              <dl data-role="stat" data-semantic-target="dl" className="flex items-center justify-between border-b border-rule pb-3">
                <dt data-source="widget" className="text-xs font-mono text-ink font-bold uppercase tracking-wider">
                  FIG. 01 / REAL TOKEN SPLIT EXHIBIT
                </dt>
                <dd data-source="widget" className="text-[11px] font-mono text-ink-subtle">Pair Benchmark</dd>
              </dl>

              {/* Korean Row */}
              <div className="space-y-2">
                <dl data-role="stat" data-semantic-target="dl" className="flex items-center justify-between text-xs font-mono">
                  <dt data-source="widget" className="text-ink font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    Korean (한국어)
                  </dt>
                  <dd className="text-ink font-bold text-sm">31 TOKENS</dd>
                </dl>
                <div className="h-3 w-full bg-mark-track rounded-xs overflow-hidden border border-rule">
                  <div className="h-full bg-mark rounded-xs w-[100%] transition-all"></div>
                </div>
                <p data-source="widget" className="text-[11px] text-ink-body font-mono italic">
                  "인공지능 모델의 다국어 토큰화 처리 효율성..."
                </p>
              </div>

              {/* English Row */}
              <div className="space-y-2 pt-2 border-t border-rule">
                <dl data-role="stat" data-semantic-target="dl" className="flex items-center justify-between text-xs font-mono">
                  <dt data-source="widget" className="text-ink-body font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-ink-muted"></span>
                    English (영어)
                  </dt>
                  <dd className="text-ink-body font-bold text-sm">18 TOKENS</dd>
                </dl>
                <div className="h-3 w-full bg-mark-track rounded-xs overflow-hidden border border-rule">
                  <div className="h-full bg-ink-muted rounded-xs w-[58%] transition-all"></div>
                </div>
                <p data-source="widget" className="text-[11px] text-ink-subtle font-mono italic">
                  "Multilingual tokenization processing efficiency..."
                </p>
              </div>

              {/* Takeaway line */}
              <dl data-role="stat" data-semantic-target="dl" className="pt-3 border-t border-rule flex items-center justify-between text-xs font-mono">
                <dt data-source="widget" className="text-ink-subtle">Relative Ratio:</dt>
                <dd className="text-ink font-bold text-sm">1.72× (+72% Difference)</dd>
              </dl>
            </div>

            {/* News Archive Context Note */}
            <div className="border-l-2 border-rule-strong pl-4 py-1 space-y-1">
              <span data-source="widget" className="text-[11px] font-mono text-ink uppercase font-bold tracking-wider block">
                {isKo ? '보도 및 인프라 동향 아카이브' : 'News Evidence & Infrastructure Wave'}
              </span>
              <p data-source="widget" className="text-xs text-ink-body leading-relaxed">
                {isKo
                  ? '국가 AI 인프라 컴퓨팅 센터 구축 및 기업 전사적 AI 도입이 본격화되면서, 토큰 처리 효율성은 개인의 문제를 넘어 시스템의 문제로 확장되고 있습니다.'
                  : 'As national AI infrastructure and enterprise adoption scale rapidly, token efficiency transforms from a prompt issue into a structural computing issue.'}
              </p>
            </div>
          </div>
        </div>

        {/* LONG-FORM ARTICLE ESSAY / INTRODUCTORY BODY COLUMN */}
        <div className="pt-12 sm:pt-16 border-t border-rule">
          <ArticleReadingColumn>
            <SectionEyebrow className="mb-4">
              {isKo ? introData.eyebrow?.ko : introData.eyebrow?.en}
            </SectionEyebrow>

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
              bigNumber={(isKo ? introData.keyFinding?.bigNumber?.ko : introData.keyFinding?.bigNumber?.en) || '약 1.2× ~ 1.8×'}
              label={isKo ? introData.keyFinding?.label?.ko : introData.keyFinding?.label?.en}
              statement={isKo ? introData.keyFinding?.statement.ko : introData.keyFinding?.statement.en}
            />
          </ArticleReadingColumn>
        </div>
      </Container>

      {/* Minimal Scroll Down Prompt */}
      <Container className="pt-12 flex justify-start">
        <a
          href="#compare"
          className="inline-flex items-center gap-2 text-xs font-mono text-ink-muted hover:text-ink transition-colors group cursor-pointer"
        >
          <span data-source="widget" className="tracking-wider uppercase font-semibold">
            {isKo ? 'S1. 토큰 분절 실험실로 스크롤' : 'Scroll to S1. Tokenization Compare Lab'}
          </span>
          <ChevronDown className="w-4 h-4 text-ink group-hover:translate-y-1 transition-transform" />
        </a>
      </Container>
    </section>
  );
};
