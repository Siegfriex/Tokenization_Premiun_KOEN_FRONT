import React, { useState } from 'react';
import { useUILanguage } from '../features/change-language';
import { getLocalizedText } from '../shared/i18n';
import { OCCUPATION_COMPARISON_DATA, TOKEN_BASELINE_SIMULATION } from '../entities/occupation';
import { ARTICLE_CONTENT } from '../entities/article-content';
import { Code, BookOpen } from 'lucide-react';
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

  const engineeringData = OCCUPATION_COMPARISON_DATA.find((d) => d.id === 'engineering')!;
  const socialScienceData = OCCUPATION_COMPARISON_DATA.find((d) => d.id === 'social-science')!;

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
                  WORKFLOW REPETITION SIMULATOR
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
                <span>1회 (단일 프롬프트)</span>
                <span>1,000회 (팀 일간 워크플로우)</span>
                <span>2,000회 (전사 에이전트 루틴)</span>
              </div>
            </div>

            {/* Oversized Cumulative Result Display & Token Receipt Block */}
            <div className="pt-4 border-t border-rule space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                <div className="space-y-1">
                  <span data-source="widget" className="text-xs font-mono text-ink-muted uppercase">English Baseline Tokens</span>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-ink-muted">
                    {totalEn.toLocaleString()}
                    <span data-source="widget" className="text-xs font-normal text-ink-subtle ml-1.5 font-sans">tok</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span data-source="widget" className="text-xs font-mono text-ink-muted uppercase">Hangul Cumulative Tokens</span>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-ink">
                    {totalKo.toLocaleString()}
                    <span data-source="widget" className="text-xs font-normal text-ink-muted ml-1.5 font-sans">tok</span>
                  </div>
                </div>

                <div data-role="stat" data-semantic-target="dl" className="space-y-1 md:border-l md:border-rule md:pl-6">
                  <span data-source="widget" className="text-xs font-mono text-ink uppercase font-bold tracking-wider">
                    ACCUMULATED BURDEN GAP
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
                    TOKEN RECEIPT (토큰 사용 명세서)
                  </dt>
                  <dd data-source="widget" className="text-ink-muted">{promptCount.toLocaleString()} ITERATIONS</dd>
                </dl>
                <div className="space-y-1.5 text-xs">
                  <dl data-role="stat" data-semantic-target="dl" className="flex justify-between">
                    <dt data-source="widget" className="text-ink-body">KOREAN ({promptCount}회)</dt>
                    <dd data-source="widget" className="font-bold text-ink">{totalKo.toLocaleString()} TOKENS</dd>
                  </dl>
                  <dl data-role="stat" data-semantic-target="dl" className="flex justify-between">
                    <dt data-source="widget" className="text-ink-muted">ENGLISH ({promptCount}회)</dt>
                    <dd data-source="widget" className="text-ink-muted">{totalEn.toLocaleString()} TOKENS</dd>
                  </dl>
                </div>
                <dl data-role="stat" data-semantic-target="dl" className="border-t border-rule-strong pt-2 flex justify-between font-bold text-sm text-ink">
                  <dt data-source="widget" className="break-keep">ABSOLUTE GAP (순수 격차)</dt>
                  <dd data-source="widget">+{totalGap.toLocaleString()} TOKENS</dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Occupational Cluster Analysis */}
          <div className="space-y-8">
            <dl data-role="stat" data-semantic-target="dl" className="border-b border-rule pb-3 flex items-center justify-between">
              <dt data-source="widget" className="text-xs font-mono text-ink font-bold uppercase tracking-wider">
                OCCUPATIONAL SENSITIVITY COMPARISON
              </dt>
              <dd data-source="widget" className="text-xs font-mono text-ink-muted">AI Exposure vs. Language Intensity</dd>
            </dl>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cluster 1: Engineering / Technical */}
              <div data-role="stat" data-semantic-target="dl" className="bg-surface border border-rule rounded-xs p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-rule pb-3">
                    <div className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-ink-body" />
                      <h3 data-role="heading" data-semantic-target="heading" className="font-bold text-lg text-ink">
                        {getLocalizedText(engineeringData.title, language)}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <dl data-role="stat" data-semantic-target="dl" className="flex justify-between py-1 border-b border-rule/60">
                      <dt data-source="widget" className="text-ink-muted">AI Exposure Level:</dt>
                      <dd className="font-bold text-ink">{engineeringData.aiExposureLevel}</dd>
                    </dl>
                    <dl data-role="stat" data-semantic-target="dl" className="flex justify-between py-1 border-b border-rule/60">
                      <dt data-source="widget" className="text-ink-muted">Language Intensity:</dt>
                      <dd className="text-ink-body font-semibold">{engineeringData.languageIntensity}</dd>
                    </dl>
                  </div>

                  <p className="text-xs text-ink-body leading-relaxed font-sans bg-surface p-4 rounded-xs border border-rule break-keep">
                    {getLocalizedText(engineeringData.tokenBurdenAssessment, language)}
                  </p>

                  {/* Sub Occupations */}
                  <div className="space-y-2 pt-2">
                    <span data-source="widget" className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block">
                      대표 세부 직무 (Included Occupations):
                    </span>
                    <ul data-collection="engineering-occupations" className="space-y-1.5">
                      {engineeringData.occupations.map((occ, idx) => (
                        <li
                          key={idx}
                          data-role="collection-item"
                          data-item-id={idx}
                          className="p-2.5 bg-surface rounded-xs border border-rule flex items-center justify-between text-xs"
                        >
                          <span className="font-medium text-ink-body">
                            {getLocalizedText(occ.name, language)}
                          </span>
                          <span data-source="widget" className="text-[10px] font-mono px-2 py-0.5 bg-surface-alt text-ink-body rounded-xs border border-rule">
                            {occ.status === 'DATA_AVAILABLE' ? '데이터 확인' : '데이터 보강 필요'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div data-source="widget" className="p-3 bg-surface border border-rule rounded-xs text-xs text-ink-muted font-mono break-keep">
                  평가: 코드 및 영문 토큰 비중으로 인해 상대적 토큰 페널티 완충
                </div>
              </div>

              {/* Cluster 2: Social Science / Knowledge-intensive */}
              <div data-role="stat" data-semantic-target="dl" className="bg-surface border border-rule rounded-xs p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div data-role="stat" data-semantic-target="dl" className="flex items-center justify-between border-b border-rule pb-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-ink" />
                      <h3 data-role="heading" data-semantic-target="heading" className="font-bold text-lg text-ink">
                        {getLocalizedText(socialScienceData.title, language)}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <dl data-role="stat" data-semantic-target="dl" className="flex justify-between py-1 border-b border-rule/60">
                      <dt data-source="widget" className="text-ink-muted">AI Exposure Level:</dt>
                      <dd className="font-bold text-ink">{socialScienceData.aiExposureLevel}</dd>
                    </dl>
                    <dl data-role="stat" data-semantic-target="dl" className="flex justify-between py-1 border-b border-rule/60">
                      <dt data-source="widget" className="text-ink-muted">Language Intensity:</dt>
                      <dd className="text-ink-body font-semibold">{socialScienceData.languageIntensity}</dd>
                    </dl>
                  </div>

                  <p className="text-xs text-ink-body leading-relaxed font-sans bg-surface-alt p-4 rounded-xs border border-rule break-keep">
                    {getLocalizedText(socialScienceData.tokenBurdenAssessment, language)}
                  </p>

                  {/* Sub Occupations */}
                  <div className="space-y-2 pt-2">
                    <span data-source="widget" className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block">
                      대표 세부 직무 (Included Occupations):
                    </span>
                    <ul data-collection="socialscience-occupations" className="space-y-1.5">
                      {socialScienceData.occupations.map((occ, idx) => (
                        <li
                          key={idx}
                          data-role="collection-item"
                          data-item-id={idx}
                          className="p-2.5 bg-surface-alt rounded-xs border border-rule flex items-center justify-between text-xs"
                        >
                          <span className="font-medium text-ink-body">
                            {getLocalizedText(occ.name, language)}
                          </span>
                          <span data-source="widget" className="text-[10px] font-mono px-2 py-0.5 bg-surface-alt text-ink-body rounded-xs border border-rule">
                            {occ.status === 'DATA_AVAILABLE' ? '데이터 확인' : '데이터 보강 필요'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div data-source="widget" className="p-3 bg-surface border border-rule rounded-xs text-xs text-ink-muted font-mono break-keep">
                  평가: 장문 한국어 텍스트 문맥 누적으로 실질 Token Burden 집중 가중
                </div>
              </div>
            </div>

            {/* Figure Caption & Source */}
            <ArticleFigureCaption
              figNum={articleData.figureNumber}
              caption={isKo ? articleData.figureCaption?.ko : articleData.figureCaption?.en}
              source={isKo ? articleData.figureSource?.ko : articleData.figureSource?.en}
            />
          </div>
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
