import React, { useState } from 'react';
import { UILanguage } from '../types';
import { CURATED_PAIRED_SENTENCES } from '../data/storyData';
import { ARTICLE_CONTENT } from '../data/articleContent';
import { Hash } from 'lucide-react';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleParagraph,
  ArticleFigureCaption,
  ArticleFinding,
  ArticleFullWidthBreak,
} from './ArticleElements';

interface TokenCompareSectionProps {
  uiLang: UILanguage;
}

export const TokenCompareSection: React.FC<TokenCompareSectionProps> = ({ uiLang }) => {
  const isKo = uiLang === 'ko';
  const articleData = ARTICLE_CONTENT.realSentences;
  const [selectedPairId, setSelectedPairId] = useState<string>(CURATED_PAIRED_SENTENCES[0].id);

  const selectedPair =
    CURATED_PAIRED_SENTENCES.find((p) => p.id === selectedPairId) || CURATED_PAIRED_SENTENCES[0];

  return (
    <section id="compare" className="py-20 sm:py-28 bg-[#F7F7F5] text-[#111111] border-b border-[#DADAD6] scroll-mt-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Section Eyebrow & Large Question */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs font-mono text-[#777773] font-bold tracking-widest uppercase">
            {isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
            {isKo ? (
              <>
                통계보다 직관적인,
                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  실제 문장으로 알아보자
                </span>
              </>
            ) : (
              <>
                Beyond Abstract Statistics:
                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  Examining Real Sentence Pairs
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

          {isKo
            ? articleData.preFigureParagraphs?.ko.map((p, idx) => (
                <ArticleParagraph key={idx}>{p}</ArticleParagraph>
              ))
            : articleData.preFigureParagraphs?.en.map((p, idx) => (
                <ArticleParagraph key={idx}>{p}</ArticleParagraph>
              ))}
        </ArticleReadingColumn>

        {/* FULL-WIDTH BREAKOUT: Interactive Token Compare Lab */}
        <ArticleFullWidthBreak className="space-y-8 my-8">
          {/* Minimal Paired Sentence Selector Bar */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#777773] uppercase tracking-wider font-semibold">
              {isKo ? '검증된 대역 문장쌍 선택:' : 'Select Verified Sentence Pair:'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CURATED_PAIRED_SENTENCES.map((item, idx) => {
                const isSelected = item.id === selectedPairId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedPairId(item.id)}
                    className={`p-4 rounded-xs text-left transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] font-bold shadow-xs'
                        : 'bg-[#FFFFFF] text-[#4A4A47] border-[#DADAD6] hover:border-[#111111] hover:text-[#111111]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                      <span className={isSelected ? 'text-[#FFFFFF] font-bold' : 'text-[#777773]'}>
                        PAIR 0{idx + 1}
                      </span>
                      <span className={isSelected ? 'text-[#DADAD6]' : 'text-[#8A8A85]'}>
                        {item.alphabetCount} vs {item.hangulCount} tok
                      </span>
                    </div>
                    <div className={`font-semibold text-xs line-clamp-1 ${isSelected ? 'text-[#FFFFFF]' : 'text-[#111111]'}`}>
                      {isKo ? item.contextTag.ko : item.contextTag.en}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clean Split Exhibit: Korean vs English with Thin Divider */}
          <div className="pt-6 border-t border-[#DADAD6]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* LEFT: Korean Side (6 cols on lg) */}
              <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#DADAD6] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#111111]"></span>
                      <span className="font-mono font-bold text-sm uppercase tracking-wider text-[#111111]">
                        한국어 (Hangul Script)
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#4A4A47] font-semibold">음절 및 형태소 단위 분절</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#8A8A85] uppercase tracking-widest">
                      INPUT SENTENCE
                    </span>
                    <p className="text-xl sm:text-2xl font-bold text-[#111111] leading-snug">
                      "{selectedPair.hangulText}"
                    </p>
                  </div>

                  {/* Token Chips Representation */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono text-[#777773] uppercase tracking-wider flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-[#111111]" />
                      <span>분절된 서브워드 토큰 ({selectedPair.hangulCount}개):</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5 p-4 bg-[#FFFFFF] border border-[#DADAD6] rounded-xs min-h-[90px] items-center">
                      {selectedPair.hangulTokens.map((tok, idx) => (
                        <span
                          key={`ko-${idx}`}
                          className="inline-flex items-center px-2.5 py-1 rounded-xs bg-[#F1F2F2] text-[#333333] border border-[#DADAD6] hover:bg-[#161616] hover:text-[#FFFFFF] transition-colors text-xs font-mono font-semibold"
                        >
                          {tok}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Korean Token Count Banner */}
                <div className="pt-4 border-t border-[#DADAD6] flex items-baseline justify-between">
                  <span className="text-xs font-mono text-[#777773] uppercase">Hangul Token Count</span>
                  <div className="text-4xl sm:text-5xl font-mono font-black text-[#111111]">
                    {selectedPair.hangulCount}
                    <span className="text-xs font-normal text-[#777773] ml-1.5 font-sans">tokens</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: English Side (6 cols on lg) */}
              <div className="lg:col-span-6 space-y-6 flex flex-col justify-between lg:border-l lg:border-[#DADAD6] lg:pl-12">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#DADAD6] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#777773]"></span>
                      <span className="font-mono font-bold text-sm uppercase tracking-wider text-[#4A4A47]">
                        ENGLISH (Latin Script)
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#8A8A85]">Word / Root Subword Units</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#8A8A85] uppercase tracking-widest">
                      EQUIVALENT SENTENCE
                    </span>
                    <p className="text-xl sm:text-2xl font-medium text-[#4A4A47] leading-snug">
                      "{selectedPair.alphabetText}"
                    </p>
                  </div>

                  {/* Token Chips Representation */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono text-[#777773] uppercase tracking-wider flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-[#777773]" />
                      <span>Segmented Subword Tokens ({selectedPair.alphabetCount} tokens):</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5 p-4 bg-[#FFFFFF] border border-[#DADAD6] rounded-xs min-h-[90px] items-center">
                      {selectedPair.alphabetTokens.map((tok, idx) => (
                        <span
                          key={`en-${idx}`}
                          className="inline-flex items-center px-2.5 py-1 rounded-xs bg-[#F1F2F2] text-[#333333] border border-[#DADAD6] hover:bg-[#161616] hover:text-[#FFFFFF] transition-colors text-xs font-mono font-medium"
                        >
                          {tok}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* English Token Count Banner */}
                <div className="pt-4 border-t border-[#DADAD6] flex items-baseline justify-between">
                  <span className="text-xs font-mono text-[#777773] uppercase">English Token Count</span>
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-[#777773]">
                    {selectedPair.alphabetCount}
                    <span className="text-xs font-normal text-[#8A8A85] ml-1.5 font-sans">tokens</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Observation Bottom Statement */}
            <div className="mt-10 p-5 bg-[#FFFFFF] border border-[#DADAD6] rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#4A4A47]">
                {isKo
                  ? '동일 의미 표현 시 한글 문장이 더 많은 토큰 조각으로 분절되는 현상이 명확히 관측됩니다.'
                  : 'Hangul consistently segments into more subword tokens for equivalent semantic information.'}
              </div>
              <div className="text-xs font-mono text-[#111111] font-bold shrink-0">
                Token Ratio: {selectedPair.tokenPremium.toFixed(2)}× (+{selectedPair.hangulCount - selectedPair.alphabetCount} additional tokens)
              </div>
            </div>

            {/* Figure Caption & Source */}
            <ArticleFigureCaption
              figNum={articleData.figureNumber}
              caption={isKo ? articleData.figureCaption?.ko : articleData.figureCaption?.en}
              source={isKo ? articleData.figureSource?.ko : articleData.figureSource?.en}
            />
          </div>
        </ArticleFullWidthBreak>

        {/* READING COLUMN: Post-Figure Analytical Interpretation */}
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
