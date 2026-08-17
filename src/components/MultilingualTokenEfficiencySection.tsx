import React, { useState } from 'react';
import { useUILanguage } from '../features/change-language';
import { MULTILINGUAL_COMPARISON_DATA } from '../entities/multilingual-token';
import { ARTICLE_CONTENT } from '../entities/article-content';
import { chartTokens } from '../shared/config/chart-tokens';
import { Container, SectionHeading, HeadingAccent, SelectableCard } from '../shared/ui';
import { claimAttrs } from '../shared/trace';
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

export const MultilingualTokenEfficiencySection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
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
    <section id="languages" data-widget="MultilingualTokenEfficiencySection" data-section="languages" className="py-20 sm:py-28 bg-surface-alt text-ink border-b border-rule scroll-mt-12">
      <Container gutter className="space-y-12">
        {/* Section Eyebrow & Large Question */}
        <SectionHeading eyebrow={isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}>
          {isKo ? (
            <>
              언어에 따라
              <br />
              <HeadingAccent>달라지는 토큰 효율</HeadingAccent>
            </>
          ) : (
            <>
              Not Just a
              <br />
              <HeadingAccent>Korean Problem</HeadingAccent>
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

        {/* FULL-WIDTH BREAKOUT: Asymmetric Layout: Left 35% Narrative & Detail / Right 65% Clean Horizontal Bar Chart */}
        <ArticleFullWidthBreak className="my-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column (4 cols on lg): Narrative & Selected Language Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surface border border-rule rounded-xs p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="text-xs font-mono text-ink font-bold uppercase tracking-wider">
                    LANGUAGE FOCUS
                  </span>
                  <span className="text-xs font-mono text-ink-muted">Selected Metric</span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono text-ink-muted">
                    {isKo ? selectedItem.scriptType.ko : selectedItem.scriptType.en}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-ink">
                    {isKo ? selectedItem.name.ko : selectedItem.name.en}
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-rule text-xs font-mono">
                  <div data-role="stat" data-semantic-target="dl" className="flex justify-between py-1 border-b border-rule/60">
                    <span className="text-ink-muted">Normalized Tokens:</span>
                    <span className="text-ink font-bold">{selectedItem.tokenCount} tokens</span>
                  </div>
                  <div data-role="stat" data-semantic-target="dl" className="flex justify-between py-1 border-b border-rule/60">
                    <span className="text-ink-muted">Relative Ratio:</span>
                    <span className="text-ink font-bold text-sm">
                      {selectedItem.relativeRatio.toFixed(2)}×
                    </span>
                  </div>
                  <div data-role="stat" data-semantic-target="dl" className="flex justify-between py-1">
                    <span className="text-ink-muted">Difference vs. English:</span>
                    <span
                      {...claimAttrs('lang.baseline-difference-label')}
                      className={`font-bold ${
                        selectedItem.differencePercent > 0 ? 'text-ink' : 'text-ink-muted'
                      }`}
                    >
                      {selectedItem.differencePercent > 0
                        ? `+${selectedItem.differencePercent}%`
                        : 'Baseline (0%)'}
                    </span>
                  </div>
                </div>

                {selectedItem.isTargetHangul && (
                  <div {...claimAttrs('lang.hangul-ratio-callout')} className="p-3 bg-surface-alt border border-rule-strong rounded-xs text-xs text-ink font-mono">
                    ★ 한국어는 라틴 알파벳(영어/스페인어) 대비 1.78배의 토큰이 소비됩니다.
                  </div>
                )}
              </div>

              {/* Quick Interactive Language Switcher */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block">
                  {isKo ? '언어별 즉시 포커스:' : 'Click to inspect language:'}
                </span>
                <div data-collection="multilingual-comparison" data-semantic-target="ul" className="flex flex-wrap gap-2">
                  {MULTILINGUAL_COMPARISON_DATA.map((item) => (
                    <SelectableCard
                      key={item.id}
                      selected={selectedLangId === item.id}
                      onSelect={() => setSelectedLangId(item.id)}
                      itemId={item.id}
                      boldWhenFilled
                      className="px-3 py-1 text-xs font-mono"
                    >
                      {item.name.ko.split(' ')[0]} ({item.relativeRatio.toFixed(2)}×)
                    </SelectableCard>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (8 cols on lg): Clean Horizontal Bar Chart */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-surface border border-rule rounded-xs p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <div>
                    <span className="text-xs font-mono text-ink font-bold uppercase tracking-wider block">
                      NORMALIZED TOKEN CONSUMPTION BY LANGUAGE
                    </span>
                    <span {...claimAttrs('lang.normalization-base')} className="text-[11px] font-mono text-ink-muted">
                      기준 영문 100 토큰 대비 정규화 소모량
                    </span>
                  </div>
                  <span className="text-xs font-mono text-ink-muted">Flores-200 / o200k_base</span>
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
                        stroke={chartTokens.rule}
                        tick={{ fill: chartTokens.ruleMuted, fontSize: 11, fontFamily: 'monospace' }}
                        tickFormatter={(val) => `${val} tok`}
                      />
                      <YAxis
                        type="category"
                        dataKey={isKo ? 'nameKo' : 'nameEn'}
                        stroke={chartTokens.rule}
                        tick={{ fill: chartTokens.selectedOutline, fontSize: 12, fontWeight: 600 }}
                        width={70}
                      />
                      <Tooltip
                        cursor={{ fill: 'rgba(0, 0, 0, 0.03)' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-surface border border-rule-strong p-3 rounded-xs shadow-md text-xs font-mono space-y-1">
                                <div className="font-bold text-ink">
                                  {isKo ? data.fullNameKo : data.fullNameEn}
                                </div>
                                <div className="text-ink-muted">
                                  {isKo ? data.scriptTypeKo : data.scriptTypeEn}
                                </div>
                                <div className="text-ink font-bold text-sm">
                                  {data.tokenCount} Tokens ({data.relativeRatio.toFixed(2)}×)
                                </div>
                                <div className="text-ink-body">
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
                        stroke={chartTokens.ruleMuted}
                        strokeDasharray="3 3"
                        label={{
                          value: 'English Baseline (100 tok)',
                          fill: chartTokens.ruleMuted,
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
                                ? chartTokens.seriesHighlight
                                : entry.isBaseline
                                ? chartTokens.seriesBaseline
                                : chartTokens.seriesOther
                            }
                            stroke={entry.id === selectedLangId ? chartTokens.selectedOutline : 'transparent'}
                            strokeWidth={2}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend & Meta Notes */}
                <div data-role="legend" className="pt-3 border-t border-rule flex flex-wrap items-center justify-between text-xs font-mono text-ink-muted gap-3">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-mark-baseline rounded-xs inline-block"></span>
                      <span {...claimAttrs('lang.legend-latin-baseline')}>라틴 알파벳 기준 (1.00×)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-mark rounded-xs inline-block border border-rule-strong"></span>
                      <span {...claimAttrs('lang.legend-hangul-ratio')} className="text-ink font-bold">한국어 한글 (1.78×)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-mark-other rounded-xs inline-block"></span>
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
      </Container>
    </section>
  );
};
