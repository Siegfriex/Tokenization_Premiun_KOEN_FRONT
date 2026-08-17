import React from 'react';
import { UILanguageProvider } from './features/change-language';
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
  return (
    <UILanguageProvider defaultLanguage="ko">
      <div className="min-h-screen bg-canvas text-ink flex flex-col font-sans selection:bg-ink selection:text-on-accent scroll-smooth">
        {/* Sticky Editorial Header */}
        <StoryProgress />

        {/* Main Scrollytelling Flow */}
        <main className="flex-1">
          {/* S0. Editorial Cover / Thesis */}
          <NewsHeroSection />

          {/* S1. Quick Compare Lab (Alphabet vs Hangul Tokenization) */}
          <TokenCompareSection />

          {/* S2. Generative AI Processing Pipeline */}
          <PipelineSection />

          {/* S3. Token Premium & Domain Patterns */}
          <TokenPremiumSection />

          {/* S4. AI-Exposed Occupations & Accumulated Token Burden */}
          <OccupationSection />

          {/* S4.5. Global Multilingual Token Efficiency */}
          <MultilingualTokenEfficiencySection />

          {/* S5. Korea's Expanding AI Infrastructure */}
          <KoreaAIContextSection />

          {/* S5.2. Socioeconomic Implications (From Me to Society) */}
          <ImpactSection />

          {/* S6. Methodology / Research Limitations / Sources */}
          <MethodSection />

          {/* RESULT. Editorial Conclusion Slide */}
          <EditorialConclusionSection />
        </main>

        {/* Source & Research Disclaimer Footer */}
        <Footer />
      </div>
    </UILanguageProvider>
  );
}
