import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

export const sectionIds = [
  "top",
  "why-now",
  "segments",
  "plant-blocks",
  "as-is",
  "to-be",
  "use-cases",
  "offerings",
  "why-ey",
  "credentials",
  "credentials-power",
  "closing",
] as const;

export type SectionId = (typeof sectionIds)[number];

export const numberedSectionIds = [
  "top",
  "why-now",
  "segments",
  "plant-blocks",
  "as-is",
  "to-be",
  "use-cases",
  "offerings",
  "why-ey",
  "credentials",
  "closing",
] as const satisfies readonly SectionId[];

let activePresentationView: SectionId = "top";
const activeViewListeners = new Set<() => void>();

function publishActivePresentationView(id: SectionId) {
  if (activePresentationView === id) return;
  activePresentationView = id;
  activeViewListeners.forEach((listener) => listener());
}

export function useActivePresentationView() {
  return useSyncExternalStore(
    (listener) => {
      activeViewListeners.add(listener);
      return () => activeViewListeners.delete(listener);
    },
    () => activePresentationView,
    () => "top",
  );
}

export function sectionNumberForView(id: SectionId) {
  if (id === "credentials-power") return 10;
  return numberedSectionIds.indexOf(id as (typeof numberedSectionIds)[number]) + 1;
}

let pendingAnchor: string | null = null;
let pendingAnchorFrame = 0;
let previousRootScrollBehavior: string | null = null;

function forceInstantProgrammaticScroll() {
  const root = document.documentElement;
  if (previousRootScrollBehavior === null) previousRootScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
}

function restoreRootScrollBehavior() {
  if (previousRootScrollBehavior === null) return;
  document.documentElement.style.scrollBehavior = previousRootScrollBehavior;
  previousRootScrollBehavior = null;
}

const labels: Record<string, string> = {
  top: "Overview",
  "why-now": "Why now",
  segments: "Segments",
  "plant-blocks": "Security zones",
  "as-is": "As-is",
  "to-be": "To-be",
  "use-cases": "Use cases",
  offerings: "EY support",
  "why-ey": "What EY brings",
  credentials: "Credentials",
  "credentials-power": "Credentials: power-generation engagements",
  closing: "Next step",
};

function sectionIdFromHash(): SectionId | null {
  const id = window.location.hash.slice(1);
  return sectionIds.includes(id as SectionId) ? (id as SectionId) : null;
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])'),
  );
}

function viewportAnchor() {
  const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
  return headerBottom + 8;
}

function currentSectionIndex() {
  const anchor = viewportAnchor();
  const positionProbe = anchor + 1;
  const sections = sectionIds
    .map((id, index) => {
      const element = document.getElementById(id);
      return element ? { index, rect: element.getBoundingClientRect() } : null;
    })
    .filter((section): section is { index: number; rect: DOMRect } => section !== null);

  const containing = sections.find(
    ({ rect }) => rect.top <= positionProbe && rect.bottom > positionProbe,
  );
  if (containing) return containing.index;

  return sections.reduce(
    (closest, section) =>
      Math.abs(section.rect.top - positionProbe) < Math.abs(closest.rect.top - positionProbe)
        ? section
        : closest,
    sections[0] ?? { index: 0, rect: new DOMRect() },
  ).index;
}

export function navigateToAnchor(
  id: string,
  {
    behavior = "smooth",
    history = "push",
  }: { behavior?: ScrollBehavior; history?: "push" | "replace" } = {},
) {
  const section = document.getElementById(id);
  if (!section) return false;

  const top = section.getBoundingClientRect().top + window.scrollY - viewportAnchor();
  pendingAnchor = id;
  window.cancelAnimationFrame(pendingAnchorFrame);
  forceInstantProgrammaticScroll();
  if (window.location.hash !== `#${id}`) {
    window.history[history === "push" ? "pushState" : "replaceState"](
      window.history.state,
      "",
      `#${id}`,
    );
  }
  if (sectionIds.includes(id as SectionId)) publishActivePresentationView(id as SectionId);
  const focusTarget = section.querySelector<HTMLElement>("h1, h2");
  if (focusTarget) {
    const hadTabIndex = focusTarget.hasAttribute("tabindex");
    focusTarget.classList.add("section-focus-target");
    focusTarget.setAttribute("tabindex", "-1");
    focusTarget.focus({ preventScroll: true });
    if (!hadTabIndex) {
      focusTarget.addEventListener(
        "blur",
        () => {
          focusTarget.removeAttribute("tabindex");
          focusTarget.classList.remove("section-focus-target");
        },
        { once: true },
      );
    }
  }
  const destination = Math.max(0, top);
  if (behavior === "auto") {
    window.scrollTo({ top: destination, behavior: "auto" });
    pendingAnchor = null;
    restoreRootScrollBehavior();
    if (sectionIds.includes(id as SectionId)) publishActivePresentationView(id as SectionId);
    return true;
  }

  const origin = window.scrollY;
  const distance = destination - origin;
  const duration = Math.min(700, Math.max(420, Math.abs(distance) * 0.12));
  const startedAt = window.performance.now();
  const animate = (now: number) => {
    if (pendingAnchor !== id) return;
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo({ top: origin + distance * eased, behavior: "auto" });
    if (progress < 1) {
      pendingAnchorFrame = window.requestAnimationFrame(animate);
    } else {
      const settledDestination = Math.max(
        0,
        section.getBoundingClientRect().top + window.scrollY - viewportAnchor(),
      );
      window.scrollTo({ top: settledDestination, behavior: "auto" });
      pendingAnchor = null;
      restoreRootScrollBehavior();
      if (sectionIds.includes(id as SectionId)) publishActivePresentationView(id as SectionId);
    }
  };
  pendingAnchorFrame = window.requestAnimationFrame(animate);
  return true;
}

export function navigateToSection(
  id: SectionId,
  options: { behavior?: ScrollBehavior; history?: "push" | "replace" } = {},
) {
  return navigateToAnchor(id, options);
}

export function DeckNavigation() {
  const [active, setActive] = useState(0);
  const activeIndexRef = useRef(-1);
  const hashAlignmentCompleteRef = useRef(false);

  const setActiveIndex = useCallback((index: number, updateHash = true) => {
    if (updateHash && pendingAnchor) return;
    const id = sectionIds[index]!;
    publishActivePresentationView(id);
    if (activeIndexRef.current === index) return;

    activeIndexRef.current = index;
    setActive(index);

    if (updateHash && hashAlignmentCompleteRef.current && !pendingAnchor) {
      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(window.history.state, "", `#${id}`);
      }
    }
  }, []);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(sectionIds.length - 1, index));
    const id = sectionIds[clamped]!;
    navigateToSection(id);
  }, []);

  // Correct initial and external hash navigation after hydration and router restoration.
  useEffect(() => {
    let frame = 0;
    const alignToHash = () => {
      const id = sectionIdFromHash();
      if (id && navigateToSection(id, { behavior: "auto", history: "replace" })) {
        setActiveIndex(sectionIds.indexOf(id), false);
      }
      hashAlignmentCompleteRef.current = true;
      if (!id) setActiveIndex(currentSectionIndex());
    };
    const handleHashChange = () => {
      if (hashAlignmentCompleteRef.current) alignToHash();
    };

    let framesUntilAlignment = 4;
    const alignAfterRestoration = () => {
      frame = window.requestAnimationFrame(() => {
        framesUntilAlignment -= 1;
        if (framesUntilAlignment > 0) alignAfterRestoration();
        else alignToHash();
      });
    };

    alignAfterRestoration();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, [setActiveIndex]);

  // Observer and viewport events trigger one complete position-based calculation.
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0) return;

    let frame = 0;
    const recalculate = () => {
      frame = 0;
      if (!hashAlignmentCompleteRef.current) return;
      setActiveIndex(currentSectionIndex());
    };
    const scheduleRecalculation = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(recalculate);
    };

    const observer = new IntersectionObserver(scheduleRecalculation);

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", scheduleRecalculation, { passive: true });
    window.addEventListener("resize", scheduleRecalculation);
    scheduleRecalculation();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleRecalculation);
      window.removeEventListener("resize", scheduleRecalculation);
      window.cancelAnimationFrame(frame);
    };
  }, [setActiveIndex]);

  // Presentation keys navigate from the section currently framed in the viewport.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;

      let destination: number | null = null;
      const current = currentSectionIndex();
      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
        case "PageDown":
          destination = current + 1;
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
          destination = current - 1;
          break;
        case "Home":
          destination = 0;
          break;
        case "End":
          destination = sectionIds.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      goTo(destination);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-1 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center md:flex"
    >
      {sectionIds.map((id, i) => (
        <button
          key={id}
          type="button"
          onClick={() => goTo(i)}
          aria-current={i === active ? "true" : undefined}
          aria-label={labels[id] ?? id}
          title={labels[id] ?? id}
          className="group flex h-11 w-11 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            aria-hidden
            className={cn(
              "h-2 rounded-full transition-all",
              i === active ? "w-6 bg-brand" : "w-2 bg-foreground/20 group-hover:bg-foreground/40",
            )}
          />
        </button>
      ))}
    </nav>
  );
}
