import React, { useState } from 'react';
import { useUILanguage } from '../features/change-language';
import { TOKEN_BASELINE_SIMULATION } from '../entities/occupation';
import { ARTICLE_CONTENT } from '../entities/article-content';
import { Container, SectionHeading, HeadingAccent, SelectableCard } from '../shared/ui';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleParagraph,
  ArticleFigureCaption,
  ArticleFinding,
  ArticleFullWidthBreak,
} from './ArticleElements';

export const OccupationSection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
  const articleData = ARTICLE_CONTENT.accumulatedBurden;
  const [promptCount, setPromptCount] = useState<number>(100);

  const { baseEnPerPrompt, baseKoPerPrompt } = TOKEN_BASELINE_SIMULATION;
  const tokenGapPerPrompt = baseKoPerPrompt - baseEnPerPrompt;

  const totalEn = baseEnPerPrompt * promptCount;
  const totalKo = baseKoPerPrompt * promptCount;
  const totalGap = tokenGapPerPrompt * promptCount;

  return (
    <section id="burden" data-widget="OccupationSection" data-section="burden" className="py-20 sm:py-28 bg-surface text-ink border-b border-rule scroll-mt-16">
      <Container gutter className="space-y-12">
        {/* Section Eyebrow & Large Question */}
        <SectionHeading eyebrow={isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}>
          {isKo ? (
            <>
              그래서 이 차이는
              <br />
              <HeadingAccent>얼마나 누적될까?</HeadingAccent>
            </>
          ) : (
            <>
              How Does This Discrepancy
              <br />
              <HeadingAccent>Compound Over Time?</HeadingAccent>
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

        {/* FULL-WIDTH BREAKOUT: Interactive Simulator & Occupational Exposure */}
        <ArticleFullWidthBreak figure className="space-y-12 my-8">
          {/* Interactive Repetition Multiplier & Oversized Number Display */}
          <div className="bg-surface border-2 border-rule-strong rounded-xs p-6 sm:p-10 space-y-8 shadow-sm">
            <div data-role="stat" data-semantic-target="dl" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-4">
              <dl data-role="stat" data-semantic-target="dl" className="space-y-1">
                <dt data-source="widget" className="text-xs font-mono text-ink font-bold uppercase tracking-wider block">
                  {isKo ? '반복 사용 시뮬레이터' : 'WORKFLOW REPETITION SIMULATOR'}
                </dt>
                <dd data-source="widget" className="text-xs text-ink-muted font-mono">
                  프롬프트 및 컨텍스트 누적 시뮬레이션
                </dd>
              </dl>
              {/* Quick preset buttons */}
              <ul data-collection="iteration-presets" className="flex items-center gap-2">
                {[10, 50, 100, 500, 1000].map((preset) => (
                  <li key={preset}>
                  <SelectableCard
                    selected={promptCount === preset}
                    onSelect={() => setPromptCount(preset)}
                    itemId={preset}
                    boldWhenFilled
                    className="px-3 py-1 text-xs font-mono"
                  >
                    {preset.toLocaleString()}×
                  </SelectableCard>
                  </li>
                ))}
              </ul>
            </div>

            {/* Slider input */}
            <div className="space-y-3">
              <dl data-role="stat" data-semantic-target="dl" className="flex justify-between text-xs font-mono">
                <dt data-source="widget" className="text-ink-body font-semibold">반복 횟수 (Prompt Iterations):</dt>
                <dd data-source="widget" className="text-ink font-bold text-sm font-mono">
                  {promptCount.toLocaleString()} 회 호출
                </dd>
              </dl>
              <input
                type="range"
                min="1"
                max="2000"
                step="1"
                value={promptCount}
                onChange={(e) => setPromptCount(Number(e.target.value))}
                className="w-full h-2 bg-rule-neutral rounded-xs appearance-none cursor-pointer accent-accent"
              />
              <div data-role="scale-legend" className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-[11px] font-mono text-ink-muted">
                <span>1{isKo ? '회' : 'x'}</span>
                <span>1,000{isKo ? '회' : 'x'}</span>
                <span>2,000{isKo ? '회' : 'x'}</span>
              </div>
            </div>

            {/* Oversized Cumulative Result Display & Token Receipt Block */}
            <div className="pt-4 border-t border-rule space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                <div className="space-y-1">
                  <span data-source="widget" className="text-xs font-mono text-ink-muted uppercase">{isKo ? '영어 기준 토큰' : 'English Baseline Tokens'}</span>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-ink-muted">
                    {totalEn.toLocaleString()}
                    <span data-source="widget" className="text-xs font-normal text-ink-subtle ml-1.5 font-sans">tok</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span data-source="widget" className="text-xs font-mono text-ink-muted uppercase">{isKo ? '한글 누적 토큰' : 'Hangul Cumulative Tokens'}</span>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-ink">
                    {totalKo.toLocaleString()}
                    <span data-source="widget" className="text-xs font-normal text-ink-muted ml-1.5 font-sans">tok</span>
                  </div>
                </div>

                <div data-role="stat" data-semantic-target="dl" className="space-y-1 md:border-l md:border-rule md:pl-6">
                  <span data-source="widget" className="text-xs font-mono text-ink uppercase font-bold tracking-wider">
                    {isKo ? '누적 토큰 격차' : 'ACCUMULATED BURDEN GAP'}
                  </span>
                  <div className="text-4xl sm:text-5xl font-mono font-black text-ink">
                    +{totalGap.toLocaleString()}
                    <span data-source="widget" className="text-xs font-normal text-ink-muted ml-1.5 font-sans">tokens</span>
                  </div>
                </div>
              </div>

              {/* Minimalist Editorial Token Receipt */}
              <div className="p-5 bg-surface border border-rule rounded-xs font-mono text-xs max-w-lg mx-auto md:mx-0 space-y-3">
                <dl data-role="stat" data-semantic-target="dl" className="flex items-center justify-between border-b border-dashed border-rule pb-2 text-[11px]">
                  <dt data-source="widget" className="font-bold text-ink tracking-wider uppercase break-keep">
                    {isKo ? '토큰 사용 명세서' : 'TOKEN RECEIPT'}
                  </dt>
                  <dd data-source="widget" className="text-ink-muted">{promptCount.toLocaleString()}{isKo ? '회 반복' : ' ITERATIONS'}</dd>
                </dl>
                <div className="space-y-1.5 text-xs">
                  <dl data-role="stat" data-semantic-target="dl" className="flex justify-between">
                    <dt data-source="widget" className="text-ink-body">{isKo ? `한국어 (${promptCount}회)` : `KOREAN (${promptCount}x)`}</dt>
                    <dd data-source="widget" className="font-bold text-ink">{totalKo.toLocaleString()}{isKo ? '개 토큰' : ' TOKENS'}</dd>
                  </dl>
                  <dl data-role="stat" data-semantic-target="dl" className="flex justify-between">
                    <dt data-source="widget" className="text-ink-muted">{isKo ? `영어 (${promptCount}회)` : `ENGLISH (${promptCount}x)`}</dt>
                    <dd data-source="widget" className="text-ink-muted">{totalEn.toLocaleString()}{isKo ? '개 토큰' : ' TOKENS'}</dd>
                  </dl>
                </div>
                <dl data-role="stat" data-semantic-target="dl" className="border-t border-rule-strong pt-2 flex justify-between font-bold text-sm text-ink">
                  <dt data-source="widget" className="break-keep">{isKo ? '순수 격차' : 'ABSOLUTE GAP'}</dt>
                  <dd data-source="widget">+{totalGap.toLocaleString()}{isKo ? '개 토큰' : ' TOKENS'}</dd>
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

        {/* READING COLUMN: Post-Figure Analytical Prose & Key Finding */}
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
