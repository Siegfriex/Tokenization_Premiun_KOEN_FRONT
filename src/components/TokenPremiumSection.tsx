import React from 'react';
import { useUILanguage } from '../features/change-language';
import { getLocalizedText } from '../shared/i18n';
import { ARTICLE_CONTENT } from '../entities/article-content';
import {
  BOOTSTRAP_CI,
  CONFIRMING_PROCEDURES,
  COHORT_N,
  DIRECTION_SPLIT,
  DOMAIN_COMPOSITION,
  LATTICE_FACTS,
  LATTICE_MODES,
  MEASUREMENT_FRAME,
  MEDIAN_TP,
  PRE_G5_P95,
  PROVENANCE,
  SHARE_KO_MORE,
  SOURCE_STRATA,
  TP_PERCENTILES,
} from '../entities/rq1-canonical';
import { Container, SectionHeading, HeadingAccent } from '../shared/ui';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleParagraph,
  ArticleFigureCaption,
  ArticleFinding,
  ArticleDisclosure,
  ArticleFullWidthBreak,
} from './ArticleElements';

/**
 * Percent of the cohort, at the same 2-dp rounding the article prose uses.
 * Keeping both at 2 dp is what stops the figure saying 88.0% while the
 * paragraph beside it says 87.99%.
 */
const pctOfCohort = (n: number) => ((n / COHORT_N.value) * 100).toFixed(2);

/** A share already expressed as a fraction of 1, to the given decimals. */
const pct = (share: number, digits = 1) => (share * 100).toFixed(digits);

const intl = (n: number) => n.toLocaleString('en-US');

export const TokenPremiumSection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
  const articleData = ARTICLE_CONTENT.corpusAnalysis;
  const post = isKo ? articleData.postFigureParagraphs?.ko : articleData.postFigureParagraphs?.en;

  const direction = [
    {
      id: 'ko-more',
      label: isKo ? '한국어 토큰이 더 많음' : 'Korean used more',
      n: DIRECTION_SPLIT.koMore.value,
    },
    {
      id: 'ko-fewer',
      label: isKo ? '한국어 토큰이 더 적음' : 'Korean used fewer',
      n: DIRECTION_SPLIT.koFewer.value,
    },
    {
      id: 'even',
      label: isKo ? '토큰 수가 같음' : 'Exactly even',
      n: DIRECTION_SPLIT.tie.value,
    },
  ];

  const maxModeRows = LATTICE_MODES[0].rows;

  return (
    <section
      id="patterns"
      data-widget="TokenPremiumSection"
      data-section="patterns"
      className="py-20 sm:py-28 bg-surface-alt text-ink border-b border-rule scroll-mt-16"
    >
      <Container gutter className="space-y-12">
        <SectionHeading eyebrow={isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}>
          {isKo ? (
            <>
              문장쌍
              <br />
              <HeadingAccent>3,835,988쌍</HeadingAccent>을 전부 세어봤다
            </>
          ) : (
            <>
              We Counted All
              <br />
              <HeadingAccent>3,835,988</HeadingAccent> Sentence Pairs
            </>
          )}
        </SectionHeading>

        <ArticleReadingColumn>
          <ArticleLead>{isKo ? articleData.lead?.ko : articleData.lead?.en}</ArticleLead>
          {(isKo ? articleData.preFigureParagraphs?.ko : articleData.preFigureParagraphs?.en)?.map(
            (p, idx) => <ArticleParagraph key={idx}>{p}</ArticleParagraph>,
          )}
        </ArticleReadingColumn>

        {/* FIG. 04 — the primary result: one median, one direction split, one ladder */}
        <ArticleFullWidthBreak figure className="my-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Tier 1 — the section's one central number (docs/qa/DESIGN_LAW.md) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-surface border-2 border-rule-strong rounded-xs p-6 sm:p-8 space-y-6 shadow-sm">
                <dl
                  data-role="stat"
                  data-semantic-target="dl"
                  className="text-xs font-mono text-ink-muted uppercase tracking-widest border-b border-rule pb-3 flex items-center justify-between gap-3"
                >
                  <dt data-source="widget">{isKo ? '측정 기준' : 'MEASURED UNDER'}</dt>
                  <dd data-source="entity" className="text-ink font-bold">
                    {MEASUREMENT_FRAME.tokenizer}
                  </dd>
                </dl>

                <div data-role="stat" data-semantic-target="dl" className="space-y-2">
                  <span
                    data-source="widget"
                    className="text-xs font-mono text-ink-muted uppercase tracking-wider block"
                  >
                    {isKo ? '토큰 비율 중앙값' : 'MEDIAN TOKEN RATIO'}
                  </span>
                  <div
                    data-source="entity"
                    className="text-5xl sm:text-6xl lg:text-7xl font-black font-mono tracking-tight text-ink whitespace-nowrap"
                  >
                    {MEDIAN_TP.value.toFixed(2)}
                    <span className="text-2xl sm:text-3xl text-ink font-sans">×</span>
                  </div>
                  <p data-source="widget" className="text-[11px] font-sans text-ink-muted leading-relaxed break-keep">
                    {isKo
                      ? '383만 쌍을 비율 순으로 줄 세웠을 때 한가운데 있는 값이다. 전체 토큰 수를 합쳐 나눈 값이 아니다.'
                      : 'The middle value when all 3.84M pairs are ordered by ratio, not the sum of Korean tokens over the sum of English ones.'}
                  </p>
                  <p
                    data-source="entity"
                    className="text-xs font-mono text-ink-body pt-1 tabular-nums break-keep"
                  >
                    {getLocalizedText(SHARE_KO_MORE.display, language)}{' '}
                    <span className="font-sans text-ink-muted">
                      {isKo ? '의 문장쌍에서 한국어 토큰이 더 많았다' : 'of pairs used more Korean tokens'}
                    </span>
                  </p>
                </div>

                {/* Direction split — the second canonical primary field */}
                <div className="space-y-3 pt-4 border-t border-rule">
                  <span
                    data-source="widget"
                    className="text-[10px] font-mono text-ink uppercase font-bold tracking-widest block"
                  >
                    {isKo ? '어느 쪽 토큰이 더 많았나' : 'WHICH SIDE USED MORE'}
                  </span>
                  <ul data-collection="direction-split" className="space-y-2.5">
                    {direction.map((row) => (
                      <li key={row.id} data-item-id={row.id} className="space-y-1">
                        <span
                          data-role="stat"
                          data-semantic-target="dl"
                          className="flex items-baseline justify-between gap-3 text-xs font-mono"
                        >
                          <span className="text-ink-body font-sans break-keep">{row.label}</span>
                          <span className="text-ink font-bold tabular-nums shrink-0">
                            {pctOfCohort(row.n)}%
                          </span>
                        </span>
                        <span className="h-1.5 w-full bg-mark-track rounded-xs overflow-hidden flex border border-rule">
                          <span
                            className="h-full bg-mark rounded-xs"
                            style={{ width: `${(row.n / COHORT_N.value) * 100}%` }}
                          ></span>
                        </span>
                        <span data-source="entity" className="text-[10px] font-mono text-ink-subtle tabular-nums">
                          {intl(row.n)} {isKo ? '쌍' : 'pairs'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tier 3 — definitional annotation, not evidence */}
              <div
                data-role="stat"
                data-semantic-target="dl"
                className="p-4 bg-surface-alt border border-rule rounded-xs font-mono text-xs text-ink-body space-y-2"
              >
                <span
                  data-source="widget"
                  className="text-[10px] text-ink uppercase font-bold tracking-widest block"
                >
                  {isKo ? '계산 방법' : 'HOW IT IS CALCULATED'}
                </span>
                <p data-source="widget" className="text-ink font-semibold text-sm break-keep">
                  {isKo
                    ? '토큰 비율 = 한국어 토큰 수 ÷ 영어 토큰 수'
                    : 'Token ratio = Korean tokens / English tokens'}
                </p>
                <p data-source="widget" className="text-ink-muted text-[11px] font-sans leading-relaxed break-keep">
                  {isKo
                    ? '같은 뜻을 담은 문장쌍 하나마다 이 값을 구한 뒤, 383만 개의 값을 모아 분포를 봤다.'
                    : 'We computed this for each meaning-matched pair, then looked at the distribution of all 3.84 million values.'}
                </p>
              </div>
            </div>

            {/* Tier 2 — the ladder: where the gap sits across the distribution */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-surface border border-rule rounded-xs p-6 space-y-6 shadow-xs">
                <div className="flex items-start justify-between gap-4 border-b border-rule pb-3">
                  <dl data-role="stat" data-semantic-target="dl">
                    <dt
                      data-source="widget"
                      className="text-xs font-mono text-ink font-bold uppercase tracking-wider block"
                    >
                      {isKo ? '분포의 각 지점' : 'ACROSS THE DISTRIBUTION'}
                    </dt>
                    <dd data-source="widget" className="text-[11px] font-mono text-ink-muted break-keep">
                      {isKo
                        ? '383만 쌍을 비율 순으로 줄 세웠을 때의 경계값'
                        : 'Boundary values when all pairs are ordered by ratio'}
                    </dd>
                  </dl>
                  <span data-source="entity" className="text-xs font-mono text-ink-muted shrink-0 tabular-nums">
                    N = {intl(COHORT_N.value)}
                  </span>
                </div>

                <ul data-collection="tp-percentiles" className="space-y-3.5 pt-1">
                  {TP_PERCENTILES.map((row) => {
                    const isMedian = row.id === 'p50';
                    return (
                      <li key={row.id} data-item-id={row.id} className="space-y-1.5">
                        <span
                          data-role="stat"
                          data-semantic-target="dl"
                          className="flex items-baseline justify-between gap-3 text-xs font-mono"
                        >
                          <span
                            className={
                              isMedian ? 'text-ink font-bold font-sans' : 'text-ink-body font-sans'
                            }
                          >
                            {getLocalizedText(row.label, language)}
                          </span>
                          <span
                            data-source="entity"
                            className={`tabular-nums ${isMedian ? 'text-ink font-bold text-base' : 'text-ink font-semibold'}`}
                          >
                            {getLocalizedText(row.display, language)}
                          </span>
                        </span>
                        <span className="h-2 w-full bg-mark-track rounded-xs overflow-hidden flex border border-rule">
                          <span
                            className={`h-full rounded-xs ${isMedian ? 'bg-accent' : 'bg-mark'}`}
                            style={{ width: `${Math.min((row.value / 2.5) * 100, 100)}%` }}
                          ></span>
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* PRE_G5_DESCRIPTIVE — must render with a visible qualifier */}
                <div
                  data-role="stat"
                  data-semantic-target="dl"
                  data-claim-status="frozen"
                  className="pt-4 border-t border-rule space-y-1.5"
                >
                  <span className="flex items-baseline justify-between gap-3 text-xs font-mono">
                    <span className="text-ink-muted font-sans break-keep">
                      {isKo ? '95백분위 (참고 수치)' : '95th pct (reference only)'}
                    </span>
                    <span data-source="entity" className="text-ink-body font-semibold tabular-nums">
                      {getLocalizedText(PRE_G5_P95.display, language)}
                    </span>
                  </span>
                  <p data-source="widget" className="text-[10px] font-sans text-ink-subtle leading-relaxed break-keep">
                    {isKo
                      ? '이 값은 확정 결과표에 없고 사전 진단 문서에만 있다. 위 다섯 개와 같은 수준의 확정 수치로 읽어서는 안 된다.'
                      : 'This value is absent from the confirmed results table and appears only in a preliminary diagnostics document. It should not be read at the same level of confirmation as the five above.'}
                  </p>
                </div>

                <dl
                  data-role="stat"
                  data-semantic-target="dl"
                  className="pt-3 text-[10px] font-mono text-ink-subtle border-t border-rule break-keep"
                >
                  <dt className="sr-only">{isKo ? '자료 출처' : 'Provenance'}</dt>
                  <dd data-source="entity">{PROVENANCE.rq1}</dd>
                </dl>
              </div>
            </div>
          </div>

          <ArticleFigureCaption
            figNum={articleData.figureNumber}
            caption={isKo ? articleData.figureCaption?.ko : articleData.figureCaption?.en}
          />
        </ArticleFullWidthBreak>

        {/* The zero-width interval, and why it is zero */}
        <ArticleReadingColumn>
          {post?.[0] && <ArticleParagraph>{post[0]}</ArticleParagraph>}
          {post?.[1] && <ArticleParagraph>{post[1]}</ArticleParagraph>}
        </ArticleReadingColumn>

        {/* FIG. 04-1 — the lattice, and the mandatory degeneracy disclosure */}
        <ArticleFullWidthBreak figure className="my-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-surface border-2 border-rule-strong rounded-xs p-6 sm:p-8 space-y-5 shadow-sm">
                <span
                  data-source="widget"
                  className="text-xs font-mono text-ink-muted uppercase tracking-wider block"
                >
                  {isKo ? '중앙값의 95% 신뢰구간' : '95% CONFIDENCE INTERVAL'}
                </span>
                <div
                  data-source="entity"
                  className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-ink whitespace-nowrap"
                >
                  [ {Math.exp(BOOTSTRAP_CI.lower).toFixed(4)} , {Math.exp(BOOTSTRAP_CI.upper).toFixed(4)} ]
                </div>
                <p data-source="widget" className="text-sm font-sans text-ink font-semibold break-keep">
                  {isKo ? '구간의 폭이 0이다.' : 'The interval has zero width.'}
                </p>

                <dl
                  data-role="stat"
                  data-semantic-target="dl"
                  className="space-y-1.5 pt-3 border-t border-rule text-xs font-mono"
                >
                  <div className="flex justify-between gap-3 py-0.5">
                    <dt className="text-ink-muted">{isKo ? '재표본 횟수' : 'Resamples'}</dt>
                    <dd data-source="entity" className="text-ink font-bold tabular-nums">
                      {intl(BOOTSTRAP_CI.replicates)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3 py-0.5">
                    <dt className="text-ink-muted">{isKo ? '난수 시드' : 'Seed'}</dt>
                    <dd data-source="entity" className="text-ink-body tabular-nums">
                      {intl(BOOTSTRAP_CI.seed)}
                    </dd>
                  </div>
                </dl>

                <div className="pt-3 border-t border-rule space-y-2">
                  <span
                    data-source="widget"
                    className="text-[10px] font-mono text-ink uppercase font-bold tracking-widest block break-keep"
                  >
                    {isKo ? '서로 다른 세 가지 방법이 같은 값에 도달했다' : 'THREE INDEPENDENT PROCEDURES AGREE'}
                  </span>
                  <ul data-collection="confirming-procedures" className="space-y-1">
                    {CONFIRMING_PROCEDURES.map((proc) => (
                      <li
                        key={proc.id}
                        data-item-id={proc.id}
                        data-source="entity"
                        className="text-[11px] font-sans text-ink-body flex items-start gap-2 break-keep"
                      >
                        <span className="text-ink-muted shrink-0">·</span>
                        {getLocalizedText(proc.label, language)}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mandatory under NB08_RQ1_CI_DEGENERACY_NOTE: the interval may
                    not be reported without this explanation. */}
                <ArticleDisclosure
                  summary={isKo ? '폭이 0인 이유' : 'WHY THE WIDTH IS ZERO'}
                  className="mt-2"
                >
                  <p className="text-[13px] font-sans leading-relaxed break-keep">
                    {isKo
                      ? '정밀도가 높아서가 아니다. 토큰 수는 정수이므로 두 정수의 비율은 몇 개의 단순한 분수 위에만 놓인다. 383만 쌍이 만들어낸 서로 다른 값은 3,725개뿐이고, 정확히 4/3인 문장쌍만 123,040개다.'
                      : 'This is not high precision. Token counts are integers, so their ratio can only land on a lattice of simple fractions. Across 3.84 million pairs there are only 3,725 distinct values, and 123,040 pairs sit exactly on 4/3.'}
                  </p>
                  <p className="text-[13px] font-sans leading-relaxed break-keep">
                    {isKo
                      ? '중앙값 양옆의 순서통계량이 모두 이 두꺼운 층 안에 들어 있고, 층의 가장자리까지 양쪽으로 약 76,000개의 여유가 있다. 그래서 표본을 다시 뽑아도 중앙값이 다른 값으로 넘어가지 않는다.'
                      : 'The order statistics on either side of the median both fall inside that thick layer, with roughly 76,000 observations of margin on each side. Resampling therefore never pushes the median onto a different value.'}
                  </p>
                </ArticleDisclosure>
              </div>
            </div>

            {/* The lattice itself */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-surface border border-rule rounded-xs p-6 space-y-5 shadow-xs">
                <div className="flex items-start justify-between gap-4 border-b border-rule pb-3">
                  <dl data-role="stat" data-semantic-target="dl">
                    <dt
                      data-source="widget"
                      className="text-xs font-mono text-ink font-bold uppercase tracking-wider block"
                    >
                      {isKo ? '가장 많이 나온 여덟 개의 비율' : 'THE EIGHT MOST COMMON RATIOS'}
                    </dt>
                    <dd data-source="widget" className="text-[11px] font-mono text-ink-muted break-keep">
                      {isKo
                        ? '토큰 비율은 아무 값이나 될 수 없고 분수 위에만 놓인다'
                        : 'Ratios cannot take any value — they land on fractions'}
                    </dd>
                  </dl>
                  <span data-source="entity" className="text-xs font-mono text-ink-muted shrink-0 tabular-nums">
                    {intl(LATTICE_FACTS.distinctValues)} {isKo ? '개 값' : 'values'}
                  </span>
                </div>

                <ul data-collection="lattice-modes" className="space-y-2.5">
                  {LATTICE_MODES.map((mode) => {
                    const isMedian = mode.fraction === '4/3';
                    return (
                      <li key={mode.fraction} data-item-id={mode.fraction} className="space-y-1">
                        <span
                          data-role="stat"
                          data-semantic-target="dl"
                          className="flex items-baseline justify-between gap-3 text-xs font-mono"
                        >
                          <span className="flex items-baseline gap-2.5">
                            <span
                              className={`tabular-nums ${isMedian ? 'text-ink font-bold' : 'text-ink-body'}`}
                            >
                              {mode.fraction}
                            </span>
                            <span
                              className={`tabular-nums ${isMedian ? 'text-ink font-bold' : 'text-ink-muted'}`}
                            >
                              {mode.tp.toFixed(2)}×
                            </span>
                            {isMedian && (
                              <span
                                data-source="widget"
                                className="text-[9px] uppercase tracking-widest text-ink font-bold"
                              >
                                {isKo ? '중앙값' : 'median'}
                              </span>
                            )}
                          </span>
                          <span data-source="entity" className="text-ink-body tabular-nums shrink-0">
                            {intl(mode.rows)}
                          </span>
                        </span>
                        <span className="h-2 w-full bg-mark-track rounded-xs overflow-hidden flex border border-rule">
                          <span
                            className={`h-full rounded-xs ${isMedian ? 'bg-accent' : 'bg-mark'}`}
                            style={{ width: `${(mode.rows / maxModeRows) * 100}%` }}
                          ></span>
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="pt-3 border-t border-rule space-y-2">
                  <dl
                    data-role="stat"
                    data-semantic-target="dl"
                    className="flex items-baseline justify-between gap-3 text-xs font-mono"
                  >
                    <dt className="text-ink-muted font-sans break-keep">
                      {isKo ? '이 여덟 개가 차지하는 문장쌍' : 'Pairs held by these eight'}
                    </dt>
                    <dd data-source="entity" className="text-ink font-bold tabular-nums shrink-0">
                      {intl(LATTICE_FACTS.top8Rows)} · {pct(LATTICE_FACTS.top8Share)}%
                    </dd>
                  </dl>
                  <p data-source="widget" className="text-[11px] font-sans text-ink-body leading-relaxed break-keep">
                    {isKo
                      ? '383만 쌍 가운데 다섯 쌍에 한 쌍꼴이다. 나머지 여덟 쌍은 이 여덟 개 바깥의 값에 흩어져 있다.'
                      : 'About one pair in five. The other four in five are spread across values outside this list.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ArticleFigureCaption
            figNum="FIG. 04-1"
            caption={
              isKo
                ? '토큰 비율이 놓이는 분수 격자. 신뢰구간의 폭이 0인 것은 정밀도가 아니라 이 격자 구조 때문이다.'
                : 'The fraction lattice token ratios land on. The zero-width interval reflects this structure, not precision.'
            }
            source={
              isKo
                ? `자료: ${PROVENANCE.lattice}`
                : `Source: ${PROVENANCE.lattice}`
            }
          />
        </ArticleFullWidthBreak>

        {/* Source heterogeneity */}
        <ArticleReadingColumn>
          {post?.[2] && <ArticleParagraph>{post[2]}</ArticleParagraph>}
        </ArticleReadingColumn>

        {/* FIG. 04-2 — source strata (full detail) and domain composition (counts only) */}
        <ArticleFullWidthBreak figure className="my-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Source strata — canonical, full detail */}
            <div className="lg:col-span-6">
              <div className="bg-surface border border-rule rounded-xs p-6 space-y-5 shadow-xs h-full">
                <dl data-role="stat" data-semantic-target="dl" className="border-b border-rule pb-3">
                  <dt
                    data-source="widget"
                    className="text-xs font-mono text-ink font-bold uppercase tracking-wider block"
                  >
                    {isKo ? '출처별로 나눠보면' : 'SPLIT BY SOURCE CORPUS'}
                  </dt>
                  <dd data-source="widget" className="text-[11px] font-mono text-ink-muted break-keep">
                    {isKo
                      ? '전체 중앙값 1.33배는 두 출처 어느 쪽과도 일치하지 않는다'
                      : 'The pooled 1.33x median matches neither source'}
                  </dd>
                </dl>

                <ul data-collection="source-strata" className="space-y-4">
                  {SOURCE_STRATA.map((s) => (
                    <li key={s.id} data-item-id={s.id} className="space-y-2">
                      <span
                        data-role="stat"
                        data-semantic-target="dl"
                        className="flex items-baseline justify-between gap-3"
                      >
                        <span className="text-sm font-bold text-ink font-sans">
                          {getLocalizedText(s.label, language)}
                        </span>
                        <span data-source="entity" className="text-lg font-bold font-mono text-ink tabular-nums">
                          {s.medianTp.toFixed(2)}×
                        </span>
                      </span>
                      <span className="h-2 w-full bg-mark-track rounded-xs overflow-hidden flex border border-rule">
                        <span
                          className="h-full bg-mark rounded-xs"
                          style={{ width: `${s.share * 100}%` }}
                        ></span>
                      </span>
                      <dl
                        data-role="stat"
                        data-semantic-target="dl"
                        className="grid grid-cols-3 gap-2 text-[10px] font-mono pt-0.5"
                      >
                        <div>
                          <dt className="text-ink-subtle uppercase tracking-wide">
                            {isKo ? '문장쌍' : 'pairs'}
                          </dt>
                          <dd data-source="entity" className="text-ink-body tabular-nums">
                            {intl(s.n)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-ink-subtle uppercase tracking-wide">
                            {isKo ? '비중' : 'share'}
                          </dt>
                          <dd data-source="entity" className="text-ink-body tabular-nums">
                            {pct(s.share)}%
                          </dd>
                        </div>
                        <div>
                          <dt className="text-ink-subtle uppercase tracking-wide break-keep">
                            {isKo ? '한국어가 많음' : 'KO more'}
                          </dt>
                          <dd data-source="entity" className="text-ink-body tabular-nums">
                            {pct(s.shareTpGt1)}%
                          </dd>
                        </div>
                      </dl>
                    </li>
                  ))}
                </ul>

                <p
                  data-source="widget"
                  className="text-[11px] font-sans text-ink-body leading-relaxed pt-3 border-t border-rule break-keep"
                >
                  {isKo
                    ? '두 출처를 따로 두고 다시 계산한 신뢰구간은 전체와 같았고, 결론의 방향은 뒤집히지 않았다.'
                    : 'Recomputed with the two sources held separate, the interval was identical to the pooled one and the direction did not reverse.'}
                </p>
              </div>
            </div>

            {/* Domain composition — counts only, no ratios exist */}
            <div className="lg:col-span-6">
              <div className="bg-surface border border-rule rounded-xs p-6 space-y-5 shadow-xs h-full">
                <dl data-role="stat" data-semantic-target="dl" className="border-b border-rule pb-3">
                  <dt
                    data-source="widget"
                    className="text-xs font-mono text-ink font-bold uppercase tracking-wider block"
                  >
                    {isKo ? '분야별 구성' : 'SUBJECT-AREA COMPOSITION'}
                  </dt>
                  <dd data-source="widget" className="text-[11px] font-mono text-ink-muted break-keep">
                    {isKo ? '문장쌍 수만 싣는다 · 분야별 비율은 없다' : 'Counts only — no per-subject ratio exists'}
                  </dd>
                </dl>

                <ul data-collection="domain-composition" className="space-y-3">
                  {DOMAIN_COMPOSITION.map((d) => {
                    const only025 = d.from026 === 0;
                    const only026 = d.from025 === 0;
                    const tag = only025
                      ? isKo ? '025에만' : '025 only'
                      : only026
                        ? isKo ? '026에만' : '026 only'
                        : isKo ? '두 출처 공통' : 'shared';
                    return (
                      <li key={d.id} data-item-id={d.id} className="space-y-1.5">
                        <span
                          data-role="stat"
                          data-semantic-target="dl"
                          className="flex items-baseline justify-between gap-3 text-xs font-mono"
                        >
                          <span className="flex items-baseline gap-2">
                            <span className="text-ink font-bold font-sans text-sm">
                              {getLocalizedText(d.label, language)}
                            </span>
                            <span
                              data-source="widget"
                              className="text-[9px] uppercase tracking-widest text-ink-muted shrink-0"
                            >
                              {tag}
                            </span>
                          </span>
                          <span data-source="entity" className="text-ink-body tabular-nums shrink-0">
                            {intl(d.total)}
                          </span>
                        </span>
                        <span className="h-2 w-full bg-mark-track rounded-xs overflow-hidden flex border border-rule">
                          <span
                            className="h-full bg-mark rounded-xs"
                            style={{ width: `${(d.total / COHORT_N.value) * 100}%` }}
                          ></span>
                        </span>
                      </li>
                    );
                  })}
                </ul>

              </div>
            </div>
          </div>

          <ArticleFigureCaption
            figNum="FIG. 04-2"
            caption={
              isKo
                ? '두 출처의 중앙값과 분야별 문장쌍 수. 분야와 출처가 서로 엇갈려 있어 분야별 비율은 싣지 않았다.'
                : 'Median by source, and pair counts by subject area. Subject and source do not cross cleanly, so no per-subject ratio is published.'
            }
          />
        </ArticleFullWidthBreak>

        {/* The confounding warning belongs in the 1DEPTH flow, not a disclosure */}
        <ArticleReadingColumn>
          {post?.[3] && <ArticleParagraph>{post[3]}</ArticleParagraph>}

          <ArticleFinding
            label={isKo ? articleData.keyFinding?.label?.ko : articleData.keyFinding?.label?.en}
            statement={
              isKo ? articleData.keyFinding?.statement.ko : articleData.keyFinding?.statement.en
            }
          />
        </ArticleReadingColumn>
      </Container>
    </section>
  );
};
