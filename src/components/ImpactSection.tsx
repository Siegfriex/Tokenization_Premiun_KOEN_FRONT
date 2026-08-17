import React from 'react';
import { useUILanguage } from '../features/change-language';
import { getLocalizedText } from '../shared/i18n';
import { ARTICLE_CONTENT, IMPACT_SCALE_LEVELS, IMPACT_CAUSAL_CHAIN } from '../entities/article-content';
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
    <section id="impact" className="py-20 sm:py-28 bg-surface-alt text-ink border-b border-rule scroll-mt-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs font-mono text-ink-muted font-bold tracking-widest uppercase">
            {isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-tight">
            {isKo ? (
              <>
                단순한 요금 차이를 넘어,
                <br />
                <span className="text-ink underline decoration-emphasis underline-offset-8 decoration-2">
                  비용의 문제를 넘어
                </span>
              </>
            ) : (
              <>
                Beyond Mere Billing:
                <br />
                <span className="text-ink underline decoration-emphasis underline-offset-8 decoration-2">
                  Systemic Architecture Impact
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

        {/* FULL-WIDTH BREAKOUT: 3-Level Scale-Up Grid & Conceptual Causal Chain */}
        <ArticleFullWidthBreak className="space-y-10 my-8">
          {/* 3-Level Scale-Up Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {IMPACT_SCALE_LEVELS.map((level) => (
              <div
                key={level.id}
                className={`rounded-xs p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs border ${
                  level.highlight
                    ? 'bg-surface-inverse text-ink-inverse border-surface-inverse'
                    : 'bg-surface border-rule'
                }`}
              >
                <div className="space-y-4">
                  <div className={`flex items-center justify-between border-b pb-3 ${level.highlight ? 'border-[#353535]' : 'border-rule'}`}>
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider ${level.highlight ? 'text-[#DADAD6]' : 'text-ink-muted'}`}>
                      {level.levelLabelKo}
                    </span>
                    <span className={`text-xs font-mono ${level.highlight ? 'text-ink-inverse font-bold' : 'text-ink-muted'}`}>
                      {level.levelBadge}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold ${level.highlight ? 'text-ink-inverse' : 'text-ink'}`}>
                    {getLocalizedText(level.title, language)}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed font-sans ${level.highlight ? 'text-[#DADAD6]' : 'text-ink-body'}`}>
                    {getLocalizedText(level.description, language)}
                  </p>
                </div>

                <div className={`text-[11px] font-mono border-t pt-3 ${level.highlight ? 'text-[#DADAD6] font-bold border-[#353535]' : 'text-ink-muted border-rule'}`}>
                  {level.unitNote}
                </div>
              </div>
            ))}
          </div>

          {/* Complete Conceptual Causal Chain */}
          <div className="bg-surface border border-rule rounded-xs p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-1">
              <span className="text-xs font-mono text-ink-muted font-bold uppercase tracking-widest block">
                FINAL CONCEPTUAL CAUSAL CHAIN
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-ink">
                언어 구조에서 사회적 파급 효과까지의 인과 사슬
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
              {IMPACT_CAUSAL_CHAIN.map((step, idx) => {
                const isEmphasis = step === 'Token Premium' || step === 'Potential Digital Friction';
                return (
                  <React.Fragment key={step}>
                    {idx > 0 && <span className="text-ink-muted">→</span>}
                    <div
                      className={`p-3 rounded-xs border ${
                        isEmphasis
                          ? 'bg-surface-inverse border-surface-inverse text-ink-inverse font-bold'
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
      </div>
    </section>
  );
};
