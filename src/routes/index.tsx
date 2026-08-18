import { createFileRoute } from "@tanstack/react-router";

import { SiteNav } from "@/components/site/SiteNav";
import { DeckNavigation } from "@/components/site/DeckNavigation";
import { Hero } from "@/components/site/Hero";
import { WhyNowWithRails } from "@/components/site/WhyNowWithRails";
import { Segments } from "@/components/site/Segments";
import { PlantBlocks } from "@/components/site/PlantBlocks";
import { AsIsAssessment } from "@/components/site/AsIsAssessment";
import { ToBeArchitecture } from "@/components/site/ToBeArchitecture";
import { UseCases } from "@/components/site/UseCases";
import { Offerings } from "@/components/site/Offerings";
import { WhyEy } from "@/components/site/WhyEy";
import { Credentials } from "@/components/site/Credentials";
import { ClosingCta } from "@/components/site/ClosingCta";
import "@/components/site/PresentationViewport.css";

const title = "Integrated Surveillance & Security Modernization | EY";
const description =
  "EY advisory for power generation companies: perimeter security, plant surveillance, command-centre design, DPR/RFP support and implementation governance.";
const publishedUrl = "https://archer2005byte.github.io/secure-plant-vision-2/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: publishedUrl },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: publishedUrl }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <DeckNavigation />
      <main>
        <Hero />
        <WhyNowWithRails />
        <Segments />
        <PlantBlocks />
        <AsIsAssessment />
        <ToBeArchitecture />
        <UseCases />
        <Offerings />
        <WhyEy />
        <Credentials />
        <ClosingCta />
      </main>
      <footer className="border-t border-hairline bg-navy py-8 text-navy-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 text-xs text-navy-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p>Integrated Surveillance and Security Modernization for Power Generation Assets</p>
          <p>
            Illustrative advisory perspective. Client-specific facts, costs and timelines are
            placeholders pending assessment.
          </p>
        </div>
      </footer>
    </div>
  );
}
