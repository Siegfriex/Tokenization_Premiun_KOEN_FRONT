import React, { useState } from 'react';
import { useUILanguage } from '../features/change-language';
import { getLocalizedText } from '../shared/i18n';
import { ARTICLE_CONTENT } from '../entities/article-content';
import { PIPELINE_STEPS } from '../entities/pipeline-step';
import { Container, SectionHeading, HeadingAccent, SelectableCard } from '../shared/ui';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleSubheading,
  ArticleParagraph,
  ArticleFigureCaption,
  ArticleFinding,
  ArticleFullWidthBreak,
  ArticleDisclosure,
} from './ArticleElements';

export const PipelineSection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
  const articleData = ARTICLE_CONTENT.tokenUnit;
  const [activeStep, setActiveStep] = useState<number>(1); // 0-indexed: Step 02 (TOKENIZATION) default

  return (
    <section id="pipeline" data-widget="PipelineSection" data-section="pipeline" className="py-20 sm:py-28 bg-surface text-ink border-b border-rule scroll-mt-16">
      <Container gutter className="space-y-12">
        {/* Section Header */}
        <SectionHeading eyebrow={isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}>
          {isKo ? (
            <>
              토큰,
              <br />
              <HeadingAccent>AI 시대의 새로운 계량 단위</HeadingAccent>
            </>
          ) : (
            <>
              Tokens,
              <br />
              <HeadingAccent>The New Unit of Measurement in AI</HeadingAccent>
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

        {/* FULL-WIDTH BREAKOUT: Pipeline Visualization */}
        <ArticleFullWidthBreak figure className="space-y-8 my-8">
          <div className="space-y-8">
            {/* Horizontal Steps Grid */}
            <ul data-collection="pipeline-steps" className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              {PIPELINE_STEPS.map((item, idx) => {
                const isActive = activeStep === idx;
                return (
                  <li key={item.id} className="h-full">
                  <SelectableCard
                    selected={isActive}
                    onSelect={() => setActiveStep(idx)}
                    itemId={item.id}
                    surface="surface-alt"
                    variant="outline"
                    emphasized={item.highlight}
                    className="p-5 flex flex-col justify-between space-y-4 text-left w-full h-full"
                  >
                    <span className="block space-y-2">
                      <span data-role="stat" data-semantic-target="dl" className="flex items-center justify-between text-xs font-mono">
                        <span
                          className={`text-xl font-bold font-mono ${
                            item.highlight ? 'text-on-accent' : 'text-ink-muted'
                          }`}
                        >
                          {item.step}
                        </span>
                      </span>
                      <span
                        className={`block font-mono text-xs font-bold uppercase tracking-wider ${
                          item.highlight ? 'text-on-accent-muted' : 'text-ink-muted'
                        }`}
                      >
                        {item.name}
                      </span>
                      <span
                        className={`block font-bold text-sm ${
                          item.highlight ? 'text-on-accent' : 'text-ink-body'
                        }`}
                      >
                        {getLocalizedText(item.title, language)}
                      </span>
                    </span>

                    <span
                      className={`block text-xs font-sans leading-relaxed pt-2 border-t ${
                        item.highlight
                          ? 'text-on-accent-muted border-rule-on-accent'
                          : 'text-ink-muted border-rule'
                      }`}
                    >
                      {getLocalizedText(item.description, language)}
                    </span>
                  </SelectableCard>
                  </li>
                );
              })}
            </ul>

            {/* Figure Caption & Source */}
            <ArticleFigureCaption
              figNum={articleData.figureNumber}
              caption={isKo ? articleData.figureCaption?.ko : articleData.figureCaption?.en}
              source={isKo ? articleData.figureSource?.ko : articleData.figureSource?.en}
            />
          </div>
        </ArticleFullWidthBreak>

        {/* READING COLUMN: Post-Figure Key Finding (1DEPTH) + Process Detail (2DEPTH) */}
        <ArticleReadingColumn>
          <ArticleFinding
            label={isKo ? articleData.keyFinding?.label?.ko : articleData.keyFinding?.label?.en}
            statement={isKo ? articleData.keyFinding?.statement.ko : articleData.keyFinding?.statement.en}
          />

          <ArticleDisclosure summary={isKo ? '토큰화 처리 과정 자세히 보기' : 'How tokenization actually works'}>
            {isKo
              ? articleData.postFigureParagraphs?.ko.map((p, idx) => (
                  <ArticleParagraph key={idx}>{p}</ArticleParagraph>
                ))
              : articleData.postFigureParagraphs?.en.map((p, idx) => (
                  <ArticleParagraph key={idx}>{p}</ArticleParagraph>
                ))}
          </ArticleDisclosure>
        </ArticleReadingColumn>
      </Container>
    </section>
  );
};
