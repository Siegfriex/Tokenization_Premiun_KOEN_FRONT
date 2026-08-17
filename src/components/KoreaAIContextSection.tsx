import React from 'react';
import { UILanguage } from '../types';
import { VERIFIED_POLICY_SLOTS } from '../data/storyData';
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

interface KoreaAIContextSectionProps {
  uiLang: UILanguage;
}

export const KoreaAIContextSection: React.FC<KoreaAIContextSectionProps> = ({ uiLang }) => {
  const isKo = uiLang === 'ko';
  const articleData = ARTICLE_CONTENT.koreaInfrastructure;

  return (
    <section id="infrastructure" className="py-20 sm:py-28 bg-[#FFFFFF] text-[#111111] border-b border-[#DADAD6] scroll-mt-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs font-mono text-[#777773] font-bold tracking-widest uppercase">
            {isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
            {isKo ? (
              <>
                AI가 인프라가 되는 사회,
                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  확장되는 토큰 스케일
                </span>
              </>
            ) : (
              <>
                When AI Becomes Infrastructure,
                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  Scaling Token Demands
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

        {/* FULL-WIDTH BREAKOUT: Macro Adoption Chain & Verified Policy Slots */}
        <ArticleFullWidthBreak className="space-y-10 my-8">
          {/* Macro Adoption Chain */}
          <div className="space-y-6">
            <div className="border-b border-[#DADAD6] pb-3 flex items-center justify-between">
              <span className="text-xs font-mono text-[#111111] font-bold uppercase tracking-wider">
                MACRO ADOPTION CAUSAL CHAIN
              </span>
              <span className="text-xs font-mono text-[#777773]">Scale Dynamics</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Phase 1 */}
              <div className="bg-[#F7F7F5] border border-[#DADAD6] rounded-xs p-5 space-y-3">
                <div className="text-xs font-mono text-[#777773] font-bold uppercase">
                  PHASE 01
                </div>
                <div className="text-lg font-bold text-[#111111]">
                  AI Investment ↑
                </div>
                <p className="text-xs text-[#4A4A47] leading-relaxed font-sans">
                  정부 및 주요 기업의 고성능 컴퓨팅 인프라 투자 가속화
                </p>
              </div>

              {/* Phase 2 */}
              <div className="bg-[#F7F7F5] border border-[#DADAD6] rounded-xs p-5 space-y-3">
                <div className="text-xs font-mono text-[#777773] font-bold uppercase">
                  PHASE 02
                </div>
                <div className="text-lg font-bold text-[#111111]">
                  Infrastructure ↑
                </div>
                <p className="text-xs text-[#4A4A47] leading-relaxed font-sans">
                  국가 컴퓨팅 센터 및 초거대 AI 데이터센터 확장
                </p>
              </div>

              {/* Phase 3 */}
              <div className="bg-[#F7F7F5] border border-[#DADAD6] rounded-xs p-5 space-y-3">
                <div className="text-xs font-mono text-[#777773] font-bold uppercase">
                  PHASE 03
                </div>
                <div className="text-lg font-bold text-[#111111]">
                  AI Adoption ↑
                </div>
                <p className="text-xs text-[#4A4A47] leading-relaxed font-sans">
                  공공·금융·제조·교육 전 분야의 일상 업무 AI 보급
                </p>
              </div>

              {/* Phase 4 (Highlighted) */}
              <div className="bg-[#111111] text-[#FFFFFF] border border-[#111111] rounded-xs p-5 space-y-3 shadow-xs">
                <div className="text-xs font-mono text-[#DADAD6] font-bold uppercase">
                  PHASE 04 ★
                </div>
                <div className="text-lg font-bold text-[#FFFFFF]">
                  Token Usage ↑
                </div>
                <p className="text-xs text-[#DADAD6] leading-relaxed font-sans">
                  총 토큰 처리량 폭증에 따른 효율 격차 누적
                </p>
              </div>
            </div>
          </div>

          {/* Verified Policy & Investment Slots */}
          <div className="space-y-6">
            <div className="border-b border-[#DADAD6] pb-3 flex items-center justify-between">
              <span className="text-xs font-mono text-[#4A4A47] uppercase tracking-wider font-semibold">
                {isKo ? '검증된 정책 및 대규모 투자 데이터 슬롯 (Data Slots):' : 'Verified Policy & Investment Data Slots:'}
              </span>
              <span className="text-xs font-mono text-[#111111] font-bold">Strict Data Verification Rule</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VERIFIED_POLICY_SLOTS.map((slot) => (
                <div
                  key={slot.id}
                  className="bg-[#FFFFFF] border border-[#DADAD6] rounded-xs p-6 space-y-4 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#777773]">{slot.category}</span>
                      <span className="px-2 py-0.5 bg-[#F7F7F5] text-[#111111] border border-[#DADAD6] rounded-xs text-[10px] font-bold">
                        {slot.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#111111] leading-snug">
                      {isKo ? slot.title.ko : slot.title.en}
                    </h4>
                  </div>

                  <div className="p-4 bg-[#F7F7F5] rounded-xs border border-dashed border-[#DADAD6] text-center space-y-1.5">
                    <div className="font-mono text-xs font-bold text-[#111111]">
                      {slot.placeholderLabel}
                    </div>
                    <p className="text-[11px] text-[#777773] font-sans">
                      검증된 정부 고시 및 기업 공시 데이터 확인 후 정밀 연동 대기 상태
                    </p>
                  </div>

                  <div className="text-[10px] font-mono text-[#777773] space-y-0.5 border-t border-[#DADAD6] pt-2">
                    <div className="flex justify-between">
                      <span>Scope:</span>
                      <span className="text-[#4A4A47] font-semibold">[NATIONAL COMPUTE INFRA]</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Period:</span>
                      <span className="text-[#4A4A47] font-semibold">[2024–2030]</span>
                    </div>
                  </div>
                </div>
              ))}
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
