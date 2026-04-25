"use client";

import { TentangHeaderSection } from "@/components/sections/TentangHeaderSection";
import { SiapaKamiSection } from "@/components/sections/SiapaKamiSection";
import { VisiMisiSection } from "@/components/sections/VisiMisiSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CallToActionCTA } from "@/components/sections/CallToActionCTA";

export default function Tentang() {
  return (
    <div className="flex flex-col min-h-screen">
      <TentangHeaderSection />
      <SiapaKamiSection />
      <VisiMisiSection />
      <FeaturesSection />
      <ProcessSection />
      <CallToActionCTA />
    </div>
  );
}
