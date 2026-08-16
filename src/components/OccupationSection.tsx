import React, { useState } from 'react';
import { UILanguage } from '../types';
import { OCCUPATION_COMPARISON_DATA } from '../data/storyData';
import { ARTICLE_CONTENT } from '../data/articleContent';
import { Code, BookOpen } from 'lucide-react';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleSubheading,
  ArticleParagraph,
  ArticleFigureCaption,
  ArticleFinding,
  ArticleFullWidthBreak,
} from './ArticleElements';

interface OccupationSectionProps {
  uiLang: UILanguage;
}

export const OccupationSection: React.FC<OccupationSectionProps> = ({ uiLang }) => {
  const isKo = uiLang === 'ko';
  const articleData = ARTICLE_CONTENT.accumulatedBurden;
  const [promptCount, setPromptCount] = useState<number>(100);

  const baseEnPerPrompt = 24; // baseline tokens
  const baseKoPerPrompt = 31; // 1.29x~1.70x baseline
  const tokenGapPerPrompt = baseKoPerPrompt - baseEnPerPrompt; // 7 tokens gap

  const totalEn = baseEnPerPrompt * promptCount;
  const totalKo = baseKoPerPrompt * promptCount;
  const totalGap = tokenGapPerPrompt * promptCount;

  const engineeringData = OCCUPATION_COMPARISON_DATA.find((d) => d.id === 'engineering')!;
  const socialScienceData = OCCUPATION_COMPARISON_DATA.find((d) => d.id === 'social-science')!;

  return (
    <section id="burden" className="py-20 sm:py-28 bg-[#FFFFFF] text-[#111111] border-b border-[#DADAD6] scroll-mt-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Section Eyebrow & Large Question */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs font-mono text-[#777773] font-bold tracking-widest uppercase">
            {isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
            {isKo ? (
              <>
                그래서 이 차이는
                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  얼마나 누적될까?
                </span>
              </>
            ) : (
              <>
                How Does This Discrepancy
                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  Compound Over Time?
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

        {/* FULL-WIDTH BREAKOUT: Interactive Simulator & Occupational Exposure */}
        <ArticleFullWidthBreak className="space-y-12 my-8">
          {/* Interactive Repetition Multiplier & Oversized Number Display */}
          <div className="bg-[#F7F7F5] border border-[#DADAD6] rounded-xs p-6 sm:p-10 space-y-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DADAD6] pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#111111] font-bold uppercase tracking-wider block">
                  WORKFLOW REPETITION SIMULATOR
                </span>
                <span className="text-xs text-[#777773] font-mono">
                  프롬프트 및 컨텍스트 누적 시뮬레이션
                </span>
              </div>
              {/* Quick preset buttons */}
              <div className="flex items-center gap-2">
                {[10, 50, 100, 500, 1000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setPromptCount(preset)}
                    className={`px-3 py-1 text-xs font-mono rounded-xs transition-colors cursor-pointer border ${
                      promptCount === preset
                        ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] font-bold'
                        : 'bg-[#FFFFFF] text-[#4A4A47] hover:border-[#111111] hover:text-[#111111] border-[#DADAD6]'
                    }`}
                  >
                    {preset.toLocaleString()}×
                  </button>
                ))}
              </div>
            </div>

            {/* Slider input */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#4A4A47] font-semibold">반복 횟수 (Prompt Iterations):</span>
                <span className="text-[#111111] font-bold text-sm font-mono">
                  {promptCount.toLocaleString()} 회 호출
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="2000"
                step="1"
                value={promptCount}
                onChange={(e) => setPromptCount(Number(e.target.value))}
                className="w-full h-2 bg-[#DADAD6] rounded-xs appearance-none cursor-pointer accent-[#111111]"
              />
              <div className="flex justify-between text-[11px] font-mono text-[#777773]">
                <span>1회 (단일 프롬프트)</span>
                <span>1,000회 (팀 일간 워크플로우)</span>
                <span>2,000회 (전사 에이전트 루틴)</span>
              </div>
            </div>

            {/* Oversized Cumulative Result Display & Token Receipt Block */}
            <div className="pt-4 border-t border-[#DADAD6] space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#777773] uppercase">English Baseline Tokens</span>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-[#777773]">
                    {totalEn.toLocaleString()}
                    <span className="text-xs font-normal text-[#8A8A85] ml-1.5 font-sans">tok</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#777773] uppercase">Hangul Cumulative Tokens</span>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-[#111111]">
                    {totalKo.toLocaleString()}
                    <span className="text-xs font-normal text-[#777773] ml-1.5 font-sans">tok</span>
                  </div>
                </div>

                <div className="space-y-1 md:border-l md:border-[#DADAD6] md:pl-6">
                  <span className="text-xs font-mono text-[#111111] uppercase font-bold tracking-wider">
                    ACCUMULATED BURDEN GAP
                  </span>
                  <div className="text-4xl sm:text-5xl font-mono font-black text-[#111111]">
                    +{totalGap.toLocaleString()}
                    <span className="text-xs font-normal text-[#777773] ml-1.5 font-sans">tokens</span>
                  </div>
                </div>
              </div>

              {/* Minimalist Editorial Token Receipt */}
              <div className="p-5 bg-[#FFFFFF] border border-[#DADAD6] rounded-xs font-mono text-xs max-w-lg mx-auto md:mx-0 space-y-3">
                <div className="flex items-center justify-between border-b border-dashed border-[#DADAD6] pb-2 text-[11px]">
                  <span className="font-bold text-[#111111] tracking-wider uppercase">
                    TOKEN RECEIPT (토큰 사용 명세서)
                  </span>
                  <span className="text-[#777773]">{promptCount.toLocaleString()} ITERATIONS</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#4A4A47]">KOREAN ({promptCount}회)</span>
                    <span className="font-bold text-[#111111]">{totalKo.toLocaleString()} TOKENS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777773]">ENGLISH ({promptCount}회)</span>
                    <span className="text-[#777773]">{totalEn.toLocaleString()} TOKENS</span>
                  </div>
                </div>
                <div className="border-t border-[#111111] pt-2 flex justify-between font-bold text-sm text-[#111111]">
                  <span>ABSOLUTE GAP (순수 격차)</span>
                  <span>+{totalGap.toLocaleString()} TOKENS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Occupational Cluster Analysis */}
          <div className="space-y-8">
            <div className="border-b border-[#DADAD6] pb-3 flex items-center justify-between">
              <span className="text-xs font-mono text-[#111111] font-bold uppercase tracking-wider">
                OCCUPATIONAL SENSITIVITY COMPARISON
              </span>
              <span className="text-xs font-mono text-[#777773]">AI Exposure vs. Language Intensity</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cluster 1: Engineering / Technical */}
              <div className="bg-[#F7F7F5] border border-[#DADAD6] rounded-xs p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#DADAD6] pb-3">
                    <div className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-[#4A4A47]" />
                      <h3 className="font-bold text-lg text-[#111111]">
                        {isKo ? engineeringData.title.ko : engineeringData.title.en}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-[#DADAD6]/60">
                      <span className="text-[#777773]">AI Exposure Level:</span>
                      <span className="font-bold text-[#111111]">{engineeringData.aiExposureLevel}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#DADAD6]/60">
                      <span className="text-[#777773]">Language Intensity:</span>
                      <span className="text-[#4A4A47] font-semibold">{engineeringData.languageIntensity}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A4A47] leading-relaxed font-sans bg-[#FFFFFF] p-4 rounded-xs border border-[#DADAD6]">
                    {isKo ? engineeringData.tokenBurdenAssessment.ko : engineeringData.tokenBurdenAssessment.en}
                  </p>

                  {/* Sub Occupations */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono text-[#777773] uppercase tracking-wider block">
                      대표 세부 직무 (Included Occupations):
                    </span>
                    <div className="space-y-1.5">
                      {engineeringData.occupations.map((occ, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-[#FFFFFF] rounded-xs border border-[#DADAD6] flex items-center justify-between text-xs"
                        >
                          <span className="font-medium text-[#4A4A47]">
                            {isKo ? occ.name.ko : occ.name.en}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-[#F1F2F2] text-[#4A4A47] rounded-xs border border-[#DADAD6]">
                            {occ.status === 'DATA_AVAILABLE' ? '데이터 확인' : '데이터 보강 필요'}

                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#FFFFFF] border border-[#DADAD6] rounded-xs text-xs text-[#777773] font-mono">
                  평가: 코드 및 영문 토큰 비중으로 인해 상대적 토큰 페널티 완충
                </div>
              </div>

              {/* Cluster 2: Social Science / Knowledge-intensive */}
              <div className="bg-[#FFFFFF] border-2 border-[#111111] rounded-xs p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#DADAD6] pb-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#111111]" />
                      <h3 className="font-bold text-lg text-[#111111]">
                        {isKo ? socialScienceData.title.ko : socialScienceData.title.en}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-[#111111] text-[#FFFFFF] rounded-xs font-bold uppercase">
                     {isKo ? '높은 누적 부담 가능성' : 'HIGH BURDEN POTENTIAL'}
                     
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-[#DADAD6]/60">
                      <span className="text-[#777773]">AI Exposure Level:</span>
                      <span className="font-bold text-[#111111]">{socialScienceData.aiExposureLevel}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#DADAD6]/60">
                      <span className="text-[#777773]">Language Intensity:</span>
                      <span className="text-[#111111] font-bold">{socialScienceData.languageIntensity}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A4A47] leading-relaxed font-sans bg-[#F7F7F5] p-4 rounded-xs border border-[#DADAD6]">
                    {isKo ? socialScienceData.tokenBurdenAssessment.ko : socialScienceData.tokenBurdenAssessment.en}
                  </p>

                  {/* Sub Occupations */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono text-[#777773] uppercase tracking-wider block">
                      대표 세부 직무 (Included Occupations):
                    </span>
                    <div className="space-y-1.5">
                      {socialScienceData.occupations.map((occ, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-[#F7F7F5] rounded-xs border border-[#DADAD6] flex items-center justify-between text-xs"
                        >
                          <span className="font-medium text-[#111111]">
                            {isKo ? occ.name.ko : occ.name.en}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-[#111111] text-[#FFFFFF] rounded-xs font-bold">
                            {occ.status === 'DATA_AVAILABLE' ? '데이터 확인' : '데이터 보강 필요'}

                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#F7F7F5] border border-[#DADAD6] rounded-xs text-xs text-[#111111] font-mono font-semibold">
                  평가: 장문 한국어 텍스트 문맥 누적으로 실질 Token Burden 집중 가중
                </div>
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
