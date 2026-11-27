import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/Blocks";
import { page, raw } from "@/lib/content";

export const metadata = { title: "Leadership" };

const tel = (s: string) => `tel:${s.replace(/[^\d+]/g, "")}`;

export default function Page() {
  const p = page("leadership");
  const d = raw("leadership");
  const t = (i: number) => d[i][1];
  const team: { img: string; name: string; role: string; phone: string }[] = [];
  for (let i = 13; d[i]?.[0] === "img"; i += 4) team.push({ img: d[i][1], name: t(i + 1), role: t(i + 2), phone: t(i + 3) });
  return (
    <>
      <PageHero title={p.title} crumbs={p.crumbs} />
      <Section>
        <p className="reveal text-center text-sm font-bold tracking-[.2em] text-red uppercase">{t(4)}</p>
        <h2 className="reveal mt-2 text-center text-3xl font-extrabold text-maroon-deep sm:text-4xl">{t(5)}</h2>
        <div className="reveal mx-auto mt-10 grid max-w-4xl items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-maroon to-maroon-deep p-6 text-white shadow-2xl sm:grid-cols-[240px_1fr] sm:p-10">
          <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full ring-4 ring-saffron sm:w-full">
            <Image src={d[6][1]} alt={d[6][2]} fill sizes="240px" className="object-cover" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-3xl font-extrabold text-saffron">{t(7)}</h3>
            <p className="mt-2 text-xl font-semibold">{t(8)}</p>
            <p className="mt-1 text-white/80">{t(9)}</p>
            <a href={tel(t(10))} className="mt-5 inline-flex rounded-full bg-saffron px-5 py-2 font-bold text-maroon-deep hover:bg-saffron-soft">📞 {t(10)}</a>
          </div>
        </div>
      </Section>
      <section className="bg-cream">
        <Section>
          <p className="reveal text-center text-sm font-bold tracking-[.2em] text-red uppercase">{t(11)}</p>
          <h2 className="reveal mt-2 text-center text-3xl font-extrabold text-maroon-deep sm:text-4xl">{t(12)}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <article key={m.name} className="group reveal overflow-hidden rounded-2xl bg-white text-center shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-square overflow-hidden bg-warm">
                  <Image src={m.img} alt={m.name} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover object-top transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flag-bar h-1" aria-hidden />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-maroon">{m.name}</h3>
                  <p className="text-sm font-semibold text-red">{m.role}</p>
                  <a href={tel(m.phone)} className="mt-2 inline-block text-sm text-muted hover:text-maroon">{m.phone}</a>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </section>
    </>
  );
}
