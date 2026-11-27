import Image from "next/image";
import PageHero from "@/components/PageHero";
import Blocks, { Section } from "@/components/Blocks";
import { page, raw } from "@/lib/content";

export const metadata = { title: "About Us" };

// flag stripes use the official 14" : 4" : 6" proportions
const STRIPES = [
  { h: 13, w: 14, cls: "bg-saffron" },
  { h: 15, w: 4, cls: "bg-white" },
  { h: 17, w: 6, cls: "bg-red" },
];

export default function Page() {
  const p = page("about");
  const d = raw("about");
  const t = (i: number) => d[i][1];
  return (
    <>
      <PageHero title={p.title} crumbs={p.crumbs} />
      <Section>
        <h2 className="reveal text-3xl font-extrabold text-maroon-deep sm:text-4xl">{t(4)}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[[5, 6, 0], [7, 8, 9]].map(([l, v, n]) => (
            <div key={l} className="reveal rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5">
              <p className="text-sm font-bold tracking-widest text-red uppercase">{t(l)}</p>
              <h3 className="mt-2 text-2xl font-bold text-maroon">{t(v)}</h3>
              {n > 0 && <p className="mt-1 text-muted">{t(n)}</p>}
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-cream">
        <Section>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="reveal">
              <h2 className="text-3xl font-extrabold text-maroon-deep sm:text-4xl">{t(10)}</h2>
              <p className="mt-3 text-muted">{t(12)}</p>
              <div className="mt-6 flex aspect-[3/2] w-full max-w-md flex-col overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10 animate-flag-wave">
                {STRIPES.map((s) => (
                  <div key={s.h} className={`${s.cls} relative`} style={{ flex: s.w }}>
                    {s.w === 14 && (
                      <Image src={d[11][1]} alt={d[11][2]} width={120} height={120} className="absolute left-1/2 top-1/2 h-3/5 w-auto -translate-x-1/2 -translate-y-1/2 object-contain" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {STRIPES.map((s) => (
                <div key={s.h} className="reveal flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                  <span aria-hidden className={`mt-1 h-10 w-3 shrink-0 rounded-full ring-1 ring-black/10 ${s.cls}`} />
                  <div>
                    <h3 className="font-bold text-maroon">{t(s.h)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{t(s.h + 1)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      <Section>
        <Blocks blocks={d.slice(19)} />
      </Section>
    </>
  );
}
