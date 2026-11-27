import PageHero from "@/components/PageHero";
import Blocks, { Section } from "@/components/Blocks";
import { page } from "@/lib/content";

export const metadata = { title: "Terms of Use" };

export default function Page() {
  const p = page("terms");
  return (
    <>
      <PageHero title={p.title} crumbs={p.crumbs} />
      <Section>
        <Blocks blocks={p.blocks} />
      </Section>
    </>
  );
}
