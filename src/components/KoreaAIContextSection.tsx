import React from 'react';
import { useUILanguage } from '../features/change-language';
import { getLocalizedText } from '../shared/i18n';
import { VERIFIED_POLICY_SLOTS } from '../entities/policy-slot';
import { ARTICLE_CONTENT, MACRO_ADOPTION_PHASES } from '../entities/article-content';
import { Container, SectionHeading, HeadingAccent } from '../shared/ui';
import {
  ArticleReadingColumn,
  ArticleLead,
  ArticleSubheading,
  ArticleParagraph,
  ArticleFigureCaption,
  ArticleFinding,
  ArticleFullWidthBreak,
} from './ArticleElements';

export const KoreaAIContextSection: React.FC = () => {
  const { language } = useUILanguage();
  const isKo = language === 'ko';
  const articleData = ARTICLE_CONTENT.koreaInfrastructure;

  return (
    <section id="infrastructure" data-widget="KoreaAIContextSection" data-section="infrastructure" className="py-20 sm:py-28 bg-surface text-ink border-b border-rule scroll-mt-12">
      <Container gutter className="space-y-12">
        {/* Section Header */}
        <SectionHeading eyebrow={isKo ? articleData.eyebrow?.ko : articleData.eyebrow?.en}>
          {isKo ? (
            <>
              AI가 인프라가 되는 사회,
              <br />
              <HeadingAccent>확장되는 토큰 스케일</HeadingAccent>
            </>
          ) : (
            <>
              When AI Becomes Infrastructure,
              <br />
              <HeadingAccent>Scaling Token Demands</HeadingAccent>
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

        {/* FULL-WIDTH BREAKOUT: Macro Adoption Chain & Verified Policy Slots */}
        <ArticleFullWidthBreak className="space-y-10 my-8">
          {/* Macro Adoption Chain */}
          <div className="space-y-6">
            <div data-role="stat" data-semantic-target="dl" className="border-b border-rule pb-3 flex items-center justify-between">
              <span data-source="widget" className="text-xs font-mono text-ink font-bold uppercase tracking-wider">
                MACRO ADOPTION CAUSAL CHAIN
              </span>
              <span data-source="widget" className="text-xs font-mono text-ink-muted">Scale Dynamics</span>
            </div>

            <div data-collection="macro-adoption-phases" data-semantic-target="ul" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MACRO_ADOPTION_PHASES.map((phase) => (
                <div
                  key={phase.id}
                  data-item-id={phase.id}
                  className={`rounded-xs p-5 space-y-3 border ${
                    phase.highlight
                      ? 'bg-accent text-on-accent border-accent shadow-xs'
                      : 'bg-surface-alt border-rule'
                  }`}
                >
                  <div className={`text-xs font-mono font-bold uppercase ${phase.highlight ? 'text-on-accent-muted' : 'text-ink-muted'}`}>
                    {phase.phaseLabel}
                  </div>
                  <div className={`text-lg font-bold ${phase.highlight ? 'text-on-accent' : 'text-ink'}`}>
                    {phase.name}
                  </div>
                  <p className={`text-xs leading-relaxed font-sans ${phase.highlight ? 'text-on-accent-muted' : 'text-ink-body'}`}>
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Policy & Investment Slots */}
          <div className="space-y-6">
            <div data-role="stat" data-semantic-target="dl" className="border-b border-rule pb-3 flex items-center justify-between">
              <span data-source="widget" className="text-xs font-mono text-ink-body uppercase tracking-wider font-semibold">
                {isKo ? '검증된 정책 및 대규모 투자 데이터 슬롯 (Data Slots):' : 'Verified Policy & Investment Data Slots:'}
              </span>
              <span data-source="widget" className="text-xs font-mono text-ink font-bold">Strict Data Verification Rule</span>
            </div>

            <div data-collection="verified-policy-slots" data-semantic-target="ul" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VERIFIED_POLICY_SLOTS.map((slot) => (
                <div
                  key={slot.id}
                  data-item-id={slot.id}
                  className="bg-surface border border-rule rounded-xs p-6 space-y-4 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-2">
                    <div data-role="stat" data-semantic-target="dl" className="flex items-center justify-between text-xs font-mono">
                      <span className="text-ink-muted">{slot.category}</span>
                      <span className="px-2 py-0.5 bg-surface-alt text-ink border border-rule rounded-xs text-[10px] font-bold">
                        {slot.status}
                      </span>
                    </div>

                    <h4 data-role="heading" data-semantic-target="heading" className="font-bold text-sm text-ink leading-snug">
                      {getLocalizedText(slot.title, language)}
                    </h4>
                  </div>

                  <div className="p-4 bg-surface-alt rounded-xs border border-dashed border-rule text-center space-y-1.5">
                    <div className="font-mono text-xs font-bold text-ink">
                      {slot.placeholderLabel}
                    </div>
                    <p data-source="widget" className="text-[11px] text-ink-muted font-sans">
                      검증된 정부 고시 및 기업 공시 데이터 확인 후 정밀 연동 대기 상태
                    </p>
                  </div>

                  <div className="text-[10px] font-mono text-ink-muted space-y-0.5 border-t border-rule pt-2">
                    <div data-role="stat" data-semantic-target="dl" className="flex justify-between">
                      <span data-source="widget">Scope:</span>
                      <span data-source="widget" className="text-ink-body font-semibold">[NATIONAL COMPUTE INFRA]</span>
                    </div>
                    <div data-role="stat" data-semantic-target="dl" className="flex justify-between">
                      <span data-source="widget">Period:</span>
                      <span className="text-ink-body font-semibold">[2024–2030]</span>
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
      </Container>
    </section>
  );
};
