import { notFound } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import { newsPosts } from "@/lib/content";

export function generateStaticParams() {
  return newsPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/details/[slug]">) {
  const { slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);
  return { title: post?.title ?? "News" };
}

export default async function Page({ params }: PageProps<"/news/details/[slug]">) {
  const { slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  return <PostDetail post={post} base="news" label="News" />;
}
