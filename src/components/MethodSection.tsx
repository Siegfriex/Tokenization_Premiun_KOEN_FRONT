import React, { useState } from 'react';
import { useUILanguage } from '../features/change-language';
import { METHODOLOGY_ITEMS, WHAT_WE_DO_NOT_CLAIM } from '../entities/methodology';
import { ARTICLE_CONTENT } from '../entities/article-content';
import { Container, SectionHeading, HeadingAccent } from '../shared/ui';
import { claimAttrs } from '../shared/trace';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleParagraph,
  ArticleFullWidthBreak,
} from './ArticleElements';
import { ChevronDown, XCircle } from 'lucide-react';

export const MethodSection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
  const articleData = ARTICLE_CONTENT.methodologyBoundaries;
  const [openItemIds, setOpenItemIds] = useState<string[]>([
    METHODOLOGY_ITEMS[0].id,
    METHODOLOGY_ITEMS[1].id,
  ]);

  const toggleItem = (id: string) => {
    setOpenItemIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="method" data-widget="MethodSection" data-section="method" className="py-20 sm:py-28 bg-surface text-ink border-b border-rule scroll-mt-12">
      <Container gutter className="space-y-12">
        {/* Section Header */}
        <SectionHeading eyebrow={isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}>
          {isKo ? (
            <>
              연구 방법론 및
              <br />
              <HeadingAccent>학술적 한계와 경계</HeadingAccent>
            </>
          ) : (
            <>
              Methodology &amp;
              <br />
              <HeadingAccent>Scientific Boundaries</HeadingAccent>
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

        {/* FULL-WIDTH BREAKOUT: Prominent Boundary Box & Methodology Accordion */}
        <ArticleFullWidthBreak className="space-y-10 my-8">
          {/* Prominent Boundary Box: What We Do NOT Claim */}
          <div className="bg-surface-alt border border-rule rounded-xs p-6 sm:p-10 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <span className="text-xs font-mono text-ink font-bold uppercase tracking-wider">
                CRITICAL BOUNDARY / 본 분석이 주장하지 않는 것 (What We Do NOT Claim)
              </span>
              <span {...claimAttrs('method.principle-count')} className="text-xs font-mono text-ink-muted">6 Key Principles</span>
            </div>

            <div data-collection="what-we-do-not-claim" data-semantic-target="ul" className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {WHAT_WE_DO_NOT_CLAIM.map((claim, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-surface border border-rule rounded-xs flex items-start gap-3 text-xs sm:text-sm text-ink"
                >
                  <XCircle className="w-4 h-4 text-ink shrink-0 mt-0.5" />
                  <span className="leading-snug text-ink-body">{isKo ? claim.ko : claim.en}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology Accordion */}
          <div className="space-y-4">
            <div className="border-b border-rule pb-3 flex items-center justify-between">
              <span className="text-xs font-mono text-ink-body uppercase tracking-wider font-semibold">
                {isKo ? '세부 분석 방법론 (Methodological Pillars):' : 'Detailed Methodological Pillars:'}
              </span>
              <span className="text-xs font-mono text-ink-muted">Click to expand</span>
            </div>

            <div data-collection="methodology-items" data-semantic-target="ul" className="grid grid-cols-1 gap-3">
              {METHODOLOGY_ITEMS.map((item) => {
                const isOpen = openItemIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    data-item-id={item.id}
                    className="bg-surface border border-rule rounded-xs overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`method-panel-${item.id}`}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-surface-alt transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rule-strong"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span className="font-bold text-sm sm:text-base text-ink">
                          {isKo ? item.title.ko : item.title.en}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-ink-muted transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-ink' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div
                        id={`method-panel-${item.id}`}
                        className="px-5 pb-5 pt-2 text-xs sm:text-sm text-ink-body leading-relaxed font-sans border-t border-rule bg-surface-alt"
                      >
                        {isKo ? item.content.ko : item.content.en}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ArticleFullWidthBreak>

        {/* READING COLUMN: Post-Figure Analytical Prose & Footnotes */}
        <ArticleReadingColumn>
          {isKo
            ? articleData.postFigureParagraphs?.ko.map((p, idx) => (
                <ArticleParagraph key={idx}>{p}</ArticleParagraph>
              ))
            : articleData.postFigureParagraphs?.en.map((p, idx) => (
                <ArticleParagraph key={idx}>{p}</ArticleParagraph>
              ))}

          {/* Footnotes */}
          {articleData.footnotes && (
            <div className="pt-8 border-t border-rule space-y-2 text-xs font-mono text-ink-muted">
              <div className="font-bold text-ink uppercase tracking-wider mb-2">
                {isKo ? '연구 주석 (Research Footnotes):' : 'Research Footnotes:'}
              </div>
              {(isKo ? articleData.footnotes.ko : articleData.footnotes.en).map((fn, idx) => (
                <p key={idx} className="leading-relaxed">
                  {fn}
                </p>
              ))}
            </div>
          )}
        </ArticleReadingColumn>
      </Container>
    </section>
  );
};
