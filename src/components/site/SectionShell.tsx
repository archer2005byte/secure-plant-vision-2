import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "light",
  className,
  headerMedia,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: "light" | "tint" | "dark" | "cream";
  className?: string;
  headerMedia?: ReactNode;
}) {
  const toneClass =
    tone === "dark"
      ? "bg-navy text-navy-foreground"
      : tone === "cream"
        ? "bg-ey-cream text-foreground"
        : tone === "tint"
        ? "bg-surface-2 text-foreground"
        : "bg-background text-foreground";

  return (
    <section id={id} className={cn("scroll-mt-24 py-14 md:py-20", toneClass, className)}>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p
              className={cn(
                "flex items-center gap-3 text-base font-semibold uppercase tracking-[0.22em]",
                tone === "dark" ? "text-brand" : "text-ey-green-deep",
              )}
            >
              <span aria-hidden className="h-3 w-1.5 shrink-0 rounded-sm bg-ey-yellow" />
              {eyebrow}
            </p>
            <h2
              className={cn(
                "mt-4 text-balance text-3xl font-semibold leading-tight md:text-[2.6rem]",
                tone === "cream" && "text-ey-green-deep",
              )}
            >
              {title}
            </h2>
            {intro ? (
              <p
                className={cn(
                  "mt-4 text-base leading-relaxed md:text-lg",
                  tone === "dark" ? "text-navy-muted" : "text-muted-foreground",
                )}
              >
                {intro}
              </p>
            ) : null}
          </div>
          {headerMedia ? (
            <div className="shrink-0 lg:max-w-[16rem] xl:max-w-[18rem]">{headerMedia}</div>
          ) : null}
        </div>
        <div className="mt-8 md:mt-10">{children}</div>
      </div>
    </section>
  );
}
