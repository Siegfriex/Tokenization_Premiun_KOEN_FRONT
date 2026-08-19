import React from 'react';
import { useUILanguage } from '../features/change-language';
import { ARTICLE_CONTENT, MACRO_ADOPTION_PHASES } from '../entities/article-content';
import { Container, SectionHeading, HeadingAccent } from '../shared/ui';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleParagraph,
  ArticleFigureCaption,
  ArticleFullWidthBreak,
} from './ArticleElements';

export const KoreaAIContextSection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
  const articleData = ARTICLE_CONTENT.koreaInfrastructure;

  return (
    <section id="infrastructure" data-widget="KoreaAIContextSection" data-section="infrastructure" className="py-20 sm:py-28 bg-surface text-ink border-b border-rule scroll-mt-16">
      <Container gutter className="space-y-12">
        {/* Section Header */}
        <SectionHeading eyebrow={isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}>
          {isKo ? (
            <>
              AI가 인프라가 되는 사회,
              <br />
              <HeadingAccent>확장되는 토큰 스케일</HeadingAccent>
            </>
          ) : (
            <>
              When AI Becomes Infrastructure,
              <br />
              <HeadingAccent>Scaling Token Demands</HeadingAccent>
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

        {/* FULL-WIDTH BREAKOUT: Macro Adoption Chain & Verified Policy Slots */}
        <ArticleFullWidthBreak figure className="space-y-10 my-8">
          {/* Macro Adoption Chain */}
          <div className="space-y-6">
            <dl data-role="stat" data-semantic-target="dl" className="border-b border-rule pb-3 flex items-center justify-between">
              <dt data-source="widget" className="text-xs font-mono text-ink font-bold uppercase tracking-wider">
                {isKo ? 'AI 확산의 흐름' : 'AI ADOPTION TIMELINE'}
              </dt>
              <dd data-source="widget" className="text-xs font-mono text-ink-muted">{isKo ? '규모 변화' : 'Scale Dynamics'}</dd>
            </dl>

            <ul data-collection="macro-adoption-phases" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {MACRO_ADOPTION_PHASES.map((phase, idx) => (
                <li
                  key={phase.id}
                  data-item-id={phase.id}
                  className={`relative rounded-xs p-5 space-y-3 border ${
                    phase.highlight
                      ? 'bg-surface border-2 border-rule-strong shadow-sm'
                      : 'bg-surface-alt border-rule'
                  } ${
                    idx < MACRO_ADOPTION_PHASES.length - 1
                      ? "lg:after:content-['→'] lg:after:absolute lg:after:-right-6 lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:text-ink-muted lg:after:text-lg lg:after:font-mono"
                      : ''
                  }`}
                >
                  <div className="text-xs font-mono font-bold uppercase text-ink-muted">
                    {isKo ? phase.phaseLabel.ko : phase.phaseLabel.en}
                  </div>
                  <div className="text-lg font-bold text-ink">
                    {isKo ? phase.name.ko : phase.name.en}
                  </div>
                  <p className="text-xs leading-relaxed font-sans text-ink-body">
                    {isKo ? phase.description.ko : phase.description.en}
                  </p>
                </li>
              ))}
            </ul>
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
        </ArticleReadingColumn>
      </Container>
    </section>
  );
};
