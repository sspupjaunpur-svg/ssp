import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import VideoModal from "@/components/VideoModal";
import PostCard from "@/components/PostCard";
import { Btn, Section } from "@/components/Blocks";
import { raw, newsPosts, eventPosts } from "@/lib/content";

const d = raw("index");
const t = (i: number) => d[i][1];
const eyebrow = "reveal text-sm font-bold tracking-[.25em] text-red";
const h2 = "reveal mt-3 text-3xl font-extrabold text-maroon-deep sm:text-4xl";

function Head({ title, href, label }: { title: string; href: string; label: string }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <h2 className={h2}>{title}</h2>
      <Link href={href} className="reveal font-bold text-red hover:text-maroon">{label} →</Link>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroSlider>
        <p className="animate-fade-up text-sm font-bold tracking-[.35em] text-saffron">{t(0)}</p>
        <h1 className="animate-fade-up mt-3 max-w-3xl text-4xl font-black leading-tight [animation-delay:.1s] sm:text-6xl lg:text-7xl">
          <span className="text-gradient">{t(1)}</span>
        </h1>
        <p className="animate-fade-up mt-6 text-xl font-bold [animation-delay:.2s] sm:text-2xl">{t(2)}</p>
        <p className="animate-fade-up mt-3 max-w-2xl text-white/85 [animation-delay:.3s] sm:text-lg">{t(3)}</p>
        <div className="animate-fade-up mt-8 flex flex-wrap gap-4 [animation-delay:.4s]">
          <Btn href="/join">{t(4)}</Btn>
          <Btn href="/donate" light>{t(5)}</Btn>
        </div>
      </HeroSlider>

      {/* Vision */}
      <Section className="grid items-center gap-12 lg:grid-cols-2">
        <div className="reveal relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
          <Image src="/uploads/sliders/slider2.jpg" alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          <div aria-hidden className="flag-bar absolute inset-x-0 bottom-0 h-2" />
        </div>
        <div className="flex flex-col gap-4">
          <p className={eyebrow}>{t(6)}</p>
          <h2 className={h2}>{t(7)}</h2>
          <p className="reveal text-lg font-bold text-maroon">{t(8)}</p>
          <p className="reveal leading-relaxed text-muted">{t(9)}</p>
          <div className="reveal mt-2"><Btn href="/vision">{t(10)}</Btn></div>
        </div>
      </Section>

      {/* Movement */}
      <section className="bg-gradient-to-br from-maroon to-maroon-deep text-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-2">
          {[[11, 12, 13, 14, 15, "/join"], [16, 17, 18, null, 19, "/vision"]].map(([e, h, p1, p2, cta, href]) => (
            <div key={String(e)} className="reveal flex flex-col gap-4 rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10">
              <p className="text-sm font-bold tracking-[.25em] text-saffron">{t(e as number)}</p>
              <h2 className="text-2xl font-extrabold sm:text-3xl">{t(h as number)}</h2>
              <p className={p2 ? "font-bold text-saffron-soft" : "leading-relaxed text-white/80"}>{t(p1 as number)}</p>
              {p2 && <p className="leading-relaxed text-white/80">{t(p2 as number)}</p>}
              <div className="mt-auto pt-2"><Btn href={href as string} light>{t(cta as number)}</Btn></div>
            </div>
          ))}
        </div>
      </section>

      {/* Video */}
      <Section>
        <VideoModal src="/images/hero-loop.mp4" title={t(22)} className="group reveal relative block aspect-video w-full overflow-hidden rounded-3xl shadow-2xl">
          <Image src={t(20)} alt="" fill sizes="(min-width:1152px) 1104px, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
          <span aria-hidden className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-red text-3xl text-white shadow-xl ring-8 ring-white/30 transition group-hover:scale-110 sm:h-24 sm:w-24">▶</span>
          <span className="absolute bottom-6 left-6 text-left text-2xl font-extrabold text-white sm:text-3xl">{t(22)}</span>
        </VideoModal>
      </Section>

      {/* Priorities */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className={eyebrow}>{t(24)}</p>
            <h2 className={h2}>{t(25)}</h2>
            <p className="reveal mt-4 text-muted">{t(26)}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[28, 32, 36, 40].map((i) => (
              <article key={i} className="group reveal relative flex flex-col gap-3 overflow-hidden rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
                <span aria-hidden className="absolute right-4 top-3 text-5xl font-black text-saffron/30">{t(i + 1)}</span>
                <Image src={t(i)} alt="" width={64} height={64} className="h-16 w-16 object-contain transition group-hover:scale-110" />
                <h3 className="text-lg font-bold text-maroon">{t(i + 2)}</h3>
                <p className="text-sm leading-relaxed text-muted">{t(i + 3)}</p>
              </article>
            ))}
          </div>
          <div className="reveal mt-10 text-center"><Btn href="/rebuildingPlan">{t(27)}</Btn></div>
        </div>
      </section>

      <Section>
        <Head title={t(44)} href="/news" label={t(45)} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsPosts.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} base="news" />)}
        </div>
      </Section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Head title={t(55)} href="/events" label={t(56)} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventPosts.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} base="events" />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-night text-white">
        <Image src={t(71)} alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-maroon-deep via-maroon-deep/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="reveal text-sm font-bold tracking-[.25em] text-saffron">{t(66)}</p>
          <h2 className="reveal mt-3 max-w-2xl text-3xl font-extrabold sm:text-5xl">{t(67)}</h2>
          <p className="reveal mt-5 max-w-2xl text-white/85">{t(68)}</p>
          <div className="reveal mt-8 flex flex-wrap gap-4">
            <Btn href="/join" light>{t(69)}</Btn>
            <Btn href="/donate">{t(70)}</Btn>
          </div>
        </div>
      </section>
    </>
  );
}
