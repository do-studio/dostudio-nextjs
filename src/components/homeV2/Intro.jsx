import { Reveal, TypedText } from "./motion";
import StrategyCall from "./StrategyCall";

export default function Intro() {
  return (
    <section className="w-full bg-[#f6f561] pt-[clamp(2.5rem,3.96vw,4.75rem)] pb-[clamp(2.5rem,3.96vw,4.75rem)]">
      <div className="mx-auto w-[89.5%] max-w-[1718px]">
        <TypedText
          as="h1"
          delay={0.2}
          speed={45}
          className="text-[clamp(1.875rem,3.889vw,4.666rem)] font-bold leading-[1.2] text-[#1c1c1e] md:leading-[1.444]"
          text="Best Digital Marketing Agency in Calicut, Kerala"
        />
        <Reveal
          as="p"
          delay={0.25}
          y={24}
          className="mt-[clamp(0.5rem,0.31vw,0.375rem)] max-w-[min(1620px,84.375vw)] text-[clamp(1rem,1.875vw,2.25rem)] leading-[1.361] text-[#1c1c1e]"
        >
          Do Studio is the best digital marketing agency in Calicut for brands that want measurable
          growth, not just good-looking posts. From our Kozhikode studio, we run SEO, social media
          marketing, PPC and content campaigns, backed by branding, packaging, production and web
          design under one roof. Known as a creative advertising agency in Calicut, we now work with
          local startups and global brands alike, building strategies around your goals and reporting
          on what actually moves the needle.
        </Reveal>
        <StrategyCall name="Get a Free Strategy Call" href="/contact" />

      </div>
    </section>
  );
}
