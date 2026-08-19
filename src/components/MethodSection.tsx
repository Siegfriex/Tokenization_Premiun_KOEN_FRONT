import React, { useState } from 'react';
import { useUILanguage } from '../features/change-language';
import { METHODOLOGY_ITEMS, WHAT_WE_DO_NOT_CLAIM } from '../entities/methodology';
import { ARTICLE_CONTENT } from '../entities/article-content';
import { Container, SectionHeading, HeadingAccent } from '../shared/ui';
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
    <section id="method" data-widget="MethodSection" data-section="method" className="py-20 sm:py-28 bg-surface text-ink border-b border-rule scroll-mt-16">
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
          <div className="bg-surface border-2 border-rule-strong rounded-xs p-6 sm:p-10 space-y-6 shadow-sm">
            <dl data-role="stat" data-semantic-target="dl" className="flex items-start justify-between border-b border-rule pb-3 gap-4">
              <dt data-source="widget" className="text-sm sm:text-base font-mono text-ink font-bold uppercase tracking-wider">
                {isKo ? '이 분석으로 말할 수 없는 것' : 'What This Analysis Does Not Claim'}
              </dt>
              {/* Read from the array, not hardcoded — closes METH-008, where a
                  literal 6 happened to equal the array length by coincidence. */}
              <dd data-source="entity" className="text-xs font-mono text-ink-body shrink-0 tabular-nums">
                {isKo ? `${WHAT_WE_DO_NOT_CLAIM.length}가지 경계` : `${WHAT_WE_DO_NOT_CLAIM.length} Key Principles`}
              </dd>
            </dl>

            <ul data-collection="what-we-do-not-claim" className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {WHAT_WE_DO_NOT_CLAIM.map((claim, idx) => (
                <li
                  key={idx}
                  data-role="collection-item"
                  className="p-4 bg-surface border border-rule rounded-xs flex items-start gap-3 text-xs sm:text-sm text-ink"
                >
                  <XCircle className="w-4 h-4 text-ink shrink-0 mt-0.5" />
                  <span data-source="widget" className="leading-snug text-ink-body break-keep">{isKo ? claim.ko : claim.en}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Methodology Accordion */}
          <div className="space-y-4">
            <dl data-role="stat" data-semantic-target="dl" className="border-b border-rule pb-3 flex items-center justify-between">
              <dt data-source="widget" className="text-xs font-mono text-ink-body uppercase tracking-wider font-semibold">
                {isKo ? '세부 분석 방법론' : 'Detailed Methodological Pillars:'}
              </dt>
              <dd data-source="widget" className="text-xs font-mono text-ink-muted">{isKo ? '클릭하여 펼치기' : 'Click to expand'}</dd>
            </dl>

            <ul data-collection="methodology-items" className="grid grid-cols-1 gap-3">
              {METHODOLOGY_ITEMS.map((item) => {
                const isOpen = openItemIds.includes(item.id);
                return (
                  <li
                    key={item.id}
                    data-item-id={item.id}
                    className="bg-surface border border-rule rounded-xs overflow-hidden transition-all shadow-2xs"
                  >
                    <button data-role="stat" data-semantic-target="dl"
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`method-panel-${item.id}`}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-surface-alt transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rule-strong"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-ink-muted"></span>
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
                        className="px-5 pb-5 pt-2 text-xs sm:text-sm text-ink-body leading-relaxed font-sans border-t border-rule bg-surface-alt break-keep"
                      >
                        {isKo ? item.content.ko : item.content.en}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </ArticleFullWidthBreak>

        {/* READING COLUMN: Post-Figure Analytical Prose & Footnotes */}
        <ArticleReadingColumn>
          {/* Footnotes */}
          {articleData.footnotes && (
            <div className="pt-8 border-t border-rule space-y-2 text-xs font-mono text-ink-muted">
              <div data-source="widget" className="font-bold text-ink uppercase tracking-wider mb-2">
                {isKo ? '연구 주석:' : 'Research Footnotes:'}
              </div>
              {(isKo ? articleData.footnotes.ko : articleData.footnotes.en).map((fn, idx) => (
                <p data-role="collection-item" data-semantic-target="ul" key={idx} className="leading-relaxed break-keep">
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
