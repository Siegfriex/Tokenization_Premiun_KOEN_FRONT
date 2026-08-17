import React, { useState } from 'react';
import { useUILanguage } from '../features/change-language';
import { getLocalizedText } from '../shared/i18n';
import { ARTICLE_CONTENT } from '../entities/article-content';
import { PIPELINE_STEPS } from '../entities/pipeline-step';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleSubheading,
  ArticleParagraph,
  ArticleFigureCaption,
  ArticleFinding,
  ArticleFullWidthBreak,
} from './ArticleElements';

export const PipelineSection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
  const articleData = ARTICLE_CONTENT.tokenUnit;
  const [activeStep, setActiveStep] = useState<number>(1); // 0-indexed: Step 02 (TOKENIZATION) default

  return (
    <section id="pipeline" className="py-20 sm:py-28 bg-surface text-ink border-b border-rule scroll-mt-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs font-mono text-ink-muted font-bold tracking-widest uppercase">
            {isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-tight">
            {isKo ? (
              <>
                토큰,
                <br />
                <span className="underline decoration-emphasis underline-offset-8 decoration-2">
                  AI 시대의 새로운 계량 단위
                </span>
              </>
            ) : (
              <>
                Tokens,
                <br />
                <span className="underline decoration-emphasis underline-offset-8 decoration-2">
                  The New Unit of Measurement in AI
                </span>
              </>
            )}
          </h2>
        </div>

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
        <ArticleFullWidthBreak className="space-y-8 my-8">
          <div className="space-y-8">
            <div className="text-xs font-mono text-ink-muted uppercase tracking-wider flex items-center justify-between border-b border-rule pb-2">
              <span>TRANSFORMER PIPELINE SEQUENCING</span>
              <span className="text-ink font-bold">★ STEP 02: THE BOTTLENECK</span>
            </div>

            {/* Horizontal Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              {PIPELINE_STEPS.map((item, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveStep(idx)}
                    className={`p-5 rounded-xs border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                      item.highlight
                        ? 'bg-surface-inverse text-ink-inverse border-surface-inverse shadow-xs'
                        : isActive
                        ? 'bg-surface-alt border-ink text-ink'
                        : 'bg-surface-alt border-rule hover:border-ink text-ink'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span
                          className={`text-xl font-bold font-mono ${
                            item.highlight ? 'text-ink-inverse' : 'text-ink-muted'
                          }`}
                        >
                          {item.step}
                        </span>
                        {item.highlight && (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-surface text-ink rounded-xs font-bold uppercase">
                            GAP ORIGIN
                          </span>
                        )}
                      </div>
                      <div
                        className={`font-mono text-xs font-bold uppercase tracking-wider ${
                          item.highlight ? 'text-[#DADAD6]' : 'text-ink-muted'
                        }`}
                      >
                        {item.name}
                      </div>
                      <div
                        className={`font-bold text-sm ${
                          item.highlight ? 'text-ink-inverse' : 'text-ink'
                        }`}
                      >
                        {getLocalizedText(item.title, language)}
                      </div>
                    </div>

                    <p
                      className={`text-xs font-sans leading-relaxed pt-2 border-t ${
                        item.highlight
                          ? 'text-[#DADAD6] border-[#353535]'
                          : 'text-ink-body border-rule'
                      }`}
                    >
                      {getLocalizedText(item.description, language)}
                    </p>
                  </div>
                );
              })}
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
      </div>
    </section>
  );
};
