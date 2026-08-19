import React from 'react';
import { useUILanguage } from '../features/change-language';
import { getLocalizedText } from '../shared/i18n';
import { ARTICLE_CONTENT } from '../entities/article-content';
import {
  BDR_CP_SPEARMAN,
  CHUNK_REVERSAL,
  DECOMPOSITION,
  MEDIAN_TP,
  REPRESENTATION_OFFSET,
  REVERSAL_FACTS,
  REVERSAL_PROVENANCE,
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

const pct = (share: number, digits = 2) => (share * 100).toFixed(digits);
const intl = (n: number) => n.toLocaleString('en-US');

/**
 * S2.5 — the exact decomposition.
 *
 * This section exists because the article previously explained the premium as
 * "Hangul is three bytes, so it costs more tokens." The research report lists
 * that sentence under its own 말할 수 없음 (cannot be claimed) column. The
 * decomposition is what can be said instead, and it is the more interesting
 * story: Korean is SHORTER in characters and still ends up with more tokens.
 *
 * The three medians below must never be multiplied together in the copy. The
 * identity TP = CR x BDR x CP holds per pair, not across separate medians —
 * the median is not linear under multiplication (EDA report, Appendix B).
 */
export const DecompositionSection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
  const articleData = ARTICLE_CONTENT.mechanism;
  const post = isKo ? articleData.postFigureParagraphs?.ko : articleData.postFigureParagraphs?.en;

  /** The three stages, plus the combined representation offset as stage 2's reading. */
  const stages = [
    {
      id: DECOMPOSITION[0].id,
      step: isKo ? '글자 수로 재면' : 'Counting characters',
      ratio: DECOMPOSITION[0].medianRatio,
      component: DECOMPOSITION[0],
      verdict: isKo ? '한국어가 더 짧다' : 'Korean is shorter',
      leads: false,
    },
    {
      id: 'representation-offset',
      step: isKo ? '저장 용량으로 재면' : 'Measured in storage size',
      ratio: REPRESENTATION_OFFSET.value,
      component: DECOMPOSITION[1],
      verdict: isKo ? '순서가 뒤집힌다' : 'The order flips',
      leads: true,
    },
    {
      id: DECOMPOSITION[2].id,
      step: isKo ? '용량이 같아도 남는 몫' : 'Left over at equal size',
      ratio: DECOMPOSITION[2].medianRatio,
      component: DECOMPOSITION[2],
      verdict: isKo ? '토크나이저가 더 잘게 나눈다' : 'The tokenizer splits it finer',
      leads: true,
    },
  ];

  return (
    <section
      id="mechanism"
      data-widget="DecompositionSection"
      data-section="mechanism"
      className="py-20 sm:py-28 bg-surface text-ink border-b border-rule scroll-mt-16"
    >
      <Container gutter className="space-y-12">
        <SectionHeading eyebrow={isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}>
          {isKo ? (
            <>
              글자는 더 적은데,
              <br />
              <HeadingAccent>토큰은 더 많다</HeadingAccent>
            </>
          ) : (
            <>
              Fewer Characters,
              <br />
              <HeadingAccent>More Tokens</HeadingAccent>
            </>
          )}
        </SectionHeading>

        <ArticleReadingColumn>
          <ArticleLead>{isKo ? articleData.lead?.ko : articleData.lead?.en}</ArticleLead>
          {(isKo ? articleData.preFigureParagraphs?.ko : articleData.preFigureParagraphs?.en)?.map(
            (p, idx) => <ArticleParagraph key={idx}>{p}</ArticleParagraph>,
          )}
        </ArticleReadingColumn>

        {/* FIG. 03 — the three stages, and where the reversal happens */}
        <ArticleFullWidthBreak figure className="my-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-surface-alt border-2 border-rule-strong rounded-xs p-6 sm:p-8 space-y-6 shadow-sm">
                <dl data-role="stat" data-semantic-target="dl" className="border-b border-rule pb-3">
                  <dt
                    data-source="widget"
                    className="text-xs font-mono text-ink font-bold uppercase tracking-wider block"
                  >
                    {isKo ? '같은 문장을 세 가지 방법으로 재면' : 'THE SAME SENTENCE, MEASURED THREE WAYS'}
                  </dt>
                  <dd data-source="widget" className="text-[11px] font-mono text-ink-muted break-keep">
                    {isKo ? '영어를 1.00배로 뒀을 때의 한국어 중앙값' : 'Korean median, with English at 1.00x'}
                  </dd>
                </dl>

                <ul data-collection="decomposition-stages" className="space-y-5">
                  {stages.map((stage) => {
                    const isBelowOne = stage.ratio < 1;
                    return (
                      <li key={stage.id} data-item-id={stage.id} className="space-y-2">
                        <span
                          data-role="stat"
                          data-semantic-target="dl"
                          className="flex items-baseline justify-between gap-3"
                        >
                          <span className="text-sm font-bold text-ink font-sans break-keep">
                            {stage.step}
                          </span>
                          <span className="flex items-baseline gap-2.5 shrink-0">
                            <span
                              data-source="widget"
                              className="text-[10px] font-mono uppercase tracking-widest text-ink-muted"
                            >
                              {stage.verdict}
                            </span>
                            <span
                              data-source="entity"
                              className="text-xl font-bold font-mono text-ink tabular-nums"
                            >
                              {stage.ratio.toFixed(2)}×
                            </span>
                          </span>
                        </span>

                        {/* 1.00x sits at the midpoint so a sub-1 stage reads as "shorter" */}
                        <span className="relative h-2.5 w-full bg-mark-track rounded-xs overflow-hidden flex border border-rule">
                          <span
                            className={`h-full rounded-xs ${isBelowOne ? 'bg-mark' : 'bg-accent'}`}
                            style={{ width: `${Math.min((stage.ratio / 2.5) * 100, 100)}%` }}
                          ></span>
                          <span
                            aria-hidden="true"
                            className="absolute inset-y-0 w-px bg-rule-strong"
                            style={{ left: `${(1 / 2.5) * 100}%` }}
                          ></span>
                        </span>

                        <span
                          data-source="entity"
                          className="text-[11px] font-sans text-ink-body leading-relaxed block break-keep"
                        >
                          {getLocalizedText(stage.component.plain, language)}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="pt-4 border-t border-rule space-y-2">
                  <span
                    data-role="stat"
                    data-semantic-target="dl"
                    className="flex items-baseline justify-between gap-3"
                  >
                    <span className="text-sm font-bold text-ink font-sans break-keep">
                      {isKo ? '최종 토큰 수로 재면' : 'Counting final tokens'}
                    </span>
                    <span data-source="entity" className="text-2xl font-black font-mono text-ink tabular-nums">
                      {MEDIAN_TP.value.toFixed(2)}×
                    </span>
                  </span>
                  <p data-source="widget" className="text-[11px] font-sans text-ink-muted leading-relaxed break-keep">
                    {isKo
                      ? '위 세 값은 각각 따로 구한 중앙값이다. 서로 곱해서 이 1.33배가 나오는 것이 아니다.'
                      : 'Each of the three figures above is a separately computed median. They are not multiplied together to arrive at 1.33x.'}
                  </p>
                </div>

                {/* PRE_G5_DESCRIPTIVE tier — visible qualifier is mandatory */}
                <ArticleDisclosure
                  summary={isKo ? '이 세 값의 출처' : 'WHERE THESE THREE COME FROM'}
                  className="mt-1"
                >
                  <p className="text-[13px] font-sans leading-relaxed break-keep">
                    {isKo
                      ? '분해 성분의 백분위 값은 확정 결과표가 아니라 사전 진단 문서에만 실려 있다. 중앙 토큰 비율 1.33배와 달리 확정 수치로 읽어서는 안 된다. 다만 같은 문서에 실린 토큰 비율 백분위는 확정 결과표와 정확히 일치해, 문서 자체의 신뢰도를 가늠할 근거는 된다.'
                      : 'The percentiles for the decomposition components appear only in a preliminary diagnostics document, not the confirmed results table, and should not be read at the same level as the 1.33x median. That said, the token-ratio percentiles in that same document match the confirmed table exactly, which is a useful check on the document itself.'}
                  </p>
                </ArticleDisclosure>
              </div>
            </div>

            {/* The reversal, stated as counts */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-surface border border-rule rounded-xs p-6 space-y-5 shadow-xs">
                <dl data-role="stat" data-semantic-target="dl" className="border-b border-rule pb-3">
                  <dt
                    data-source="widget"
                    className="text-xs font-mono text-ink font-bold uppercase tracking-wider block break-keep"
                  >
                    {isKo ? '383만 쌍 가운데' : 'OUT OF 3.84 MILLION PAIRS'}
                  </dt>
                </dl>

                <ul data-collection="reversal-facts" className="space-y-4">
                  {REVERSAL_FACTS.map((fact) => (
                    <li key={fact.id} data-item-id={fact.id} className="space-y-1.5">
                      <span
                        data-role="stat"
                        data-semantic-target="dl"
                        className="flex items-baseline justify-between gap-3"
                      >
                        <span className="text-[13px] text-ink-body font-sans leading-snug break-keep">
                          {getLocalizedText(fact.label, language)}
                        </span>
                        <span data-source="entity" className="text-lg font-bold font-mono text-ink tabular-nums shrink-0">
                          {pct(fact.share, 1)}%
                        </span>
                      </span>
                      <span className="h-2 w-full bg-mark-track rounded-xs overflow-hidden flex border border-rule">
                        <span
                          className="h-full bg-mark rounded-xs"
                          style={{ width: `${fact.share * 100}%` }}
                        ></span>
                      </span>
                      <span data-source="entity" className="text-[10px] font-mono text-ink-subtle tabular-nums">
                        {intl(fact.n)} {isKo ? '쌍' : 'pairs'}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-rule space-y-1.5">
                  <span
                    data-role="stat"
                    data-semantic-target="dl"
                    className="flex items-baseline justify-between gap-3 text-xs font-mono"
                  >
                    <span className="text-ink-muted font-sans break-keep">
                      {isKo ? '용량 부담과 분절 경향의 상관' : 'Correlation: weight vs. splitting'}
                    </span>
                    <span data-source="entity" className="text-ink font-bold tabular-nums shrink-0">
                      {BDR_CP_SPEARMAN.rho.toFixed(2)}
                    </span>
                  </span>
                  <p data-source="widget" className="text-[11px] font-sans text-ink-body leading-relaxed break-keep">
                    {isKo
                      ? '0에 가깝다. 두 가지는 사실상 따로 움직이는 별개의 힘이다.'
                      : 'Close to zero. The two behave as separate forces, not one.'}
                  </p>
                </div>

                <p data-source="entity" className="text-[10px] font-mono text-ink-subtle pt-2 border-t border-rule break-keep">
                  {REVERSAL_PROVENANCE}
                </p>
              </div>
            </div>
          </div>

          <ArticleFigureCaption
            figNum={articleData.figureNumber}
            caption={isKo ? articleData.figureCaption?.ko : articleData.figureCaption?.en}
            source={isKo ? articleData.figureSource?.ko : articleData.figureSource?.en}
          />
        </ArticleFullWidthBreak>

        <ArticleReadingColumn>
          {post?.[0] && <ArticleParagraph>{post[0]}</ArticleParagraph>}
          {post?.[1] && <ArticleParagraph>{post[1]}</ArticleParagraph>}
        </ArticleReadingColumn>

        {/* FIG. 03-1 — the staged reversal inside the tokenizer */}
        <ArticleFullWidthBreak figure className="my-8 space-y-6">
          <div className="bg-surface-alt border border-rule rounded-xs p-6 sm:p-8 space-y-6 shadow-xs">
            <dl data-role="stat" data-semantic-target="dl" className="border-b border-rule pb-3">
              <dt
                data-source="widget"
                className="text-xs font-mono text-ink font-bold uppercase tracking-wider block"
              >
                {isKo ? '토크나이저 안에서 벌어지는 일' : 'INSIDE THE TOKENIZER'}
              </dt>
              <dd data-source="widget" className="text-[11px] font-mono text-ink-muted break-keep">
                {isKo
                  ? '문장을 먼저 덩어리로 자르고, 각 덩어리를 다시 토큰으로 쪼갠다'
                  : 'A sentence is cut into chunks first, then each chunk is split into tokens'}
              </dd>
            </dl>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  id: 'chunks',
                  label: isKo ? '① 먼저 나뉜 덩어리 수' : '① Chunks after the first cut',
                  ko: CHUNK_REVERSAL.ko.medianChunks,
                  en: CHUNK_REVERSAL.en.medianChunks,
                  note: isKo ? '한국어가 더 적다' : 'Korean has fewer',
                  suffix: '',
                },
                {
                  id: 'per-chunk',
                  label: isKo ? '② 덩어리 하나가 쪼개지는 수' : '② Tokens each chunk becomes',
                  ko: CHUNK_REVERSAL.ko.tokensPerChunk,
                  en: CHUNK_REVERSAL.en.tokensPerChunk,
                  note: isKo ? '여기서 역전된다' : 'Here it reverses',
                  suffix: '',
                },
                {
                  id: 'final',
                  label: isKo ? '③ 최종 토큰 수' : '③ Final token count',
                  ko: CHUNK_REVERSAL.ko.medianTokens,
                  en: CHUNK_REVERSAL.en.medianTokens,
                  note: isKo ? '한국어가 더 많다' : 'Korean has more',
                  suffix: '',
                },
              ].map((row) => (
                <div key={row.id} data-item-id={row.id} className="space-y-3">
                  <span
                    data-source="widget"
                    className="text-[11px] font-mono text-ink font-bold uppercase tracking-wide block break-keep"
                  >
                    {row.label}
                  </span>
                  <dl data-role="stat" data-semantic-target="dl" className="space-y-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-xs font-sans text-ink-body">{isKo ? '한국어' : 'Korean'}</dt>
                      <dd data-source="entity" className="text-2xl font-bold font-mono text-ink tabular-nums">
                        {row.ko}
                        {row.suffix}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-xs font-sans text-ink-muted">{isKo ? '영어' : 'English'}</dt>
                      <dd data-source="entity" className="text-2xl font-bold font-mono text-ink-muted tabular-nums">
                        {row.en}
                        {row.suffix}
                      </dd>
                    </div>
                  </dl>
                  <span
                    data-source="widget"
                    className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block break-keep"
                  >
                    {row.note}
                  </span>
                </div>
              ))}
            </div>

            <p data-source="widget" className="text-[11px] font-sans text-ink-body leading-relaxed pt-3 border-t border-rule break-keep">
              {isKo
                ? '①과 ③의 값은 중앙값이고, ②는 평균이다. 세 열을 곱해서 맞춰 읽는 수치가 아니다.'
                : 'Columns ① and ③ are medians; column ② is a mean. The three are not meant to multiply through.'}
            </p>
            <p data-source="entity" className="text-[10px] font-mono text-ink-subtle break-keep">
              {CHUNK_REVERSAL.provenance}
            </p>
          </div>

          <ArticleFigureCaption
            figNum="FIG. 03-1"
            caption={
              isKo
                ? '한국어 문장은 더 적은 덩어리로 들어가서 더 많은 토큰으로 나온다. 역전은 두 번째 단계에서 일어난다.'
                : 'A Korean sentence enters as fewer chunks and leaves as more tokens. The reversal happens at the second stage.'
            }
            source={isKo ? `자료: ${CHUNK_REVERSAL.provenance}` : `Source: ${CHUNK_REVERSAL.provenance}`}
          />
        </ArticleFullWidthBreak>

        <ArticleReadingColumn>
          {post?.[2] && <ArticleParagraph>{post[2]}</ArticleParagraph>}

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
