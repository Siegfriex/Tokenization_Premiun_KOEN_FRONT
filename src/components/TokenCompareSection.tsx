import React, { useState } from 'react';
import { useUILanguage } from '../features/change-language';
import { CURATED_PAIRED_SENTENCES } from '../entities/sentence-pair';
import { ARTICLE_CONTENT } from '../entities/article-content';
import { Hash } from 'lucide-react';
import {
  Container,
  SectionHeading,
  HeadingAccent,
  SelectableCard,
  TokenChip,
} from '../shared/ui';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleParagraph,
  ArticleFigureCaption,
  ArticleFullWidthBreak,
} from './ArticleElements';

export const TokenCompareSection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
  const articleData = ARTICLE_CONTENT.realSentences;
  const [selectedPairId, setSelectedPairId] = useState<string>(CURATED_PAIRED_SENTENCES[0].id);

  const selectedPair =
    CURATED_PAIRED_SENTENCES.find((p) => p.id === selectedPairId) || CURATED_PAIRED_SENTENCES[0];

  return (
    <section id="compare" data-widget="TokenCompareSection" data-section="compare" className="py-20 sm:py-28 bg-surface-alt text-ink border-b border-rule scroll-mt-16">
      <Container gutter className="space-y-12">
        {/* Section Eyebrow & Large Question */}
        <SectionHeading eyebrow={isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}>
          {isKo ? (
            <>
              통계보다 직관적인,
              <br />
              <HeadingAccent>실제 문장으로 알아보자</HeadingAccent>
            </>
          ) : (
            <>
              Beyond Abstract Statistics:
              <br />
              <HeadingAccent>Examining Real Sentence Pairs</HeadingAccent>
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

        {/* FULL-WIDTH BREAKOUT: Interactive Token Compare Lab */}
        <ArticleFullWidthBreak figure className="space-y-8 my-8">
          {/* Minimal Paired Sentence Selector Bar */}
          <div className="space-y-3">
            <div data-source="widget" className="text-xs font-mono text-ink-muted uppercase tracking-wider font-semibold">
              {isKo ? '의미가 대응되는 문장쌍 고르기' : 'Pick a meaning-matched pair'}
            </div>

            <ul data-collection="sentence-pairs" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CURATED_PAIRED_SENTENCES.map((item, idx) => {
                const isSelected = item.id === selectedPairId;
                return (
                  <li key={item.id} className="h-full">
                  <SelectableCard
                    selected={isSelected}
                    onSelect={() => setSelectedPairId(item.id)}
                    itemId={item.id}
                    boldWhenFilled
                    className="p-4 text-left w-full h-full"
                  >
                    <span data-role="stat" data-semantic-target="dl" className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                      <span data-source="widget" className={isSelected ? 'text-on-accent font-bold' : 'text-ink-muted'}>
                        PAIR 0{idx + 1}
                      </span>
                      <span data-source="widget" className={isSelected ? 'text-on-accent-muted' : 'text-ink-subtle'}>
                        {item.alphabetCount} vs {item.hangulCount} tok
                      </span>
                    </span>
                    <span
                      className={`block font-semibold text-xs line-clamp-1 ${
                        isSelected ? 'text-on-accent' : 'text-ink'
                      }`}
                    >
                      {isKo ? item.contextTag.ko : item.contextTag.en}
                    </span>
                  </SelectableCard>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Clean Split Exhibit: Korean vs English with Thin Divider */}
          <div className="pt-6 border-t border-rule">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* LEFT: Korean Side (6 cols on lg) */}
              <div data-role="stat" data-semantic-target="dl" className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                <div className="space-y-5">
                  <div data-role="stat" data-semantic-target="dl" className="flex items-center justify-between border-b border-rule pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent"></span>
                      <span data-source="widget" className="font-mono font-bold text-sm uppercase tracking-wider text-ink">
                        {isKo ? '한국어' : 'Korean (Hangul Script)'}
                      </span>
                    </div>
                    <span data-source="widget" className="text-xs font-mono text-ink-body font-semibold">음절 및 형태소 단위 분절</span>
                  </div>

                  <div data-role="stat" data-semantic-target="dl" className="space-y-1">
                    <span data-source="widget" className="text-[10px] font-mono text-ink-subtle uppercase tracking-widest">
                      INPUT SENTENCE
                    </span>
                    <p className="text-xl sm:text-2xl font-bold text-ink leading-snug">
                      "{selectedPair.hangulText}"
                    </p>
                  </div>

                  {/* Token Chips Representation */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-ink" />
                      <span data-source="widget">분절된 서브워드 토큰 ({selectedPair.hangulCount}개):</span>
                    </span>
                    <ul data-collection="hangul-tokens" className="flex flex-wrap gap-1.5 p-4 bg-surface border border-rule rounded-xs min-h-[90px] items-center">
                      {selectedPair.hangulTokens.map((tok, idx) => (
                        <li key={`ko-${idx}`}>
                          <TokenChip lang="ko">{tok}</TokenChip>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Korean Token Count Banner */}
                <div data-role="stat" data-semantic-target="dl" className="pt-4 border-t border-rule flex items-baseline justify-between">
                  <span data-source="widget" className="text-xs font-mono text-ink-muted uppercase">Hangul Token Count</span>
                  <div className="text-4xl sm:text-5xl font-mono font-black text-ink">
                    {selectedPair.hangulCount}
                    <span data-source="widget" className="text-xs font-normal text-ink-muted ml-1.5 font-sans">tokens</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: English Side (6 cols on lg) */}
              <div data-role="stat" data-semantic-target="dl" className="lg:col-span-6 space-y-6 flex flex-col justify-between lg:border-l lg:border-rule lg:pl-12">
                <div className="space-y-5">
                  <div data-role="stat" data-semantic-target="dl" className="flex items-center justify-between border-b border-rule pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-mark-baseline"></span>
                      <span data-source="widget" className="font-mono font-bold text-sm uppercase tracking-wider text-ink-body">
                        {isKo ? '영어' : 'English (Latin Script)'}
                      </span>
                    </div>
                    <span data-source="widget" className="text-xs font-mono text-ink-subtle">Word / Root Subword Units</span>
                  </div>

                  <div data-role="stat" data-semantic-target="dl" className="space-y-1">
                    <span data-source="widget" className="text-[10px] font-mono text-ink-subtle uppercase tracking-widest">
                      EQUIVALENT SENTENCE
                    </span>
                    <p className="text-xl sm:text-2xl font-medium text-ink-body leading-snug">
                      "{selectedPair.alphabetText}"
                    </p>
                  </div>

                  {/* Token Chips Representation */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-ink-muted" />
                      <span data-source="widget">Segmented Subword Tokens ({selectedPair.alphabetCount} tokens):</span>
                    </span>
                    <ul data-collection="alphabet-tokens" className="flex flex-wrap gap-1.5 p-4 bg-surface border border-rule rounded-xs min-h-[90px] items-center">
                      {selectedPair.alphabetTokens.map((tok, idx) => (
                        <li key={`en-${idx}`}>
                          <TokenChip lang="en">{tok}</TokenChip>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* English Token Count Banner */}
                <div data-role="stat" data-semantic-target="dl" className="pt-4 border-t border-rule flex items-baseline justify-between">
                  <span data-source="widget" className="text-xs font-mono text-ink-muted uppercase">English Token Count</span>
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-ink-muted">
                    {selectedPair.alphabetCount}
                    <span data-source="widget" className="text-xs font-normal text-ink-subtle ml-1.5 font-sans">tokens</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Observation Bottom Statement */}
            <div data-role="stat" data-semantic-target="dl" className="mt-10 p-5 bg-surface border border-rule rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div data-source="widget" className="text-xs font-mono text-ink-body">
                {isKo
                  ? '이 네 문장쌍에서는 한국어 쪽 조각이 더 많다. 383만 쌍 전체로 넓히면 열에 아홉 꼴이고, 나머지는 더 적거나 같았다.'
                  : 'In these four pairs the Korean side has more pieces. Across all 3.84 million, it is about nine in ten — the rest used fewer or came out even.'}
              </div>
              <div data-source="widget" className="text-xs font-mono text-ink font-bold shrink-0">
                {isKo
                  ? `토큰 비율 ${selectedPair.tokenPremium.toFixed(2)}× (+${selectedPair.hangulCount - selectedPair.alphabetCount}개 토큰)`
                  : `Token Ratio: ${selectedPair.tokenPremium.toFixed(2)}× (+${selectedPair.hangulCount - selectedPair.alphabetCount} additional tokens)`}
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
        </ArticleReadingColumn>
      </Container>
    </section>
  );
};
