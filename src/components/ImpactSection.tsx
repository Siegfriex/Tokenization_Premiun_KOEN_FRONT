import React from 'react';
import { UILanguage } from '../types';
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

interface ImpactSectionProps {
  uiLang: UILanguage;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ uiLang }) => {
  const isKo = uiLang === 'ko';
  const articleData = ARTICLE_CONTENT.impact;

  return (
    <section id="impact" className="py-20 sm:py-28 bg-[#F1F2F2] text-[#111111] border-b border-[#DADAD6] scroll-mt-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs font-mono text-[#777773] font-bold tracking-widest uppercase">
            {isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
            {isKo ? (
              <>
                단순한 요금 차이를 넘어,
                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  비용의 문제를 넘어
                </span>
              </>
            ) : (
              <>
                Beyond Mere Billing:
                <br />
                <span className="text-[#111111] underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  Systemic Architecture Impact
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

        {/* FULL-WIDTH BREAKOUT: 3-Level Scale-Up Grid & Conceptual Causal Chain */}
        <ArticleFullWidthBreak className="space-y-10 my-8">
          {/* 3-Level Scale-Up Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level 1: PERSON */}
            <div className="bg-[#FFFFFF] border border-[#DADAD6] rounded-xs p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#DADAD6] pb-3">
                  <span className="text-xs font-mono text-[#777773] font-bold uppercase tracking-wider">
                    LEVEL 01 / 개인
                  </span>
                  <span className="text-xs font-mono text-[#777773]">PROMPT LEVEL</span>
                </div>

                <h3 className="text-xl font-bold text-[#111111]">
                  {isKo ? '문장 표현의 토큰 요구량 차이' : 'Different Token Requirements'}
                </h3>

                <p className="text-xs sm:text-sm text-[#4A4A47] leading-relaxed font-sans">
                  {isKo
                    ? '동일한 의미와 의도를 전달하더라도, 한글 텍스트는 BPE 어휘 분절 구조상 더 많은 서브워드 토큰 조각을 소비하게 됩니다.'
                    : 'Different token requirements for semantically equivalent expressions under standard BPE tokenizers.'}
                </p>
              </div>

              <div className="text-[11px] font-mono text-[#777773] border-t border-[#DADAD6] pt-3">
                단위: 개별 프롬프트 / 대화창
              </div>
            </div>

            {/* Level 2: WORK / ORGANIZATION */}
            <div className="bg-[#FFFFFF] border border-[#DADAD6] rounded-xs p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#DADAD6] pb-3">
                  <span className="text-xs font-mono text-[#777773] font-bold uppercase tracking-wider">
                    LEVEL 02 / 조직 및 업무
                  </span>
                  <span className="text-xs font-mono text-[#777773]">WORKFLOW LEVEL</span>
                </div>

                <h3 className="text-xl font-bold text-[#111111]">
                  {isKo ? '고빈도 워크플로우의 누적 부담' : 'Accumulated Computational Burden'}
                </h3>

                <p className="text-xs sm:text-sm text-[#4A4A47] leading-relaxed font-sans">
                  {isKo
                    ? '지식집약적 직무나 전사적 AI 에이전트 도입 환경에서 대량의 장문 문맥이 지속적으로 오갈 때 누적 연산 부담이 확대될 수 있습니다.'
                    : 'High-frequency AI environments and long-context agent pipelines may accumulate larger absolute computational burdens.'}
                </p>
              </div>

              <div className="text-[11px] font-mono text-[#777773] border-t border-[#DADAD6] pt-3">
                단위: 팀·기업 워크플로우 / 컨텍스트 점유율
              </div>
            </div>

            {/* Level 3: SOCIETY */}
            <div className="bg-[#111111] text-[#FFFFFF] border border-[#111111] rounded-xs p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#353535] pb-3">
                  <span className="text-xs font-mono text-[#DADAD6] font-bold uppercase tracking-wider">
                    LEVEL 03 / 사회 및 국가
                  </span>
                  <span className="text-xs font-mono text-[#FFFFFF] font-bold">INFRASTRUCTURE</span>
                </div>

                <h3 className="text-xl font-bold text-[#FFFFFF]">
                  {isKo ? '국가 인프라와 디지털 마찰' : 'Infrastructure & Digital Friction'}
                </h3>

                <p className="text-xs sm:text-sm text-[#DADAD6] leading-relaxed font-sans">
                  {isKo
                    ? '생성형 AI가 국가 기간 인프라로 자리 잡을수록, 표기 체계별 표현 효율성 격차는 구조적인 디지털 마찰(Digital Friction) 이슈로 부상할 수 있습니다.'
                    : 'As generative AI becomes infrastructure, representation efficiency may become an increasingly relevant digital-friction issue.'}
                </p>
              </div>

              <div className="text-[11px] font-mono text-[#DADAD6] font-bold border-t border-[#353535] pt-3">
                단위: 국가 인프라 / 소버린 AI
              </div>
            </div>
          </div>

          {/* Complete Conceptual Causal Chain */}
          <div className="bg-[#FFFFFF] border border-[#DADAD6] rounded-xs p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#777773] font-bold uppercase tracking-widest block">
                FINAL CONCEPTUAL CAUSAL CHAIN
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-[#111111]">
                언어 구조에서 사회적 파급 효과까지의 인과 사슬
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
              <div className="p-3 bg-[#F7F7F5] border border-[#DADAD6] rounded-xs text-[#4A4A47]">
                Language Structure
              </div>
              <span className="text-[#777773]">→</span>
              <div className="p-3 bg-[#F7F7F5] border border-[#DADAD6] rounded-xs text-[#4A4A47]">
                Tokenization
              </div>
              <span className="text-[#777773]">→</span>
              <div className="p-3 bg-[#111111] border border-[#111111] rounded-xs text-[#FFFFFF] font-bold">
                Token Premium
              </div>
              <span className="text-[#777773]">→</span>
              <div className="p-3 bg-[#F7F7F5] border border-[#DADAD6] rounded-xs text-[#4A4A47]">
                Occupational Burden
              </div>
              <span className="text-[#777773]">→</span>
              <div className="p-3 bg-[#F7F7F5] border border-[#DADAD6] rounded-xs text-[#4A4A47]">
                AI Adoption at Scale
              </div>
              <span className="text-[#777773]">→</span>
              <div className="p-3 bg-[#111111] text-[#FFFFFF] rounded-xs font-bold border border-[#111111]">
                Potential Digital Friction
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
