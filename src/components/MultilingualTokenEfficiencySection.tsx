import React, { useState } from 'react';
import { UILanguage } from '../types';
import { MULTILINGUAL_COMPARISON_DATA } from '../data/storyData';
import { ARTICLE_CONTENT } from '../data/articleContent';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleSubheading,
  ArticleParagraph,
  ArticleFigureCaption,
  ArticleFinding,
  ArticleFullWidthBreak,
} from './ArticleElements';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ReferenceLine,
} from 'recharts';

interface MultilingualTokenEfficiencySectionProps {
  uiLang: UILanguage;
}

export const MultilingualTokenEfficiencySection: React.FC<MultilingualTokenEfficiencySectionProps> = ({
  uiLang,
}) => {
  const isKo = uiLang === 'ko';
  const articleData = ARTICLE_CONTENT.multilingualBenchmark;
  const [selectedLangId, setSelectedLangId] = useState<string>('ko');

  const chartData = MULTILINGUAL_COMPARISON_DATA.map((item) => ({
    id: item.id,
    nameKo: item.name.ko.split(' ')[0],
    nameEn: item.name.en,
    fullNameKo: item.name.ko,
    fullNameEn: item.name.en,
    scriptTypeKo: item.scriptType.ko,
    scriptTypeEn: item.scriptType.en,
    tokenCount: item.tokenCount,
    relativeRatio: item.relativeRatio,
    differencePercent: item.differencePercent,
    isTargetHangul: !!item.isTargetHangul,
    isBaseline: !!item.isBaseline,
  }));

  const selectedItem =
    MULTILINGUAL_COMPARISON_DATA.find((item) => item.id === selectedLangId) ||
    MULTILINGUAL_COMPARISON_DATA[3];

  return (
    <section id="languages" className="py-20 sm:py-28 bg-[#F7F7F5] text-[#111111] border-b border-[#DADAD6] scroll-mt-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Section Eyebrow & Large Question */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs font-mono text-[#777773] font-bold tracking-widest uppercase">
            {isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
            {isKo ? (
              <>
                언어에 따라

                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  달라지는 토큰 효율

              
                </span>
              </>
            ) : (
              <>
                Not Just a
                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  Korean Problem
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

        {/* FULL-WIDTH BREAKOUT: Asymmetric Layout: Left 35% Narrative & Detail / Right 65% Clean Horizontal Bar Chart */}
        <ArticleFullWidthBreak className="my-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column (4 cols on lg): Narrative & Selected Language Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#FFFFFF] border border-[#DADAD6] rounded-xs p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#DADAD6] pb-3">
                  <span className="text-xs font-mono text-[#111111] font-bold uppercase tracking-wider">
                    LANGUAGE FOCUS
                  </span>
                  <span className="text-xs font-mono text-[#777773]">Selected Metric</span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono text-[#777773]">
                    {isKo ? selectedItem.scriptType.ko : selectedItem.scriptType.en}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#111111]">
                    {isKo ? selectedItem.name.ko : selectedItem.name.en}
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-[#DADAD6] text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-[#DADAD6]/60">
                    <span className="text-[#777773]">Normalized Tokens:</span>
                    <span className="text-[#111111] font-bold">{selectedItem.tokenCount} tokens</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#DADAD6]/60">
                    <span className="text-[#777773]">Relative Ratio:</span>
                    <span className="text-[#111111] font-bold text-sm">
                      {selectedItem.relativeRatio.toFixed(2)}×
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#777773]">Difference vs. English:</span>
                    <span
                      className={`font-bold ${
                        selectedItem.differencePercent > 0 ? 'text-[#111111]' : 'text-[#777773]'
                      }`}
                    >
                      {selectedItem.differencePercent > 0
                        ? `+${selectedItem.differencePercent}%`
                        : 'Baseline (0%)'}
                    </span>
                  </div>
                </div>

                {selectedItem.isTargetHangul && (
                  <div className="p-3 bg-[#F1F2F2] border border-[#111111] rounded-xs text-xs text-[#111111] font-mono">
                    ★ 한국어는 라틴 알파벳(영어/스페인어) 대비 1.78배의 토큰이 소비됩니다.
                  </div>
                )}
              </div>

              {/* Quick Interactive Language Switcher */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#777773] uppercase tracking-wider block">
                  {isKo ? '언어별 즉시 포커스:' : 'Click to inspect language:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {MULTILINGUAL_COMPARISON_DATA.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedLangId(item.id)}
                      className={`px-3 py-1 text-xs font-mono rounded-xs transition-all cursor-pointer border ${
                        selectedLangId === item.id
                          ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] font-bold'
                          : 'bg-[#FFFFFF] text-[#4A4A47] border-[#DADAD6] hover:border-[#111111] hover:text-[#111111]'
                      }`}
                    >
                      {item.name.ko.split(' ')[0]} ({item.relativeRatio.toFixed(2)}×)
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (8 cols on lg): Clean Horizontal Bar Chart */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-[#FFFFFF] border border-[#DADAD6] rounded-xs p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#DADAD6] pb-3">
                  <div>
                    <span className="text-xs font-mono text-[#111111] font-bold uppercase tracking-wider block">
                      NORMALIZED TOKEN CONSUMPTION BY LANGUAGE
                    </span>
                    <span className="text-[11px] font-mono text-[#777773]">
                      기준 영문 100 토큰 대비 정규화 소모량
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#777773]">Flores-200 / o200k_base</span>
                </div>

                {/* Responsive Chart Container */}
                <div className="h-[340px] w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      layout="vertical"
                      margin={{ top: 10, right: 40, left: 60, bottom: 20 }}
                    >
                      <XAxis
                        type="number"
                        domain={[0, 240]}
                        stroke="#DADAD6"
                        tick={{ fill: '#777773', fontSize: 11, fontFamily: 'monospace' }}
                        tickFormatter={(val) => `${val} tok`}
                      />
                      <YAxis
                        type="category"
                        dataKey={isKo ? 'nameKo' : 'nameEn'}
                        stroke="#DADAD6"
                        tick={{ fill: '#111111', fontSize: 12, fontWeight: 600 }}
                        width={70}
                      />
                      <Tooltip
                        cursor={{ fill: 'rgba(0, 0, 0, 0.03)' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-[#FFFFFF] border border-[#111111] p-3 rounded-xs shadow-md text-xs font-mono space-y-1">
                                <div className="font-bold text-[#111111]">
                                  {isKo ? data.fullNameKo : data.fullNameEn}
                                </div>
                                <div className="text-[#777773]">
                                  {isKo ? data.scriptTypeKo : data.scriptTypeEn}
                                </div>
                                <div className="text-[#111111] font-bold text-sm">
                                  {data.tokenCount} Tokens ({data.relativeRatio.toFixed(2)}×)
                                </div>
                                <div className="text-[#4A4A47]">
                                  {data.differencePercent > 0
                                    ? `+${data.differencePercent}% vs English`
                                    : 'Baseline'}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceLine
                        x={100}
                        stroke="#777773"
                        strokeDasharray="3 3"
                        label={{
                          value: 'English Baseline (100 tok)',
                          fill: '#777773',
                          fontSize: 10,
                          position: 'top',
                        }}
                      />
                      <Bar
                        dataKey="tokenCount"
                        radius={[0, 2, 2, 0]}
                        onClick={(data) => setSelectedLangId(data.id)}
                        className="cursor-pointer"
                      >
                        {chartData.map((entry) => (
                          <Cell
                            key={`cell-${entry.id}`}
                            fill={
                              entry.isTargetHangul
                                ? '#161616'
                                : entry.isBaseline
                                ? '#777773'
                                : '#C2C2BD'
                            }
                            stroke={entry.id === selectedLangId ? '#111111' : 'transparent'}
                            strokeWidth={2}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend & Meta Notes */}
                <div className="pt-3 border-t border-[#DADAD6] flex flex-wrap items-center justify-between text-xs font-mono text-[#777773] gap-3">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#777773] rounded-xs inline-block"></span>
                      <span>라틴 알파벳 기준 (1.00×)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#161616] rounded-xs inline-block border border-[#111111]"></span>
                      <span className="text-[#111111] font-bold">한국어 한글 (1.78×)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#C2C2BD] rounded-xs inline-block"></span>
                      <span>기타 다국어 표기 체계</span>
                    </span>
                  </div>
                  <span>데이터: Flores-200</span>
                </div>
              </div>
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
