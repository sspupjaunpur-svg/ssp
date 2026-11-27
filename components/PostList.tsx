import PageHero from "./PageHero";
import PostCard from "./PostCard";
import { Section } from "./Blocks";
import type { Post } from "@/lib/content";

export default function PostList({ posts, base, label }: { posts: Post[]; base: "news" | "events"; label: string }) {
  return (
    <>
      <PageHero title={label} crumbs={["Home", label]} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => <PostCard key={p.slug} post={p} base={base} />)}
        </div>
      </Section>
    </>
  );
}
