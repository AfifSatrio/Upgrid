"use client";

import { LayananHeaderSection } from "@/components/sections/LayananHeaderSection";
import { ServicesDetailSection } from "@/components/sections/ServicesDetailSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CallToActionCTA } from "@/components/sections/CallToActionCTA";

export default function Layanan() {
  return (
    <div className="flex flex-col min-h-screen">
      <LayananHeaderSection />
      <ServicesDetailSection />
      <div id="pricing">
        <PricingSection />
      </div>
      <BenefitsSection />
      <CallToActionCTA />
    </div>
  );
}
