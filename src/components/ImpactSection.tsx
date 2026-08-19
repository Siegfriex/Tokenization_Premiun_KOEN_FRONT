import React from 'react';
import { useUILanguage } from '../features/change-language';
import { getLocalizedText } from '../shared/i18n';
import { ARTICLE_CONTENT, IMPACT_SCALE_LEVELS, IMPACT_CAUSAL_CHAIN } from '../entities/article-content';
import { Container, SectionHeading, SectionEyebrow, HeadingAccent } from '../shared/ui';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleSubheading,
  ArticleParagraph,
  ArticleFigureCaption,
  ArticleFinding,
  ArticleFullWidthBreak,
} from './ArticleElements';

export const ImpactSection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
  const articleData = ARTICLE_CONTENT.socioeconomicScale;

  return (
    <section id="impact" data-widget="ImpactSection" data-section="impact" className="py-20 sm:py-28 bg-surface-alt text-ink border-b border-rule scroll-mt-16">
      <Container gutter className="space-y-12">
        {/* Section Header */}
        <SectionHeading eyebrow={isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}>
          {isKo ? (
            <>
              단순한 요금 차이를 넘어,
              <br />
              <HeadingAccent>비용의 문제를 넘어</HeadingAccent>
            </>
          ) : (
            <>
              Beyond Mere Billing:
              <br />
              <HeadingAccent>Systemic Architecture Impact</HeadingAccent>
            </>
          )}
        </SectionHeading>

        {/* READING COLUMN: Pre-Figure Journalism Text */}
        <ArticleReadingColumn>
          <ArticleLead>
            {isKo ? articleData.lead?.ko : articleData.lead?.en}
          </ArticleLead>

          <ArticleSubheading>
            {isKo ? articleData.subheading?.ko : articleData.subheading?.en}
          </ArticleSubheading>

          {isKo
            ? articleData.preFigureParagraphs?.ko.map((p, idx) => (
                <ArticleParagraph key={idx}>{p}</ArticleParagraph>
              ))
            : articleData.preFigureParagraphs?.en.map((p, idx) => (
                <ArticleParagraph key={idx}>{p}</ArticleParagraph>
              ))}
        </ArticleReadingColumn>

        {/* FULL-WIDTH BREAKOUT: 3-Level Scale-Up Grid & Conceptual Causal Chain */}
        <ArticleFullWidthBreak figure className="space-y-10 my-8">
          {/* 3-Level Scale-Up Grid */}
          <ul data-collection="impact-scale-levels" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {IMPACT_SCALE_LEVELS.map((level) => (
              <li
                key={level.id}
                data-item-id={level.id}
                className="rounded-xs p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs border bg-surface border-rule"
              >
                <div className="space-y-4">
                  <div className="border-b pb-3 border-rule">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted">
                      {level.levelLabelKo}
                    </span>
                  </div>

                  <h3 data-role="heading" data-semantic-target="heading" className="text-xl font-bold text-ink">
                    {getLocalizedText(level.title, language)}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed font-sans text-ink-body break-keep">
                    {getLocalizedText(level.description, language)}
                  </p>
                </div>

                <div className="text-[11px] font-mono border-t pt-3 text-ink-muted border-rule">
                  {level.unitNote}
                </div>
              </li>
            ))}
          </ul>

          {/* Possible expansion pathway — the slide's Tier-1 point: the
              3-level grid above is the build-up, this is the synthesis.
              Explicitly non-causal framing per Human Preview 01
              (HP01-S52-R02/R03/B01): was "FINAL CONCEPTUAL CAUSAL CHAIN". */}
          <div className="bg-surface border-2 border-rule-strong rounded-xs p-6 sm:p-8 space-y-6 shadow-sm">
            <div data-role="stat" data-semantic-target="dl" className="space-y-1">
              <SectionEyebrow>{isKo ? '가능한 확장 경로' : 'POSSIBLE EXPANSION PATHWAY'}</SectionEyebrow>
              <p className="text-[11px] text-ink-subtle font-sans">
                {isKo
                  ? '실증된 인과관계가 아니라, 개념적으로 연결될 수 있는 경로입니다.'
                  : 'A conceptual pathway, not a proven causal relationship.'}
              </p>
            </div>

            <ol data-collection="impact-causal-chain" className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
              {IMPACT_CAUSAL_CHAIN.map((step, idx) => {
                // First and last emphasised: what this article measured, and
                // where it says that leads. Matched by position rather than by
                // English string, which silently stopped matching when the
                // final step was reworded.
                const isEmphasis = step.en === 'Token Premium' || idx === IMPACT_CAUSAL_CHAIN.length - 1;
                return (
                  <React.Fragment key={step.en}>
                    {idx > 0 && <span aria-hidden="true" className="text-ink-muted">→</span>}
                    <li
                      data-item-id={step.en}
                      className={`p-3 rounded-xs border ${
                        isEmphasis
                          ? 'bg-surface border-2 border-rule-strong text-ink font-bold'
                          : 'bg-surface-alt border-rule text-ink-body'
                      }`}
                    >
                      {isKo ? step.ko : step.en}
                    </li>
                  </React.Fragment>
                );
              })}
            </ol>
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
