import PageHero from "@/components/PageHero";
import Blocks, { Section } from "@/components/Blocks";
import { page } from "@/lib/content";

export const metadata = { title: "Our Exemplars" };

export default function Page() {
  const p = page("roleModels");
  return (
    <>
      <PageHero title={p.title} crumbs={p.crumbs} />
      <Section>
        <Blocks blocks={p.blocks} />
      </Section>
    </>
  );
}
