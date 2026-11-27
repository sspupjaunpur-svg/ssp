import PageHero from "@/components/PageHero";
import FormShell from "@/components/FormShell";
import { Area, Field } from "@/components/Fields";
import { Section } from "@/components/Blocks";
import { raw } from "@/lib/content";

export const metadata = { title: "Contact Us" };

export default function Page() {
  const d = raw("contact");
  return (
    <>
      <PageHero title="Contact Us" />
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="reveal text-3xl font-extrabold text-maroon-deep sm:text-4xl">{d[4][1]}</h2>
          <p className="reveal mt-2 text-muted">{d[5][1]}</p>
          <FormShell name="contact" submitLabel="Submit" className="mt-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your full name" required autoComplete="name" />
              <Field label="Mobile Number" name="mobile" type="tel" placeholder="10-digit mobile number" pattern="[6-9]\d{9}" required autoComplete="tel" />
              <Field label="Voter ID Number (if any)" name="voter_id" placeholder="Voter ID (optional)" />
              <Field label="Aadhaar Card Number" name="aadhar" inputMode="numeric" pattern="\d{12}" placeholder="12-digit Aadhaar number (optional)" />
              <Field label="State" name="state" placeholder="State" />
              <Field label="District" name="district" placeholder="District" />
              <Field label="Constituency" name="constituency" placeholder="Constituency" />
              <Field label="Subject" name="subject" placeholder="What is your message about?" required />
              <Area label="Brief in Detail" name="message" placeholder="Tell us a little more about how we can help" required rows={5} className="sm:col-span-2" />
            </div>
          </FormShell>
        </div>
      </Section>
    </>
  );
}
