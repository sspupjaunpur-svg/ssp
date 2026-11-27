import PageHero from "@/components/PageHero";
import MembershipSearch from "@/components/MembershipSearch";
import { Section } from "@/components/Blocks";
import { raw } from "@/lib/content";

export const metadata = { title: "Download Membership Card" };

export default function Page() {
  const d = raw("membershipCard");
  return (
    <>
      <PageHero title="Download Membership Card" />
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="reveal text-3xl font-extrabold text-maroon-deep sm:text-4xl">{d[4][1]}</h2>
          <p className="reveal mt-3 text-muted">{d[5][1]}</p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <MembershipSearch label={d[6][1]} placeholder={d[7][3]} notFound={[d[17][1], d[18][1]]} />
        </div>
      </Section>
    </>
  );
}
