import PostList from "@/components/PostList";
import { eventPosts } from "@/lib/content";

export const metadata = { title: "Events" };

export default function Page() {
  return <PostList posts={eventPosts} base="events" label="Events" />;
}
