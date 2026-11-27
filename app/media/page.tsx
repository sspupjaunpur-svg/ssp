import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import VideoModal from "@/components/VideoModal";
import { Section } from "@/components/Blocks";
import { albums, videos } from "@/lib/content";

export const metadata = { title: "Media" };

const h2 = "reveal text-3xl font-extrabold text-maroon-deep sm:text-4xl";

export default function Page() {
  return (
    <>
      <PageHero title="Media" />
      <Section>
        <h2 className={h2}>Photo Gallery</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {albums.map((a) => (
            <Link key={a.slug} href={`/media/album/${a.slug}`} className="group reveal overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                <Image src={a.thumb} alt={a.title} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 flex items-center justify-center bg-maroon-deep/60 text-sm font-bold text-saffron opacity-0 transition group-hover:opacity-100">View Album →</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <h3 className="font-bold text-maroon">{a.title}</h3>
                <span className="rounded-full bg-cream px-2 py-0.5 text-xs font-bold text-maroon">{a.images.length}</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <section className="bg-cream">
        <Section>
          <h2 className={h2}>Video Gallery</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <VideoModal key={i} youtube={v.id} title={v.title} className="group reveal block w-full overflow-hidden rounded-2xl bg-white text-left shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden bg-night">
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail */}
                  <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red text-2xl text-white shadow-lg transition group-hover:scale-110">▶</span>
                  </span>
                </div>
                <h3 className="p-4 font-bold text-maroon">{v.title}</h3>
              </VideoModal>
            ))}
          </div>
        </Section>
      </section>
    </>
  );
}
