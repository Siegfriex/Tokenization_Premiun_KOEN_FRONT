import React, { useState } from 'react';
import { useUILanguage } from '../features/change-language';
import { MULTILINGUAL_COMPARISON_DATA } from '../entities/multilingual-token';
import { FLORES_CITATION_DATA, FLORES_CITATION_NOTE } from '../entities/flores-citation';
import { ARTICLE_CONTENT } from '../entities/article-content';
import { chartTokens } from '../shared/config/chart-tokens';
import { Container, SectionHeading, HeadingAccent, SelectableCard } from '../shared/ui';
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
  const [selectedFloresId, setSelectedFloresId] = useState<string>('ko');

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

  const floresChartData = FLORES_CITATION_DATA.map((item) => ({
    id: item.id,
    nameKo: item.name.ko,
    nameEn: item.name.en,
    ratio: item.ratio,
    totalTokens: item.totalTokens,
    isBaseline: !!item.isBaseline,
  }));

  const selectedFloresItem =
    FLORES_CITATION_DATA.find((item) => item.id === selectedFloresId) ||
    FLORES_CITATION_DATA[2];

  return (
    <section id="languages" data-widget="MultilingualTokenEfficiencySection" data-section="languages" className="py-20 sm:py-28 bg-surface-alt text-ink border-b border-rule scroll-mt-16">
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

        {/* READING COLUMN: Pre-Figure Journalism Text — demoted toward caption
            weight (Director redline: chart must win first read). Subheading
            dropped from render (was a second bold heading-weight element
            competing with the H2; entity field kept, per the site's existing
            practice of not deleting unused-but-drafted copy). */}
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

        {/* FULL-WIDTH BREAKOUT: Human Preview 01 S4.5 redesign (2026-08-18) —
            was a two-panel card+chart dashboard (a bordered "language focus"
            stat card beside a separately-bordered chart panel), which failed
            S45-M04 (competing panels, no single main visual). Now one bordered
            exhibit: chart-led, with the selected language's stats folded into
            the panel's own header line instead of a competing side card.
            Same 5 verified entries in MULTILINGUAL_COMPARISON_DATA — no new
            language, ratio, or source added. */}
        <ArticleFullWidthBreak figure className="my-8 space-y-6">
          <div className="bg-surface border-2 border-rule-strong rounded-xs p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-3 border-b border-rule pb-4">
              <div className="flex items-center justify-between gap-4">
                <dt data-source="widget" className="text-xs font-mono text-ink font-bold uppercase tracking-wider">
                  {isKo ? '언어별 정규화 토큰 소비량' : 'NORMALIZED TOKEN CONSUMPTION BY LANGUAGE'}
                </dt>
                <span data-source="widget" className="text-xs font-mono text-ink-muted shrink-0">Flores-200 / o200k_base</span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-[11px] font-mono text-ink-muted">
                  {isKo
                    ? '기준 영문 100 토큰 대비 정규화 소모량'
                    : 'Normalized consumption relative to a 100-token English baseline'}
                </span>
                <span data-role="stat" data-semantic-target="dl" className="text-xs font-mono text-ink">
                  <span className="font-bold">{isKo ? selectedItem.name.ko : selectedItem.name.en}</span>
                  {' · '}
                  {selectedItem.tokenCount}{isKo ? '개 토큰' : ' tokens'}
                  {' · '}
                  <span className="font-bold">{selectedItem.relativeRatio.toFixed(2)}×</span>
                  {selectedItem.differencePercent > 0 && ` (+${selectedItem.differencePercent}%)`}
                </span>
              </div>
            </div>

            {/* Responsive Chart Container — the section's one central visual */}
            <div className="h-[340px] w-full pt-2">
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
                            <div data-source="widget" className="text-ink font-bold text-sm">
                              {isKo
                                ? `토큰 ${data.tokenCount}개 (${data.relativeRatio.toFixed(2)}×)`
                                : `${data.tokenCount} Tokens (${data.relativeRatio.toFixed(2)}×)`}
                            </div>
                            <div data-source="widget" className="text-ink-body">
                              {data.differencePercent > 0
                                ? isKo ? `영어 대비 +${data.differencePercent}%` : `+${data.differencePercent}% vs English`
                                : isKo ? '기준값' : 'Baseline'}
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
                      value: isKo ? '영어 기준선 (100)' : 'English Baseline (100 tok)',
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
                          entry.id === selectedLangId
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

            {/* Language switcher — the chart's own interactive control, not a separate panel */}
            <div className="pt-2 border-t border-rule space-y-2">
              <span data-source="widget" className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block">
                {isKo ? '언어별 즉시 포커스:' : 'Click to inspect language:'}
              </span>
              <ul data-collection="multilingual-comparison" className="flex flex-wrap gap-2">
                {MULTILINGUAL_COMPARISON_DATA.map((item) => (
                  <li key={item.id}>
                  <SelectableCard
                    selected={selectedLangId === item.id}
                    onSelect={() => setSelectedLangId(item.id)}
                    itemId={item.id}
                    boldWhenFilled
                    className="px-3 py-1 text-xs font-mono"
                  >
                    {(isKo ? item.name.ko : item.name.en).split(' ')[0]} ({item.relativeRatio.toFixed(2)}×)
                  </SelectableCard>
                  </li>
                ))}
              </ul>
            </div>

            {selectedItem.isTargetHangul && (
              <div className="p-3 bg-surface-alt border border-rule rounded-xs text-xs text-ink font-mono break-keep">
                {isKo
                  ? '★ 한국어는 라틴 알파벳(영어/스페인어) 대비 1.78배의 토큰이 소비됩니다.'
                  : '★ Korean consumes 1.78× the tokens of Latin-alphabet languages (English/Spanish).'}
              </div>
            )}

            {/* Legend & Meta Notes */}
            <div data-role="legend" className="pt-3 border-t border-rule flex flex-wrap items-center justify-between text-xs font-mono text-ink-muted gap-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-mark-baseline rounded-xs inline-block"></span>
                  <span>{isKo ? '라틴 알파벳 기준 (1.00×)' : 'Latin-alphabet baseline (1.00×)'}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-mark rounded-xs inline-block border border-rule-strong"></span>
                  <span className="text-ink font-bold">
                    {isKo ? selectedItem.name.ko : selectedItem.name.en} ({selectedItem.relativeRatio.toFixed(2)}×)
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-mark-other rounded-xs inline-block"></span>
                  <span data-source="widget">{isKo ? '기타 다국어 표기 체계' : 'Other scripts'}</span>
                </span>
              </div>
              <span data-source="widget">{isKo ? '데이터: Flores-200' : 'Data: Flores-200'}</span>
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

        {/* Human Preview 01 continuation (2026-08-18): Petrov et al. (2023)
            NeurIPS citation comparison — resolves the previously
            BLOCKED_EVIDENCE item (HP01-S45-B02) now that the source paper
            has been located and hashed (see docs/audit/DIRECTOR_DECISIONS.md
            D8, HUMAN_PREVIEW_01_SOURCE_MANIFEST.md). Distinct dataset/
            tokenizer (FLORES-200 / cl100k_base) from this section's own
            chart above (FLORES-200 / o200k_base) — kept structurally
            separate, not merged into the same chart or data array. */}
        <ArticleReadingColumn>
          <ArticleSubheading>
            {isKo ? FLORES_CITATION_NOTE.headline.ko : FLORES_CITATION_NOTE.headline.en}
          </ArticleSubheading>
          <ArticleParagraph>
            {isKo ? FLORES_CITATION_NOTE.intro.ko : FLORES_CITATION_NOTE.intro.en}
          </ArticleParagraph>
          <ArticleParagraph>
            {isKo ? FLORES_CITATION_NOTE.citationIntro.ko : FLORES_CITATION_NOTE.citationIntro.en}
          </ArticleParagraph>
        </ArticleReadingColumn>

        <ArticleFullWidthBreak figure className="my-8 space-y-6">
          <div className="bg-surface border-2 border-rule-strong rounded-xs p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-3 border-b border-rule pb-4">
              <div className="flex items-center justify-between gap-4">
                <dt data-source="widget" className="text-xs font-mono text-ink font-bold uppercase tracking-wider">
                  {isKo ? '선행연구 언어별 토큰화 길이' : 'PRIOR-RESEARCH TOKENIZATION LENGTH BY LANGUAGE'}
                </dt>
                <span data-source="widget" className="text-xs font-mono text-ink-muted shrink-0">Petrov et al. 2023 / cl100k_base</span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-[11px] font-mono text-ink-muted">
                  {isKo ? '영어=1 기준 정규화 비율' : 'Normalized ratio, English = 1'}
                </span>
                <span data-role="stat" data-semantic-target="dl" className="text-xs font-mono text-ink">
                  <span className="font-bold">{isKo ? selectedFloresItem.name.ko : selectedFloresItem.name.en}</span>
                  {' · '}
                  {selectedFloresItem.totalTokens.toLocaleString()}{isKo ? '토큰' : ' tokens'}
                  {' · '}
                  <span className="font-bold">{selectedFloresItem.ratio.toFixed(2)}×</span>
                </span>
              </div>
            </div>

            <div className="h-[280px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={floresChartData}
                  layout="vertical"
                  margin={{ top: 10, right: 40, left: 60, bottom: 20 }}
                >
                  <XAxis
                    type="number"
                    domain={[0, 3.5]}
                    stroke={chartTokens.rule}
                    tick={{ fill: chartTokens.ruleMuted, fontSize: 11, fontFamily: 'monospace' }}
                    tickFormatter={(val) => `${val}×`}
                  />
                  <YAxis
                    type="category"
                    dataKey={isKo ? 'nameKo' : 'nameEn'}
                    stroke={chartTokens.rule}
                    tick={{ fill: chartTokens.selectedOutline, fontSize: 12, fontWeight: 600 }}
                    width={90}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0, 0, 0, 0.03)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-surface border border-rule-strong p-3 rounded-xs shadow-md text-xs font-mono space-y-1">
                            <div className="font-bold text-ink">
                              {isKo ? data.nameKo : data.nameEn}
                            </div>
                            <div data-source="widget" className="text-ink font-bold text-sm">
                              {data.ratio.toFixed(2)}×
                            </div>
                            <div data-source="widget" className="text-ink-body">
                              {data.totalTokens.toLocaleString()}{isKo ? '개 토큰 (전체 코퍼스 합계)' : ' tokens (corpus total)'}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine
                    x={1}
                    stroke={chartTokens.ruleMuted}
                    strokeDasharray="3 3"
                    label={{
                      value: isKo ? '영어 기준선 (1.00×)' : 'English Baseline (1.00×)',
                      fill: chartTokens.ruleMuted,
                      fontSize: 10,
                      position: 'top',
                    }}
                  />
                  <Bar
                    dataKey="ratio"
                    radius={[0, 2, 2, 0]}
                    onClick={(data) => setSelectedFloresId(data.id)}
                    className="cursor-pointer"
                  >
                    {floresChartData.map((entry) => (
                      <Cell
                        key={`flores-cell-${entry.id}`}
                        fill={
                          entry.id === selectedFloresId
                            ? chartTokens.seriesHighlight
                            : entry.isBaseline
                            ? chartTokens.seriesBaseline
                            : chartTokens.seriesOther
                        }
                        stroke={entry.id === selectedFloresId ? chartTokens.selectedOutline : 'transparent'}
                        strokeWidth={2}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-2 border-t border-rule space-y-2">
              <span data-source="widget" className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block">
                {isKo ? '언어별 즉시 포커스:' : 'Click to inspect language:'}
              </span>
              <ul data-collection="flores-citation-languages" className="flex flex-wrap gap-2">
                {FLORES_CITATION_DATA.map((item) => (
                  <li key={item.id}>
                  <SelectableCard
                    selected={selectedFloresId === item.id}
                    onSelect={() => setSelectedFloresId(item.id)}
                    itemId={item.id}
                    boldWhenFilled
                    className="px-3 py-1 text-xs font-mono"
                  >
                    {isKo ? item.name.ko : item.name.en} ({item.ratio.toFixed(2)}×)
                  </SelectableCard>
                  </li>
                ))}
              </ul>
            </div>

            <div data-role="legend" className="pt-3 border-t border-rule flex flex-wrap items-center justify-between text-xs font-mono text-ink-muted gap-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-mark-baseline rounded-xs inline-block"></span>
                  <span>{isKo ? '영어 기준 (1.00×)' : 'English baseline (1.00×)'}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-mark rounded-xs inline-block border border-rule-strong"></span>
                  <span className="text-ink font-bold">
                    {isKo ? selectedFloresItem.name.ko : selectedFloresItem.name.en} ({selectedFloresItem.ratio.toFixed(2)}×)
                  </span>
                </span>
              </div>
              <span data-source="widget">{isKo ? '데이터: Petrov et al. 2023' : 'Data: Petrov et al. 2023'}</span>
            </div>
          </div>

          <ArticleFigureCaption
            figNum={FLORES_CITATION_NOTE.figureNumber}
            caption={isKo ? FLORES_CITATION_NOTE.figureCaption.ko : FLORES_CITATION_NOTE.figureCaption.en}
            source={isKo ? FLORES_CITATION_NOTE.figureSource.ko : FLORES_CITATION_NOTE.figureSource.en}
          />
        </ArticleFullWidthBreak>

        <ArticleReadingColumn>
          <ArticleParagraph>
            {isKo ? FLORES_CITATION_NOTE.cautionText.ko : FLORES_CITATION_NOTE.cautionText.en}
          </ArticleParagraph>
          <ArticleParagraph>
            {isKo ? FLORES_CITATION_NOTE.framingText.ko : FLORES_CITATION_NOTE.framingText.en}
          </ArticleParagraph>

          <ArticleFinding
            label={isKo ? FLORES_CITATION_NOTE.callout.label.ko : FLORES_CITATION_NOTE.callout.label.en}
            statement={isKo ? FLORES_CITATION_NOTE.callout.statement.ko : FLORES_CITATION_NOTE.callout.statement.en}
          />
        </ArticleReadingColumn>
      </Container>
    </section>
  );
};
