import approvedSection3Base64 from "@/assets/section3-approved.webp?raw";

const approvedSection3 = `data:image/webp;base64,${approvedSection3Base64.trim()}`;

export function Segments() {
  return (
    <section
      id="segments"
      className="scroll-mt-24 bg-background px-5 py-3 text-foreground md:px-8"
      style={{ minHeight: "calc(100vh - 98px)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-start justify-center">
        <img
          src={approvedSection3}
          alt="Section 03 — One sector. Two modernisation starting points. Established multi-site estates and brownfield standalone estates with modernisation pathways."
          className="block h-auto w-full rounded-sm object-contain"
        />
      </div>
    </section>
  );
}
