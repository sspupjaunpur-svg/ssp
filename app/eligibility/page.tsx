import PageHero from "@/components/PageHero";
import Blocks, { Btn, Section } from "@/components/Blocks";
import { page, raw } from "@/lib/content";

export const metadata = { title: "Eligibility" };

export default function Page() {
  const p = page("eligibility");
  const d = raw("eligibility");
  const t = (i: number) => d[i][1];
  const funds: [string, string][] = [];
  for (let i = 27; i < 41; i += 2) funds.push([t(i), t(i + 1)]);
  return (
    <>
      <PageHero title={p.title} crumbs={p.crumbs} />
      <Section>
        <div className="flex flex-col gap-10">
          <Blocks blocks={d.slice(4, 9)} />
          <div className="reveal flex items-center gap-6 rounded-3xl bg-gradient-to-br from-maroon to-maroon-deep p-8 text-white shadow-xl">
            <span className="text-7xl font-black text-saffron">{t(9)}</span>
            <span className="text-xl font-bold">{t(10)}</span>
          </div>
          <Blocks blocks={d.slice(11, 27)} />
          <div className="reveal grid gap-3 rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5">
            {funds.map(([name, pct]) => (
              <div key={name} className="grid grid-cols-[8rem_1fr_3rem] items-center gap-3 text-sm sm:grid-cols-[10rem_1fr_3rem]">
                <span className="font-semibold text-ink">{name}</span>
                <span className="h-3 overflow-hidden rounded-full bg-cream">
                  <span className="block h-full rounded-full bg-gradient-to-r from-saffron to-red" style={{ width: pct }} />
                </span>
                <span className="text-right font-bold text-maroon">{pct}</span>
              </div>
            ))}
          </div>
          <Blocks blocks={d.slice(41, 45)} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[45, 48, 51, 54].map((i) => (
              <div key={i} className="reveal flex flex-col rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
                <h4 className="text-lg font-bold text-maroon">{t(i)}</h4>
                <p className="mt-2 text-2xl font-black text-red">{t(i + 1).replace("Membership Fee: ", "")}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t(i + 2)}</p>
              </div>
            ))}
          </div>
          <div className="reveal rounded-3xl bg-cream p-8 text-center sm:p-12">
            <h3 className="text-2xl font-extrabold text-maroon-deep sm:text-3xl">{t(57)}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-muted">{t(58)}</p>
            <div className="mt-6"><Btn href="/join">{t(59)}</Btn></div>
          </div>
        </div>
      </Section>
    </>
  );
}
