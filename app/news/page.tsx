import PostList from "@/components/PostList";
import { newsPosts } from "@/lib/content";

export const metadata = { title: "News" };

export default function Page() {
  return <PostList posts={newsPosts} base="news" label="News" />;
}
