import PageHero from "@/components/PageHero";
import Blocks, { Section } from "@/components/Blocks";
import { page } from "@/lib/content";

export const metadata = { title: "Party Wings" };

export default function Page() {
  const p = page("partyWings");
  return (
    <>
      <PageHero title={p.title} crumbs={p.crumbs} />
      <Section>
        <Blocks blocks={p.blocks} />
      </Section>
    </>
  );
}
