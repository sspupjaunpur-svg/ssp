import { notFound } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import { eventPosts } from "@/lib/content";

export function generateStaticParams() {
  return eventPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/details/[slug]">) {
  const { slug } = await params;
  const post = eventPosts.find((p) => p.slug === slug);
  return { title: post?.title ?? "Events" };
}

export default async function Page({ params }: PageProps<"/events/details/[slug]">) {
  const { slug } = await params;
  const post = eventPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  return <PostDetail post={post} base="events" label="Events" />;
}
