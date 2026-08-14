import React, { useState } from 'react';
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

interface PipelineSectionProps {
  uiLang: UILanguage;
}

const PIPELINE_STEPS = [
  {
    step: '01',
    name: 'ENCODING',
    titleKo: '원시 텍스트 입력',
    titleEn: 'Raw Text Input',
    descKo: '사용자가 작성한 자연어 문자열(유니코드 UTF-8 바이트 시퀀스)을 그대로 수신합니다.',
    descEn: 'Receives the raw natural language string as a UTF-8 unicode byte stream.',
    highlight: false,
  },
  {
    step: '02',
    name: 'TOKENIZATION',
    titleKo: '토큰 분절 및 매핑',
    titleEn: 'Tokenization & Mapping',
    descKo: 'BPE 어휘집 사전을 기반으로 텍스트를 서브워드 토큰 조각으로 분절하고 고유 정수 ID로 변환합니다. (언어별 격차 발생 지점)',
    descEn: 'Segments text into subword token units using BPE vocabulary mapping. (Origin of linguistic gap)',
    highlight: true,
  },
  {
    step: '03',
    name: 'PAYLOAD',
    titleKo: '컨텍스트 적재',
    titleEn: 'Context Payload',
    descKo: '분절된 토큰 시퀀스가 트랜스포머 모델의 유한한 컨텍스트 윈도우(Context Window) 슬롯에 순차 배치됩니다.',
    descEn: 'Token sequences fill the finite context window slots in the Transformer architecture.',
    highlight: false,
  },
  {
    step: '04',
    name: 'PROCESSING',
    titleKo: '주의 집중 및 행렬 연산',
    titleEn: 'Attention & Matrix Compute',
    descKo: '토큰 수(N)에 비례하여 셀프 어텐션(Self-Attention) 연산 비용과 메모리 대역폭이 소모됩니다.',
    descEn: 'Self-attention compute cost and KV cache memory scale directly with token count (N).',
    highlight: false,
  },
  {
    step: '05',
    name: 'OUTPUT',
    titleKo: '토큰 단위 생성 및 디코딩',
    titleEn: 'Generation & Decoding',
    descKo: '다음 토큰을 확률적으로 하나씩 생성(Autoregressive)한 뒤 다시 인간이 읽을 수 있는 문장으로 복원합니다.',
    descEn: 'Autoregressively generates output tokens sequentially and decodes them back to natural text.',
    highlight: false,
  },
];

export const PipelineSection: React.FC<PipelineSectionProps> = ({ uiLang }) => {
  const isKo = uiLang === 'ko';
  const articleData = ARTICLE_CONTENT.tokenUnit;
  const [activeStep, setActiveStep] = useState<number>(1); // 0-indexed: Step 02 (TOKENIZATION) default

  return (
    <section id="pipeline" className="py-20 sm:py-28 bg-[#FFFFFF] text-[#111111] border-b border-[#DADAD6] scroll-mt-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs font-mono text-[#777773] font-bold tracking-widest uppercase">
            {isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
            {isKo ? (
              <>
                토큰,
                <br />
                <span className="underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  AI 시대의 새로운 계량 단위
                </span>
              </>
            ) : (
              <>
                Tokens,
                <br />
                <span className="underline decoration-[#8A8A85] underline-offset-8 decoration-2">
                  The New Unit of Measurement in AI
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

        {/* FULL-WIDTH BREAKOUT: Pipeline Visualization */}
        <ArticleFullWidthBreak className="space-y-8 my-8">
          <div className="space-y-8">
            <div className="text-xs font-mono text-[#777773] uppercase tracking-wider flex items-center justify-between border-b border-[#DADAD6] pb-2">
              <span>TRANSFORMER PIPELINE SEQUENCING</span>
              <span className="text-[#111111] font-bold">★ STEP 02: THE BOTTLENECK</span>
            </div>

            {/* Horizontal Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              {PIPELINE_STEPS.map((item, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={item.step}
                    onClick={() => setActiveStep(idx)}
                    className={`p-5 rounded-xs border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                      item.highlight
                        ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] shadow-xs'
                        : isActive
                        ? 'bg-[#F7F7F5] border-[#111111] text-[#111111]'
                        : 'bg-[#F7F7F5] border-[#DADAD6] hover:border-[#111111] text-[#111111]'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span
                          className={`text-xl font-bold font-mono ${
                            item.highlight ? 'text-[#FFFFFF]' : 'text-[#777773]'
                          }`}
                        >
                          {item.step}
                        </span>
                        {item.highlight && (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FFFFFF] text-[#111111] rounded-xs font-bold uppercase">
                            GAP ORIGIN
                          </span>
                        )}
                      </div>
                      <div
                        className={`font-mono text-xs font-bold uppercase tracking-wider ${
                          item.highlight ? 'text-[#DADAD6]' : 'text-[#777773]'
                        }`}
                      >
                        {item.name}
                      </div>
                      <div
                        className={`font-bold text-sm ${
                          item.highlight ? 'text-[#FFFFFF]' : 'text-[#111111]'
                        }`}
                      >
                        {isKo ? item.titleKo : item.titleEn}
                      </div>
                    </div>

                    <p
                      className={`text-xs font-sans leading-relaxed pt-2 border-t ${
                        item.highlight
                          ? 'text-[#DADAD6] border-[#353535]'
                          : 'text-[#4A4A47] border-[#DADAD6]'
                      }`}
                    >
                      {isKo ? item.descKo : item.descEn}
                    </p>
                  </div>
                );
              })}
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
