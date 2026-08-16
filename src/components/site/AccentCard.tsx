import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AccentSlot = 1 | 2 | 3 | 4 | 5 | 6;

export function accentVars(slot: AccentSlot): CSSProperties {
  return { ["--a" as string]: `var(--accent-${slot})` } as CSSProperties;
}

export function AccentCard({
  slot,
  className,
  children,
}: {
  slot: AccentSlot;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      style={accentVars(slot)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[color:color-mix(in_oklab,var(--a)_18%,transparent)]",
        "bg-[color-mix(in_oklab,var(--a)_4%,white)] p-6 shadow-card",
        "transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:shadow-lift",
        "hover:border-[color:color-mix(in_oklab,var(--a)_38%,transparent)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[color:var(--a)] opacity-80"
      />
      {children}
    </article>
  );
}

export function AccentMedallion({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--a)] text-[color:white] shadow-[0_6px_18px_-8px_color-mix(in_oklab,var(--a)_80%,transparent)]">
      {children}
    </span>
  );
}