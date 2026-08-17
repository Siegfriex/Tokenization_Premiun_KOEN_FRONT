import React, { useState } from 'react';
import { UILanguage, MultilingualTokenItem } from '../types';
import { MULTILINGUAL_COMPARISON_DATA } from '../data/storyData';
import { Globe, ArrowRight, ArrowDown, Info, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

interface MultilingualSectionProps {
  uiLang: UILanguage;
}

export const MultilingualSection: React.FC<MultilingualSectionProps> = ({ uiLang }) => {
  const isKo = uiLang === 'ko';
  const [activeStep, setActiveStep] = useState<number>(3); // 1: Baseline, 2: Measured Differences, 3: Focus on Hangul
  const [hoveredLangId, setHoveredLangId] = useState<string | null>(null);

  const hoveredItem =
    MULTILINGUAL_COMPARISON_DATA.find((item) => item.id === hoveredLangId) || null;

  // Max ratio in data is 2.05, let max scale be 2.4 for comfortable bar rendering
  const maxScale = 2.3;

  return (
    <section
      id="sec-0-5"
      className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="border-b border-slate-200 pb-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-mono font-bold tracking-wider uppercase">
            <Globe className="w-3.5 h-3.5" />
            <span>S0.5. GLOBAL MULTILINGUAL TOKEN EFFICIENCY</span>
          </div>

          <h2 className="font-serif-journal text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-tight">
            {isKo
              ? '같은 의미, 언어가 달라지면 AI가 읽는 길이도 달라질까?'
              : 'When the Meaning Is the Same, Does AI Read Different Languages at Different Lengths?'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            {isKo
              ? '같거나 유사한 의미를 표현하더라도 tokenizer가 언어를 처리하는 방식에 따라 필요한 token 수는 달라질 수 있습니다.'
              : 'Even when expressing identical or equivalent information, the required number of tokens can vary depending on how the tokenizer processes each language.'}
          </p>
        </div>

        {/* Narrative Step Navigator / Progressive Scrollytelling Controls */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              {isKo ? '단계별 시각화 탐색 (Scrollytelling Stages):' : 'Progressive Explanatory Stages:'}
            </span>
            <span>o200k_base Tokenizer Benchmark</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            {/* Step 1 */}
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                activeStep === 1
                  ? 'bg-blue-900 text-white border-blue-900 shadow-sm ring-2 ring-blue-500/20 font-medium'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span className={activeStep === 1 ? 'text-blue-300 font-bold' : 'text-blue-600 font-semibold'}>
                  STAGE 01
                </span>
                <span className={activeStep === 1 ? 'text-slate-300' : 'text-slate-500'}>Baseline</span>
              </div>
              <div className="text-xs font-medium leading-snug line-clamp-2">
                {isKo ? 'AI가 모든 언어를 같은 길이로 읽는 것은 아닙니다.' : 'AI does not process all languages at the same length.'}
              </div>
            </button>

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                activeStep === 2
                  ? 'bg-blue-900 text-white border-blue-900 shadow-sm ring-2 ring-blue-500/20 font-medium'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span className={activeStep === 2 ? 'text-blue-300 font-bold' : 'text-blue-600 font-semibold'}>
                  STAGE 02
                </span>
                <span className={activeStep === 2 ? 'text-slate-300' : 'text-slate-500'}>Differences</span>
              </div>
              <div className="text-xs font-medium leading-snug line-clamp-2">
                {isKo ? '같은 정보를 표현하더라도 필요한 token 수에 차이가 나타납니다.' : 'Differences emerge in token requirements for identical information.'}
              </div>
            </button>

            {/* Step 3 */}
            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                activeStep === 3
                  ? 'bg-[#0B1F3A] text-white border-amber-400 shadow-md ring-2 ring-amber-400/30 font-medium'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span className={activeStep === 3 ? 'text-amber-300 font-bold' : 'text-amber-600 font-semibold'}>
                  STAGE 03 ★
                </span>
                <span className={activeStep === 3 ? 'text-slate-300' : 'text-slate-500'}>Hangul Focus</span>
              </div>
              <div className="text-xs font-medium leading-snug line-clamp-2">
                {isKo ? '그렇다면 한글에서는 이 차이가 어떻게 나타날까?' : 'How does this token disparity manifest in Hangul?'}
              </div>
            </button>
          </div>
        </div>

        {/* Multilingual Horizontal Bar Chart Container */}
        <div className="bg-[#0B1F3A] text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 space-y-8">
          {/* Chart Header & Baseline Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                RELATIVE TOKEN REQUIREMENT ACROSS LANGUAGES
              </span>
              <h3 className="font-serif-journal text-lg sm:text-xl font-bold text-slate-100">
                {isKo ? '동일 의미 정보 표현 시 상대적 토큰 요구량 비교' : 'Relative Token Burden for Equivalent Semantic Information'}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                <span>Reference Baseline: English = 1.00</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/70 border border-amber-500/50 rounded text-amber-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Focus: Korean (Hangul)</span>
              </div>
            </div>
          </div>

          {/* Accessible Table for Screen Readers */}
          <div className="sr-only">
            <table>
              <caption>Multilingual Token Efficiency Benchmark (o200k_base Tokenizer)</caption>
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Script System</th>
                  <th>Relative Ratio</th>
                  <th>Difference from Baseline</th>
                  <th>Measured Tokens per 100 Baseline</th>
                </tr>
              </thead>
              <tbody>
                {MULTILINGUAL_COMPARISON_DATA.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name.en}</td>
                    <td>{item.scriptType.en}</td>
                    <td>{item.relativeRatio.toFixed(2)}x</td>
                    <td>+{item.differencePercent}%</td>
                    <td>{item.tokenCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visual Chart Canvas */}
          <div className="space-y-4">
            {/* Axis Reference Markers */}
            <div className="relative h-6 text-[11px] font-mono text-slate-400 border-b border-slate-700 flex items-center">
              <div className="w-36 sm:w-44 shrink-0 text-slate-500 uppercase tracking-wider text-[10px]">
                Language / Script
              </div>
              <div className="flex-1 relative h-full">
                {/* 1.0 Baseline Mark */}
                <div
                  className="absolute top-0 bottom-0 flex flex-col items-center -translate-x-1/2"
                  style={{ left: `${(1.0 / maxScale) * 100}%` }}
                >
                  <span className="text-blue-400 font-bold">1.0× (Baseline)</span>
                </div>
                {/* 1.5x Mark */}
                <div
                  className="hidden sm:flex absolute top-0 bottom-0 flex flex-col items-center -translate-x-1/2"
                  style={{ left: `${(1.5 / maxScale) * 100}%` }}
                >
                  <span className="text-slate-500">1.5×</span>
                </div>
                {/* 2.0x Mark */}
                <div
                  className="absolute top-0 bottom-0 flex flex-col items-center -translate-x-1/2"
                  style={{ left: `${(2.0 / maxScale) * 100}%` }}
                >
                  <span className="text-slate-400">2.0×</span>
                </div>
              </div>
            </div>

            {/* Language Bars */}
            <div className="space-y-3.5 relative">
              {/* Vertical Reference Line at 1.0 */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-blue-500/50 border-l border-dashed border-blue-400 z-10 pointer-events-none"
                style={{ left: `calc(9rem + ${(1.0 / maxScale) * 100}% * (1 - 9rem / 100%))` }}
              />

              {MULTILINGUAL_COMPARISON_DATA.map((item) => {
                const isHangul = item.isTargetHangul;
                const isBaseline = item.isBaseline;
                const isHovered = hoveredLangId === item.id;

                // Value to display depending on step
                const currentRatio =
                  activeStep === 1 ? 1.0 : item.relativeRatio;
                const barWidthPercent = (currentRatio / maxScale) * 100;

                // Styling logic for steps
                const isFaded = activeStep === 3 && !isHangul;
                const isEmphasized = activeStep === 3 && isHangul;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredLangId(item.id)}
                    onMouseLeave={() => setHoveredLangId(null)}
                    className={`group relative p-2.5 sm:p-3 rounded-xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 ${
                      isEmphasized
                        ? 'bg-amber-950/40 border-2 border-amber-400 shadow-md ring-2 ring-amber-400/20'
                        : isHovered
                        ? 'bg-slate-800/90 border border-slate-600'
                        : 'bg-slate-900/60 border border-slate-800/80'
                    } ${isFaded ? 'opacity-60' : 'opacity-100'}`}
                  >
                    {/* Left Language Label */}
                    <div className="w-36 sm:w-44 shrink-0 flex flex-col">
                      <div className="flex items-center gap-1.5">
                        {isHangul && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        )}
                        {isBaseline && (
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        )}
                        <span
                          className={`font-mono text-xs sm:text-sm font-bold truncate ${
                            isHangul
                              ? 'text-amber-300 font-bold'
                              : isBaseline
                              ? 'text-blue-300'
                              : 'text-slate-200'
                          }`}
                        >
                          {isKo ? item.name.ko : item.name.en}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 truncate">
                        {isKo ? item.scriptType.ko : item.scriptType.en}
                      </span>
                    </div>

                    {/* Horizontal Bar Chart Track */}
                    <div className="flex-1 relative flex items-center h-8 bg-slate-950/80 rounded-lg p-1 border border-slate-800 overflow-hidden">
                      {/* Vertical Grid Line at 1.0 inside track */}
                      <div
                        className="absolute top-0 bottom-0 w-px bg-blue-500/40 z-0"
                        style={{ left: `${(1.0 / maxScale) * 100}%` }}
                      />

                      {/* Bar Fill */}
                      <div
                        className={`h-full rounded-md transition-all duration-700 flex items-center justify-end px-2.5 font-mono text-xs font-bold relative z-10 ${
                          isHangul
                            ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-slate-950 shadow-sm'
                            : isBaseline
                            ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
                            : 'bg-gradient-to-r from-slate-700 to-slate-500 text-slate-100'
                        }`}
                        style={{ width: `${barWidthPercent}%` }}
                      >
                        <span className="whitespace-nowrap">
                          {currentRatio.toFixed(2)}×
                        </span>
                      </div>
                    </div>

                    {/* Right Metric Tag */}
                    <div className="sm:w-28 shrink-0 text-right font-mono text-xs flex sm:flex-col justify-between items-center sm:items-end">
                      <span
                        className={`font-bold ${
                          isHangul
                            ? 'text-amber-300'
                            : isBaseline
                            ? 'text-blue-300'
                            : 'text-slate-300'
                        }`}
                      >
                        {isBaseline
                          ? isKo ? '기준 (1.00×)' : 'Ref (1.00×)'
                          : activeStep === 1
                          ? '1.00×'
                          : `+${item.differencePercent}% tokens`}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {activeStep === 1 ? '100 tok' : `${item.tokenCount} tok / 100`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Inspection Detail Card */}
          {hoveredItem ? (
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono animate-fadeIn">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold uppercase">
                    {isKo ? hoveredItem.name.ko : hoveredItem.name.en}
                  </span>
                  <span className="text-slate-400">({isKo ? hoveredItem.scriptType.ko : hoveredItem.scriptType.en})</span>
                </div>
                <div className="text-slate-300">
                  {isKo
                    ? `동일 의미 벤치마크 텍스트를 기준으로 영어(1.00×) 대비 ${hoveredItem.relativeRatio.toFixed(2)}배(+${hoveredItem.differencePercent}%)의 토큰이 소요됩니다.`
                    : `Requires ${hoveredItem.relativeRatio.toFixed(2)}× (+${hoveredItem.differencePercent}%) tokens relative to the English baseline for equivalent semantic content.`}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 shrink-0 space-y-0.5 sm:text-right">
                <div>Sample: {hoveredItem.sampleCount.toLocaleString()} parallel sentences</div>
                <div>Tokenizer: {hoveredItem.tokenizerId}</div>
                <div>Dataset: {hoveredItem.sourceDataset}</div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-slate-900/40 rounded-xl border border-dashed border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>※ 각 언어 바(Bar) 위에 마우스를 올리거나 탭하면 세부 검증 파라미터(표본 수, 토크나이저)를 확인할 수 있습니다.</span>
              <span className="hidden sm:inline text-slate-500">Benchmark: o200k_base</span>
            </div>
          )}

          {/* Strict Neutral Interpretation Note */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-blue-400 font-mono font-bold uppercase tracking-wider text-[11px]">
              <Info className="w-4 h-4 text-blue-400" />
              <span>{isKo ? '학술적 해석 원칙 (Scientific Interpretation Principle)' : 'Interpretation Principle'}</span>
            </div>
            <p className="leading-relaxed font-sans text-slate-300">
              {isKo ? (
                <>
                  본 차트는 언어의 우열이나 정보 전달의 가치를 비교하는 것이 아닙니다.{' '}
                  <strong className="text-white font-semibold">
                    단지 테스트된 토크나이저(o200k_base)와 서브워드 어휘집 구조 하에서 각 언어 표기 체계가 갖는 표현 효율성(Representation Efficiency)의 차이
                  </strong>
                  만을 엄밀하게 측정한 결과입니다.
                </>
              ) : (
                <>
                  This chart measures <strong>tokenization and representation efficiency under the tested tokenizer</strong>, not linguistic superiority or reasoning hierarchy.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Narrative Conceptual Bridge to Hangul Investigation */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-amber-50/50 border border-blue-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest block">
                NARRATIVE BRIDGE / 문제의 확장과 한글에 대한 초점
              </span>
              <blockquote className="font-serif-journal text-lg sm:text-xl font-bold text-[#0B1F3A] leading-snug">
                {isKo ? (
                  <>
                    “언어별로 token representation efficiency에 차이가 존재한다면,{' '}
                    <span className="text-blue-700 underline decoration-amber-400 underline-offset-4">
                      같은 의미를 표현하는 한글과 알파벳 기반 문장 사이에서도 이러한 차이가 나타날 수 있습니다.
                    </span>
                    ”
                  </>
                ) : (
                  <>
                    “If token representation efficiency varies across languages, similar discrepancies can occur between Hangul and alphabet-based sentences expressing identical information.”
                  </>
                )}
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                {isKo
                  ? '글로벌 언어 간에 확인된 표현 차이가 실제 우리가 일상에서 마주하는 한글과 영문 문장에서 구체적으로 어떻게 분절되는지, 5단계 AI 처리 파이프라인과 대역 문장 비교를 통해 확인해 봅니다.'
                  : 'Let us examine how these tokenization differences unfold in specific Hangul and English sentence pairs through the 5-stage generative AI pipeline.'}
              </p>
            </div>

            {/* Scroll Down CTA Button */}
            <div className="shrink-0 w-full md:w-auto">
              <a
                href="#sec-1"
                className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 bg-[#0B1F3A] text-white hover:bg-blue-900 rounded-xl font-mono text-xs font-bold transition-all shadow-md group cursor-pointer border border-slate-700"
              >
                <span>{isKo ? '한글과 알파벳을 직접 비교해보기' : 'Compare Hangul vs. Alphabet Directly'}</span>
                <ArrowDown className="w-4 h-4 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
