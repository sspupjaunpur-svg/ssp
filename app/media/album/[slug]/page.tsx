import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/Blocks";
import { albums } from "@/lib/content";

export function generateStaticParams() {
  return albums.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/media/album/[slug]">) {
  const { slug } = await params;
  const a = albums.find((x) => x.slug === slug);
  return { title: a?.title ?? "Album" };
}

export default async function Page({ params }: PageProps<"/media/album/[slug]">) {
  const { slug } = await params;
  const a = albums.find((x) => x.slug === slug);
  if (!a) notFound();
  return (
    <>
      <PageHero title={a.title} crumbs={["Home", "Media", a.title]} />
      <Section>
        {/* shortcut: no lightbox, add one if users want in-page viewing */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {a.images.map((src, i) => (
            <a key={src} href={src} target="_blank" rel="noopener" className="group reveal mb-4 block overflow-hidden rounded-xl shadow-md ring-1 ring-black/5">
              <Image src={src} alt={`${a.title} photo ${i + 1}`} width={800} height={600} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="h-auto w-full transition duration-700 group-hover:scale-105" />
            </a>
          ))}
        </div>
        <Link href="/media" className="mt-6 inline-flex font-bold text-red hover:text-maroon">← Back to Media</Link>
      </Section>
    </>
  );
}
