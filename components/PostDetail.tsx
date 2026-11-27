import Image from "next/image";
import Link from "next/link";
import PageHero from "./PageHero";
import { Section } from "./Blocks";
import { newsBody, type Post } from "@/lib/content";

export default function PostDetail({ post, base, label }: { post: Post; base: "news" | "events"; label: string }) {
  return (
    <>
      <PageHero title={post.title} crumbs={["Home", label, post.title]} />
      <Section>
        <div className="mx-auto max-w-4xl">
        <div className="reveal relative aspect-[16/9] overflow-hidden rounded-3xl shadow-xl">
          <Image src={post.image} alt={post.title} fill priority sizes="(min-width:1024px) 896px, 100vw" className="object-cover" />
        </div>
        <span className="mt-8 inline-block rounded-full bg-saffron px-4 py-1 text-sm font-bold text-maroon-deep">{post.date}</span>
        <h2 className="mt-4 text-3xl font-extrabold text-maroon-deep">{post.title}</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">{newsBody}</p>
        <Link href={`/${base}`} className="mt-10 inline-flex font-bold text-red hover:text-maroon">← Back to {label}</Link>
        </div>
      </Section>
    </>
  );
}
