"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { DigitalEraSection } from "@/components/sections/DigitalEraSection";
import { HomeAboutSection } from "@/components/sections/HomeAboutSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesPreviewSection } from "@/components/sections/ServicesPreviewSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { CallToActionCTA } from "@/components/sections/CallToActionCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <DigitalEraSection />
      <HomeAboutSection />
      <FeaturesSection />
      <StatsSection />
      <ServicesPreviewSection />
      <PricingSection />
      <BenefitsSection />
      <PortfolioSection />
      <CallToActionCTA />
    </div>
  );
}
