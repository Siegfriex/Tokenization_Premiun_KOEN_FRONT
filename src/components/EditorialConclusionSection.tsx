import React from 'react';
import { UILanguage } from '../types';
import { ARTICLE_CONTENT } from '../data/articleContent';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleParagraph,
} from './ArticleElements';
import { ArrowUp } from 'lucide-react';

interface EditorialConclusionSectionProps {
  uiLang: UILanguage;
}

export const EditorialConclusionSection: React.FC<EditorialConclusionSectionProps> = ({ uiLang }) => {
  const isKo = uiLang === 'ko';
  const articleData = ARTICLE_CONTENT.conclusionSynthesis;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="result"
      className="min-h-[75vh] flex flex-col justify-between bg-[#F7F7F5] text-[#111111] py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-b border-[#DADAD6]"
    >
      <div className="max-w-[1360px] mx-auto w-full my-auto space-y-12">
        <div className="space-y-4 max-w-5xl">
          <div className="text-xs font-mono text-[#777773] font-bold tracking-widest uppercase">
            {isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] leading-tight">
            {isKo ? (
              <>
                우리는 같은 의미를,
                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  같은 비용으로 표현하고 있는가?
                </span>
              </>
            ) : (
              <>
                Are We Expressing the Same Meaning,
                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  At the Same Computational Cost?
                </span>
              </>
            )}
          </h2>
        </div>

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

          <div className="pt-4 border-l-2 border-[#111111] pl-6 sm:pl-8 my-6">
            <p className="text-base sm:text-lg text-[#111111] font-serif italic leading-relaxed">
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

        {/* Action button to review from start */}
        <div className="pt-8 border-t border-[#DADAD6] flex items-center justify-between">
          <div className="text-xs font-mono text-[#777773]">
            TOKEN PREMIUM INTERACTIVE DATA STORY / 2026
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFFFFF] hover:bg-[#111111] hover:text-[#FFFFFF] border border-[#DADAD6] hover:border-[#111111] text-[#111111] rounded-xs font-mono text-xs font-bold transition-all cursor-pointer group shadow-2xs"
          >
            <span>{isKo ? '처음부터 다시 보기' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#777773] group-hover:text-[#FFFFFF] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
