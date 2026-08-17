import React from 'react';
import { useUILanguage } from '../features/change-language';
import { getLocalizedText } from '../shared/i18n';
import { VERIFIED_POLICY_SLOTS } from '../entities/policy-slot';
import { ARTICLE_CONTENT, MACRO_ADOPTION_PHASES } from '../entities/article-content';
import { Container, SectionHeading, HeadingAccent } from '../shared/ui';
import {
  ArticleReadingColumn,
  ArticleLead,
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
    <section id="infrastructure" data-widget="KoreaAIContextSection" data-section="infrastructure" className="py-20 sm:py-28 bg-surface text-ink border-b border-rule scroll-mt-16">
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

          {isKo
            ? articleData.preFigureParagraphs?.ko.map((p, idx) => (
                <ArticleParagraph key={idx}>{p}</ArticleParagraph>
              ))
            : articleData.preFigureParagraphs?.en.map((p, idx) => (
                <ArticleParagraph key={idx}>{p}</ArticleParagraph>
              ))}
        </ArticleReadingColumn>

        {/* FULL-WIDTH BREAKOUT: Macro Adoption Chain & Verified Policy Slots */}
        <ArticleFullWidthBreak figure className="space-y-10 my-8">
          {/* Macro Adoption Chain */}
          <div className="space-y-6">
            <dl data-role="stat" data-semantic-target="dl" className="border-b border-rule pb-3 flex items-center justify-between">
              <dt data-source="widget" className="text-xs font-mono text-ink font-bold uppercase tracking-wider">
                MACRO ADOPTION CAUSAL CHAIN
              </dt>
              <dd data-source="widget" className="text-xs font-mono text-ink-muted">Scale Dynamics</dd>
            </dl>

            <ul data-collection="macro-adoption-phases" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {MACRO_ADOPTION_PHASES.map((phase, idx) => (
                <li
                  key={phase.id}
                  data-item-id={phase.id}
                  className={`relative rounded-xs p-5 space-y-3 border ${
                    phase.highlight
                      ? 'bg-surface border-2 border-rule-strong shadow-sm'
                      : 'bg-surface-alt border-rule'
                  } ${
                    idx < MACRO_ADOPTION_PHASES.length - 1
                      ? "lg:after:content-['→'] lg:after:absolute lg:after:-right-6 lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:text-ink-muted lg:after:text-lg lg:after:font-mono"
                      : ''
                  }`}
                >
                  <div className="text-xs font-mono font-bold uppercase text-ink-muted">
                    {phase.phaseLabel}
                  </div>
                  <div className="text-lg font-bold text-ink">
                    {phase.name}
                  </div>
                  <p className="text-xs leading-relaxed font-sans text-ink-body">
                    {phase.description}
                  </p>
                </li>
              ))}
            </ul>

            {/* Diagram bridge: the causal chain terminates in, and is meant
                to be anchored by, the verified data slots below. */}
            <div className="flex justify-center" aria-hidden="true">
              <div className="flex flex-col items-center text-ink-muted">
                <div className="w-px h-6 bg-rule-strong" />
                <span className="text-lg font-mono leading-none">↓</span>
              </div>
            </div>
          </div>

          {/* Verified Policy & Investment Slots */}
          <div className="space-y-6">
            <dl data-role="stat" data-semantic-target="dl" className="border-b border-rule pb-3 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
              <dt data-source="widget" className="text-xs font-mono text-ink-body uppercase tracking-wider font-semibold">
                {isKo ? '검증된 정책 및 대규모 투자 데이터 슬롯 (Data Slots):' : 'Verified Policy & Investment Data Slots:'}
              </dt>
              <dd data-source="widget" className="text-xs font-mono text-ink font-bold">Strict Data Verification Rule</dd>
            </dl>

            <ul data-collection="verified-policy-slots" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VERIFIED_POLICY_SLOTS.map((slot) => (
                <li
                  key={slot.id}
                  data-item-id={slot.id}
                  className="bg-surface border border-rule rounded-xs p-6 space-y-4 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-2">
                    <dl data-role="stat" data-semantic-target="dl" className="flex items-center justify-between text-xs font-mono">
                      <dt className="text-ink-muted">{slot.category}</dt>
                      <dd className="px-2 py-0.5 bg-surface-alt text-ink border border-rule rounded-xs text-[10px] font-bold">
                        {slot.status}
                      </dd>
                    </dl>

                    <h3 data-role="heading" data-semantic-target="heading" className="font-bold text-sm text-ink leading-snug">
                      {getLocalizedText(slot.title, language)}
                    </h3>
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
                    <dl data-role="stat" data-semantic-target="dl" className="flex justify-between">
                      <dt data-source="widget">Scope:</dt>
                      <dd data-source="widget" className="text-ink-body font-semibold">[NATIONAL COMPUTE INFRA]</dd>
                    </dl>
                    <dl data-role="stat" data-semantic-target="dl" className="flex justify-between">
                      <dt data-source="widget">Period:</dt>
                      <dd className="text-ink-body font-semibold">[2024–2030]</dd>
                    </dl>
                  </div>
                </li>
              ))}
            </ul>
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
