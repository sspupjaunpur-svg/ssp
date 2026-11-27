import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/content";

export default function PostCard({ post, base }: { post: Post; base: "news" | "events" }) {
  return (
    <Link href={`/${base}/details/${post.slug}`} className="group reveal flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-cream">
        <Image src={post.image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-saffron px-3 py-1 text-xs font-bold text-maroon-deep">{post.date}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-bold text-maroon group-hover:text-red">{post.title}</h3>
        <span className="mt-auto text-sm font-bold text-red">Read more →</span>
      </div>
    </Link>
  );
}
