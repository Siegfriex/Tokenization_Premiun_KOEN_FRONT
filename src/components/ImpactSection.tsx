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
    <section id="impact" data-widget="ImpactSection" data-section="impact" className="py-20 sm:py-28 bg-surface-alt text-ink border-b border-rule scroll-mt-12">
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
        <ArticleFullWidthBreak className="space-y-10 my-8">
          {/* 3-Level Scale-Up Grid */}
          <div data-collection="impact-scale-levels" data-semantic-target="ul" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {IMPACT_SCALE_LEVELS.map((level) => (
              <div
                key={level.id}
                data-item-id={level.id}
                className={`rounded-xs p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs border ${
                  level.highlight
                    ? 'bg-accent text-on-accent border-accent'
                    : 'bg-surface border-rule'
                }`}
              >
                <div className="space-y-4">
                  <div data-role="stat" data-semantic-target="dl" className={`flex items-center justify-between border-b pb-3 ${level.highlight ? 'border-rule-on-accent' : 'border-rule'}`}>
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider ${level.highlight ? 'text-on-accent-muted' : 'text-ink-muted'}`}>
                      {level.levelLabelKo}
                    </span>
                    <span className={`text-xs font-mono ${level.highlight ? 'text-on-accent font-bold' : 'text-ink-muted'}`}>
                      {level.levelBadge}
                    </span>
                  </div>

                  <h3 data-role="heading" data-semantic-target="heading" className={`text-xl font-bold ${level.highlight ? 'text-on-accent' : 'text-ink'}`}>
                    {getLocalizedText(level.title, language)}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed font-sans ${level.highlight ? 'text-on-accent-muted' : 'text-ink-body'}`}>
                    {getLocalizedText(level.description, language)}
                  </p>
                </div>

                <div className={`text-[11px] font-mono border-t pt-3 ${level.highlight ? 'text-on-accent-muted font-bold border-rule-on-accent' : 'text-ink-muted border-rule'}`}>
                  {level.unitNote}
                </div>
              </div>
            ))}
          </div>

          {/* Complete Conceptual Causal Chain */}
          <div className="bg-surface border border-rule rounded-xs p-6 sm:p-8 space-y-6 shadow-xs">
            <div data-role="stat" data-semantic-target="dl" className="space-y-1">
              <SectionEyebrow>FINAL CONCEPTUAL CAUSAL CHAIN</SectionEyebrow>
              <h4 data-source="widget" className="text-lg sm:text-xl font-bold text-ink">
                언어 구조에서 사회적 파급 효과까지의 인과 사슬
              </h4>
            </div>

            <div data-collection="impact-causal-chain" data-semantic-target="ul" className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
              {IMPACT_CAUSAL_CHAIN.map((step, idx) => {
                const isEmphasis = step === 'Token Premium' || step === 'Potential Digital Friction';
                return (
                  <React.Fragment key={step}>
                    {idx > 0 && <span className="text-ink-muted">→</span>}
                    <div
                      className={`p-3 rounded-xs border ${
                        isEmphasis
                          ? 'bg-accent border-accent text-on-accent font-bold'
                          : 'bg-surface-alt border-rule text-ink-body'
                      }`}
                    >
                      {step}
                    </div>
                  </React.Fragment>
                );
              })}
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
