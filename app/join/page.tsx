import PageHero from "@/components/PageHero";
import JoinForm from "@/components/JoinForm";
import { Section } from "@/components/Blocks";
import { page, raw } from "@/lib/content";

export const metadata = { title: "Become a Member" };

export default function Page() {
  const p = page("join");
  const d = raw("join");
  const s = (a: number, b: number) => d.slice(a, b).map((x) => x[1]);
  return (
    <>
      <PageHero title={p.title} crumbs={p.crumbs} />
      <Section>
        <JoinForm states={s(38, 74)} docs={s(88, 93)} terms={s(115, 122)} note={d[83][1]} />
      </Section>
    </>
  );
}
