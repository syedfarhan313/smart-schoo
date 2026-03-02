import React from "react";
import { Layout } from "@/components/Layout";
import { AdmissionsPopup } from "@/components/home/AdmissionsPopup";
import { HeroSection } from "@/components/home/HeroSection";
import { PortalStrip } from "@/components/home/PortalStrip";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { FacilitiesSection } from "@/components/home/FacilitiesSection";
import { CTASection } from "@/components/home/CTASection";

export default function Index() {
  return (
    <Layout>
      <AdmissionsPopup />
      <HeroSection />
      <PortalStrip />
      <AboutPreview />
      <ProgramsSection />
      <FacilitiesSection />
      <CTASection />
    </Layout>
  );
}

