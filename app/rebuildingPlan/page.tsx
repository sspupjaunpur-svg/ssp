import Blocks, { Section } from "@/components/Blocks";
import { raw } from "@/lib/content";

export const metadata = { title: "Bharat Rebuilding Plan" };

// shortcut: chapter boundaries are hard-coded block indices from the scrape, re-derive if data/rebuildingPlan.json changes
const CH = [100, 118, 133, 188, 224, 276, 294, 310, 329, 345, 359, 394, 418, 451, 466, 484, 526, 549, 577, 594, 620, 659, 697, 709, 722, 732, 749, 762, 800, 812];

const Eyebrow = ({ s }: { s: string }) => <p className="reveal text-sm font-bold tracking-[.2em] text-red">{s}</p>;
const H2 = ({ s }: { s: string }) => <h2 className="reveal mt-2 text-3xl font-extrabold text-maroon-deep sm:text-4xl">{s}</h2>;

export default function Page() {
  const d = raw("rebuildingPlan");
  const t = (i: number) => d[i][1];
  const pairs = Array.from({ length: 6 }, (_, k) => [t(51 + 2 * k), t(52 + 2 * k)]);
  const chapters = d.slice(65, 94).map((b) => b[1]);
  return (
    <>

      <section className="relative overflow-hidden bg-gradient-to-br from-maroon-deep via-maroon to-red px-4 py-16 text-center text-white sm:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="animate-fade-up text-sm font-bold tracking-[.25em] text-saffron">{t(19)}</p>
          <h1 className="animate-fade-up mt-4 text-4xl font-black sm:text-6xl">{t(20)}</h1>
          <p className="animate-fade-up mt-5 text-lg text-white/85">{t(21)}</p>
          <a href="#chapters" className="animate-fade-up mt-8 inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-bold text-maroon-deep shadow-lg transition hover:-translate-y-0.5 hover:bg-saffron-soft">
            {t(22)} <span aria-hidden>↓</span>
          </a>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow s={t(29)} />
            <H2 s={t(30)} />
            <p className="reveal leading-relaxed text-muted">{t(31)}</p>
            <p className="reveal leading-relaxed text-muted">{t(32)}</p>
          </div>
          <div className="reveal flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-saffron to-saffron-soft p-10 text-center text-maroon-deep shadow-xl">
            <span className="text-6xl">{t(36)}</span>
            <span className="mt-3 text-3xl font-black tracking-widest">{t(37)}</span>
            <span className="mt-2 text-xs font-bold tracking-[.25em]">{t(38)}</span>
            <span className="text-sm font-black tracking-[.2em]">{t(39)}</span>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4">
          <Eyebrow s={t(33)} />
          <H2 s={t(34)} />
          <p className="reveal leading-relaxed text-muted">{t(35)}</p>
          <Blocks blocks={d.slice(40, 49)} />
        </div>
      </Section>

      <section className="bg-cream">
        <Section>
          <Eyebrow s={t(49)} />
          <H2 s={t(50)} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pairs.map(([cat, h]) => (
              <div key={cat} className="reveal rounded-2xl border-t-4 border-saffron bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                <p className="text-xs font-bold tracking-[.2em] text-red">{cat}</p>
                <h3 className="mt-2 text-xl font-bold text-maroon">{h}</h3>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Section>
        <div id="chapters" className="scroll-mt-24">
          <Eyebrow s={t(63)} />
          <H2 s={t(64)} />
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((c, n) => (
              <li key={n}>
                <a href={`#ch-${n + 1}`} className="flex h-full items-start gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:ring-saffron">
                  <span className="rounded-md bg-maroon px-2 py-0.5 text-xs font-black text-saffron">{c.slice(0, 2)}</span>
                  <span className="text-sm font-semibold text-ink">{c.slice(3)}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="reveal mt-16 rounded-3xl bg-gradient-to-br from-maroon to-maroon-deep p-8 text-center text-white shadow-xl sm:p-12">
          <p className="text-sm font-bold tracking-[.2em] text-saffron">{t(94)}</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">{t(95)}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">{t(96)}</p>
        </div>

        <div className="mt-16 flex flex-col gap-16">
          {CH.slice(0, -1).map((start, n) => (
            <section key={start} id={`ch-${n + 1}`} className="scroll-mt-24 border-t border-black/10 pt-10">
              <Blocks blocks={d.slice(start, CH[n + 1])} />
              <a href="#chapters" className="mt-6 inline-block text-sm font-bold text-red hover:underline">↑ All chapters</a>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
