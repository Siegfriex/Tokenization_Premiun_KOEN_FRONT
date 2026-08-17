import React from 'react';
import { useUILanguage } from '../features/change-language';
import { ARTICLE_CONTENT } from '../entities/article-content';
import { Container, SectionHeading, HeadingAccent } from '../shared/ui';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleParagraph,
} from './ArticleElements';
import { ArrowUp } from 'lucide-react';

export const EditorialConclusionSection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
  const articleData = ARTICLE_CONTENT.conclusionSynthesis;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="result"
      data-widget="EditorialConclusionSection"
      data-section="result"
      className="min-h-[75vh] flex flex-col justify-between bg-surface-alt text-ink py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-b border-rule"
    >
      <Container className="my-auto space-y-10">
        <SectionHeading
          scale="display"
          eyebrow={isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}
        >
          {isKo ? (
            <>
              우리는 같은 의미를,
              <br />
              <HeadingAccent>같은 비용으로 표현하고 있는가?</HeadingAccent>
            </>
          ) : (
            <>
              Are We Expressing the Same Meaning,
              <br />
              <HeadingAccent>At the Same Computational Cost?</HeadingAccent>
            </>
          )}
        </SectionHeading>

        {/* READING COLUMN: Conclusion Narrative & Synthesis */}
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

          <div className="pt-4 border-l border-rule pl-6 sm:pl-8 my-6">
            <p className="text-base sm:text-lg text-ink-body font-serif italic leading-relaxed">
              {isKo ? (
                <>
                  “AI가 사회의 보편적 기간 인프라가 될수록, 언어별 Representation Efficiency를 투명하게 측정하고 다국어 토크나이저 구조를 개선하는 문제는 디지털 형평성과 직결되는 핵심 과제가 될 것입니다.”
                </>
              ) : (
                <>
                  “As generative AI evolves into universal social infrastructure, measuring and optimizing multilingual representation efficiency becomes critical for digital equity.”
                </>
              )}
            </p>
          </div>
        </ArticleReadingColumn>

        {/* Exit device, not a CTA (Director redline, S07): epilogue navigation, not the slide's protagonist */}
        <div data-role="stat" data-semantic-target="dl" className="pt-8 border-t border-rule flex items-center justify-between">
          <div data-source="widget" className="text-xs font-mono text-ink-subtle">
            TOKEN PREMIUM INTERACTIVE DATA STORY / 2026
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface hover:bg-surface-alt border border-rule hover:border-ink text-ink-body hover:text-ink rounded-xs font-mono text-xs font-semibold transition-all cursor-pointer group"
          >
            <span data-source="widget">{isKo ? '처음부터 다시 보기' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5 text-ink-subtle group-hover:text-ink group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </Container>
    </section>
  );
};
