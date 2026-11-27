import Image from "next/image";
import PageHero from "@/components/PageHero";
import DonateForm from "@/components/DonateForm";
import { Section } from "@/components/Blocks";
import { raw } from "@/lib/content";

export const metadata = { title: "Make a Donation" };

export default function Page() {
  const d = raw("donate");
  return (
    <>
      <PageHero title="Make a Donation" />
      <Section>
        <div className="mx-auto max-w-4xl">
          <p className="reveal text-center text-lg text-muted">{d[4][1]}</p>
          <div className="reveal mx-auto mt-10 max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl ring-1 ring-black/5">
            <h2 className="text-xl font-bold text-maroon">{d[5][1]}</h2>
            <div className="flag-bar mx-auto mt-3 h-1 w-16 rounded-full" aria-hidden />
            <Image src="/images/qr.webp" alt={d[6][2]} width={320} height={320} className="mx-auto mt-5 h-auto w-full max-w-[260px]" />
          </div>
          <p className="my-10 flex items-center gap-4 text-sm font-bold tracking-widest text-red uppercase before:h-px before:flex-1 before:bg-black/10 after:h-px after:flex-1 after:bg-black/10">{d[7][1]}</p>
          <DonateForm />
        </div>
      </Section>
    </>
  );
}
