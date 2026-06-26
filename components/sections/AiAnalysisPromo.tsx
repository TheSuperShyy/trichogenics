import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";

const DOCTORS = "/media/ai-analysis/doctors.png";
const ALT = "Dr. Asi Peretz and Dr. Eric Peretz";

/**
 * AI hair-analysis promo banner — echoes the legacy site's high-energy section.
 * A light cap and a navy rule sit above a cool-gray band; the two surgeons
 * (transparent cut-out) are anchored to the band's bottom and tall enough to
 * break above the rule, so the line crosses them below the shoulders. Headline +
 * copy + CTA sit on the start side; the CTA jumps to the HairGen tool below.
 */
export function AiAnalysisPromo() {
  return (
    <section className="relative overflow-hidden lg:min-h-[32rem]">
      {/* Background: light cap · navy rule · gray band. The cap matches the section
          above so the rule reads as a single line drawn across a continuous field. */}
      <div aria-hidden className="absolute inset-0 -z-10 flex flex-col">
        <div className="h-24 bg-sand-50 sm:h-28 lg:h-[9rem]" />
        <div className="h-1 bg-brand-800" />
        <div className="flex-1 bg-[#E7EAF0]" />
      </div>

      {/* Mobile: surgeons sit at the top, crossing the rule */}
      <div className="flex justify-center lg:hidden">
        <Image
          src={DOCTORS}
          alt={ALT}
          width={946}
          height={752}
          sizes="66vw"
          className="h-auto w-[min(18rem,66vw)] object-contain"
        />
      </div>

      <Container className="relative pb-12 pt-4 lg:pb-16 lg:pt-[10rem]">
        <Reveal className="max-w-xl">
          <Eyebrow>Free analysis</Eyebrow>
          <h2 className="mt-3 text-h2 text-brand-800">
            Free AI Hair Analysis <span className="text-ink-700">in minutes</span>
          </h2>
          <p className="mt-4 text-base text-ink-700">
            Wondering why you&rsquo;re losing hair?{" "}
            <strong className="font-semibold text-brand-800">Fill out our short form</strong> and get a
            detailed AI-powered analysis of your scalp and hair health,{" "}
            <strong className="font-semibold text-brand-800">completely free.</strong>
          </p>
          <a href="#ai-analysis" className={buttonVariants({ variant: "dark", size: "lg", className: "mt-8" })}>
            Start your free analysis
          </a>
        </Reveal>
      </Container>

      {/* Desktop: surgeons anchored to the band's bottom, rising past the rule */}
      <Image
        src={DOCTORS}
        alt=""
        aria-hidden
        width={946}
        height={752}
        sizes="40vw"
        className="pointer-events-none absolute bottom-0 end-[3vw] hidden h-[28rem] w-auto object-contain lg:block xl:end-[6vw] xl:h-[30rem]"
      />
    </section>
  );
}
