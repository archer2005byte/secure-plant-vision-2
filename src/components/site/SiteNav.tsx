import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

import { cn } from "@/lib/utils";
import eyLogo from "../../../design/references/EY-logo.png";
import {
  navigateToSection,
  numberedSectionIds,
  sectionIds,
  sectionNumberForView,
  useActivePresentationView,
  type SectionId,
} from "./DeckNavigation";

const links = [
  { href: "#why-now", id: "why-now", label: "Why now" },
  { href: "#segments", id: "segments", label: "Segments" },
  { href: "#plant-blocks", id: "plant-blocks", label: "Security zones" },
  { href: "#as-is", id: "as-is", label: "As-is" },
  { href: "#to-be", id: "to-be", label: "To-be" },
  { href: "#use-cases", id: "use-cases", label: "Use cases" },
  { href: "#offerings", id: "offerings", label: "EY support" },
  { href: "#credentials", id: "credentials", label: "Credentials" },
] as const satisfies ReadonlyArray<{ href: string; id: SectionId; label: string }>;

function handleSectionLink(event: React.MouseEvent<HTMLAnchorElement>, id: SectionId) {
  event.preventDefault();
  navigateToSection(id);
}

export function SiteNav() {
  const topRibbonRef = useRef<HTMLElement>(null);
  const bottomRibbonRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const [jumpOpen, setJumpOpen] = useState(false);
  const [jumpValue, setJumpValue] = useState("");
  const [jumpInvalid, setJumpInvalid] = useState(false);
  const activeView = useActivePresentationView();
  const activeViewIndex = sectionIds.indexOf(activeView);
  const currentSectionNumber = sectionNumberForView(activeView);
  const credentialsView =
    activeView === "credentials" ? "1/2" : activeView === "credentials-power" ? "2/2" : null;
  const progress = ((activeViewIndex + 1) / sectionIds.length) * 100;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncFullscreenState = () => setFullscreen(Boolean(document.fullscreenElement));
    setFullscreenSupported(
      typeof document.documentElement.requestFullscreen === "function" &&
        typeof document.exitFullscreen === "function",
    );
    syncFullscreenState();
    document.addEventListener("fullscreenchange", syncFullscreenState);
    return () => document.removeEventListener("fullscreenchange", syncFullscreenState);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const measureRibbon = () => {
      frame = 0;
      const topHeight = topRibbonRef.current?.getBoundingClientRect().height ?? 0;
      const bottomHeight = bottomRibbonRef.current?.getBoundingClientRect().height ?? 0;
      root.style.setProperty("--presentation-ribbon-height", `${topHeight + bottomHeight}px`);
    };

    const scheduleMeasurement = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measureRibbon);
    };

    const observer = new ResizeObserver(scheduleMeasurement);
    if (topRibbonRef.current) observer.observe(topRibbonRef.current);
    if (bottomRibbonRef.current) observer.observe(bottomRibbonRef.current);

    scheduleMeasurement();
    window.addEventListener("resize", scheduleMeasurement, { passive: true });
    window.visualViewport?.addEventListener("resize", scheduleMeasurement, { passive: true });
    document.addEventListener("fullscreenchange", scheduleMeasurement);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasurement);
      window.visualViewport?.removeEventListener("resize", scheduleMeasurement);
      document.removeEventListener("fullscreenchange", scheduleMeasurement);
      root.style.removeProperty("--presentation-ribbon-height");
    };
  }, []);

  useEffect(() => {
    setJumpOpen(false);
    setJumpInvalid(false);
  }, [activeView]);

  useEffect(() => {
    const root = document.documentElement;
    const openingFullscreen = fullscreen && activeView === "top";
    root.classList.toggle("opening-presentation-active", openingFullscreen);
    return () => root.classList.remove("opening-presentation-active");
  }, [activeView, fullscreen]);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      await document.documentElement.requestFullscreen();
    } catch {
      // Embedded browsers can expose the API while denying the request.
    }
  };

  const navigateByViewOffset = (offset: -1 | 1) => {
    const destination = sectionIds[activeViewIndex + offset];
    if (destination) navigateToSection(destination);
  };

  const openJump = () => {
    setJumpValue(String(currentSectionNumber));
    setJumpInvalid(false);
    setJumpOpen(true);
  };

  const submitJump = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^\d{1,2}$/.test(jumpValue)) {
      setJumpInvalid(true);
      return;
    }

    const destination = numberedSectionIds[Number(jumpValue) - 1];
    if (!destination) {
      setJumpInvalid(true);
      return;
    }

    setJumpOpen(false);
    navigateToSection(destination);
  };

  const namedLinkIsActive = (id: SectionId) =>
    id === "credentials"
      ? activeView === "credentials" || activeView === "credentials-power"
      : activeView === id;

  return (
    <>
      <header
        ref={topRibbonRef}
        className={cn(
          "sticky top-0 z-50 h-[60px] border-b transition-colors",
          scrolled
            ? "border-hairline bg-background/95 backdrop-blur"
            : "border-hairline/70 bg-background",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
          <a
            href="#top"
            onClick={(event) => handleSectionLink(event, "top")}
            className="flex min-w-0 items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ey-yellow focus-visible:ring-offset-2"
          >
            <img src={eyLogo} alt="EY" className="h-8 w-auto shrink-0 object-contain" />
            <span className="hidden whitespace-nowrap text-xs uppercase tracking-[0.12em] text-muted-foreground md:inline">
              SECURITY MODERNIZATION FOR POWER GENERATION COMPANIES
            </span>
          </a>

          {fullscreenSupported ? (
            <button
              type="button"
              onClick={() => void toggleFullscreen()}
              aria-label={fullscreen ? "Exit full screen" : "Full screen"}
              title={fullscreen ? "Exit full screen" : "Full screen"}
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border border-hairline bg-surface px-2.5 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-ey-yellow focus-visible:ring-offset-2"
            >
              {fullscreen ? (
                <Minimize2 aria-hidden className="h-4 w-4" />
              ) : (
                <Maximize2 aria-hidden className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {fullscreen ? "Exit full screen" : "Full screen"}
              </span>
            </button>
          ) : null}
        </div>
      </header>

      <nav
        ref={bottomRibbonRef}
        aria-label="Presentation navigation"
        className="fixed inset-x-0 bottom-0 z-50 h-[52px] border-t border-hairline bg-background/98 text-foreground backdrop-blur"
      >
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] overflow-hidden">
          <span
            className="block h-full bg-ey-yellow transition-[width] duration-200 motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </span>

        <div className="mx-auto flex h-full w-full max-w-6xl items-center px-5 pt-[3px] md:px-8">
          <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex h-full min-w-max items-center gap-3 pr-4">
              {links.map((link) => {
                const active = namedLinkIsActive(link.id);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => handleSectionLink(event, link.id)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-10 items-center whitespace-nowrap rounded-sm px-0.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ey-yellow focus-visible:ring-offset-2",
                      active
                        ? "font-semibold text-foreground after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:bg-ey-yellow"
                        : "font-medium text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="relative ml-3 flex h-full shrink-0 items-center border-l border-hairline bg-background pl-3">
            {jumpOpen ? (
              <form
                onSubmit={submitJump}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setJumpOpen(false);
                  }
                }}
                className="absolute bottom-[calc(100%+8px)] right-0 w-48 rounded-lg border border-hairline bg-background p-3 shadow-card"
                aria-label="Go to section"
              >
                <label
                  htmlFor="presentation-section-jump"
                  className="text-xs font-semibold text-foreground"
                >
                  Go to section
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    id="presentation-section-jump"
                    autoFocus
                    inputMode="numeric"
                    maxLength={2}
                    value={jumpValue}
                    onChange={(event) => {
                      setJumpValue(event.target.value);
                      setJumpInvalid(false);
                    }}
                    aria-invalid={jumpInvalid}
                    className="h-9 min-w-0 flex-1 rounded-md border border-hairline bg-surface px-2 text-center font-mono text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-ey-yellow"
                  />
                  <button
                    type="submit"
                    className="h-9 rounded-md border border-hairline px-2.5 text-sm font-semibold outline-none hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-ey-yellow"
                  >
                    Go
                  </button>
                </div>
                {jumpInvalid ? (
                  <p role="alert" className="mt-1.5 text-xs text-destructive">
                    Enter a section from 1 to 11.
                  </p>
                ) : null}
              </form>
            ) : null}

            <button
              type="button"
              onClick={() => navigateByViewOffset(-1)}
              disabled={activeViewIndex === 0}
              aria-label="Previous section"
              title="Previous section"
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm outline-none hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-ey-yellow disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft aria-hidden className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={openJump}
              aria-expanded={jumpOpen}
              aria-controls="presentation-section-jump"
              className="mx-0.5 inline-flex h-8 items-center whitespace-nowrap rounded-sm px-1.5 font-mono text-sm font-semibold tabular-nums outline-none hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-ey-yellow"
            >
              <span>{String(currentSectionNumber).padStart(2, "0")}</span>
              <span className="mx-1 text-muted-foreground">/</span>
              <span className="text-muted-foreground">11</span>
              {credentialsView ? (
                <span className="ml-1.5 hidden text-muted-foreground sm:inline">
                  · {credentialsView}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => navigateByViewOffset(1)}
              disabled={activeViewIndex === sectionIds.length - 1}
              aria-label="Next section"
              title="Next section"
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm outline-none hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-ey-yellow disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight aria-hidden className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
