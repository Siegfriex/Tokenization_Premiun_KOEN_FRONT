import React, { useState } from 'react';
import { UILanguage } from './types';
import { StoryProgress } from './components/StoryProgress';
import { NewsHeroSection } from './components/NewsHeroSection';
import { TokenCompareSection } from './components/TokenCompareSection';
import { PipelineSection } from './components/PipelineSection';
import { TokenPremiumSection } from './components/TokenPremiumSection';
import { OccupationSection } from './components/OccupationSection';
import { MultilingualTokenEfficiencySection } from './components/MultilingualTokenEfficiencySection';
import { KoreaAIContextSection } from './components/KoreaAIContextSection';
import { ImpactSection } from './components/ImpactSection';
import { MethodSection } from './components/MethodSection';
import { EditorialConclusionSection } from './components/EditorialConclusionSection';
import { Footer } from './components/Footer';

export default function App() {
  const [uiLang, setUiLang] = useState<UILanguage>('ko');

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] flex flex-col font-sans selection:bg-[#111111] selection:text-[#FFFFFF] scroll-smooth">
      {/* Sticky Editorial Header */}
      <StoryProgress uiLang={uiLang} setUiLang={setUiLang} />

      {/* Main Scrollytelling Flow */}
      <main className="flex-1">
        {/* S0. Editorial Cover / Thesis */}
        <NewsHeroSection uiLang={uiLang} />

        {/* S1. Quick Compare Lab (Alphabet vs Hangul Tokenization) */}
        <TokenCompareSection uiLang={uiLang} />

        {/* S2. Generative AI Processing Pipeline */}
        <PipelineSection uiLang={uiLang} />

        {/* S3. Token Premium & Domain Patterns */}
        <TokenPremiumSection uiLang={uiLang} />

        {/* S4. AI-Exposed Occupations & Accumulated Token Burden */}
        <OccupationSection uiLang={uiLang} />

        {/* S4.5. Global Multilingual Token Efficiency */}
        <MultilingualTokenEfficiencySection uiLang={uiLang} />

        {/* S5. Korea's Expanding AI Infrastructure */}
        <KoreaAIContextSection uiLang={uiLang} />

        {/* S5.2. Socioeconomic Implications (From Me to Society) */}
        <ImpactSection uiLang={uiLang} />

        {/* S6. Methodology / Research Limitations / Sources */}
        <MethodSection uiLang={uiLang} />

        {/* RESULT. Editorial Conclusion Slide */}
        <EditorialConclusionSection uiLang={uiLang} />
      </main>

      {/* Source & Research Disclaimer Footer */}
      <Footer uiLang={uiLang} />
    </div>
  );
}
