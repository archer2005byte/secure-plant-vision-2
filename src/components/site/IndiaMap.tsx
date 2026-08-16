import { cn } from "@/lib/utils";
import { categories, type Programme } from "./credentialsData";
import { INDIA_OUTLINE, INDIA_STATES } from "./indiaGeo";

const SX = 20;
const SY = 21;
const project = (lng: number, lat: number) => ({
  x: (lng - 67.5) * SX,
  y: (37.5 - lat) * SY,
});

export function IndiaMap({
  items,
  activeCategory,
  selectedId,
  onSelect,
  className,
}: {
  items: Programme[];
  activeCategory: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
}) {
  const dotClass = (id: Programme["category"]) =>
    categories.find((c) => c.id === id)?.dot ?? "fill-white";

  return (
    <svg
      viewBox="0 0 620 660"
      role="img"
      aria-label="Map of India showing EY surveillance, ICCC and emergency-response programmes"
      className={cn("h-full w-full", className)}
    >
      <g>
        <path d={INDIA_OUTLINE} className="fill-navy-foreground/[0.08]" />
        {INDIA_STATES.map((s) => (
          <path
            key={s.name}
            d={s.d}
            className="fill-none stroke-navy-foreground/15"
            strokeWidth={0.7}
          />
        ))}
        <path
          d={INDIA_OUTLINE}
          className="fill-none stroke-navy-foreground/35"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
      </g>
      {items.map((p) => {
        const { x, y } = project(p.lng, p.lat);
        const cx = x + (p.dx ?? 0);
        const cy = y + (p.dy ?? 0);
        const dimmed = activeCategory !== "all" && activeCategory !== p.category;
        const selected = selectedId === p.id;
        return (
          <g
            key={p.id}
            role="button"
            tabIndex={dimmed ? -1 : 0}
            aria-label={`${p.name} — ${p.place}`}
            className={cn(
              "cursor-pointer transition-opacity focus:outline-none",
              dimmed ? "opacity-20" : "opacity-100",
            )}
            onClick={() => onSelect(p.id)}
            onMouseEnter={() => onSelect(p.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(p.id);
              }
            }}
          >
            <title>{`${p.name} — ${p.place}`}</title>
            {selected ? (
              <circle
                cx={cx}
                cy={cy}
                r={15}
                className="fill-none stroke-ey-yellow"
                strokeWidth={2}
              />
            ) : null}
            <circle cx={cx} cy={cy} r={selected ? 9 : 6.5} className={dotClass(p.category)} />
            <circle cx={cx} cy={cy} r={14} className="fill-transparent" />
          </g>
        );
      })}
    </svg>
  );
}
