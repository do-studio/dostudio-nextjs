"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CatalogPage() {
  return (
    <div className="flex flex-col bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] overflow-hidden">
        <Image
          src="https://cdn.sanity.io/images/0hjyj1bs/production/7bfc37b9f625c15b322b14d6e2a0a6b93aa30c0a-1920x1080.png"
          alt="Lulu Mall Kozhikode"
          fill
          className="object-cover brightness-[0.6]"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Reimagining Creativity <br /> at Lulu Mall with DoStudio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg md:text-2xl max-w-2xl opacity-90"
          >
            A creative collaboration redefining visual storytelling and brand
            experience.
          </motion.p>
        </div>
      </section>

      {/* Client Overview */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto py-20 px-6"
      >
        <h2 className="text-4xl font-bold mb-10 border-l-4 border-black pl-4">
          Client Overview
        </h2>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3 space-y-4">
            {[
              ["Client", "Lulu Mall, Kozhikode"],
              ["Industry", "Retail, Shopping & Entertainment"],
              ["Location", "Kozhikode, Kerala"],
              ["Agency", "DoStudio.co.in"],
            ].map(([label, value], i) => (
              <div key={i}>
                <p className="text-sm uppercase tracking-wide text-gray-500">
                  {label}
                </p>
                <p className="font-semibold text-lg">{value}</p>
              </div>
            ))}
          </div>

          <div className="md:w-2/3 space-y-5">
            <p className="text-gray-700 leading-relaxed text-lg">
              Lulu Mall Kozhikode stands as one of Kerala’s most iconic retail
              destinations, bringing together hundreds of brands under one roof.
              Beyond being a shopping space, it represents a lifestyle
              experience—vibrant, innovative, and constantly evolving.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              To keep up with this energy, Lulu Mall needed a creative partner
              capable of introducing fresh design perspectives and innovative
              visual storytelling across their communication channels.
            </p>
            <p className="text-xl font-medium text-black mt-4 italic">
              That’s where DoStudio stepped in.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Challenge Section */}
      <section className="bg-gray-50 py-24 px-6 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 border-l-4 border-black pl-4">
            The Challenge
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            With a massive daily footfall and a diverse audience from teenagers
            to families, Lulu Mall faces a creative challenge—keeping visuals,
            campaigns, and design concepts consistently engaging and innovative
            across all seasons and events.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
            <li>
              How do we maintain brand consistency while experimenting with new
              ideas?
            </li>
            <li>
              How can creativity translate into measurable engagement inside the
              mall and online?
            </li>
            <li>
              What kind of visual direction can make Lulu Mall stand out even
              further in Kerala’s market?
            </li>
          </ul>
        </div>
      </section>

      {/* Our Approach */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto py-24 px-6"
      >
        <h2 className="text-4xl font-bold mb-8 border-l-4 border-black pl-4">
          Our Approach
        </h2>

        <p className="text-gray-700 text-lg mb-10 leading-relaxed">
          At DoStudio, creativity is not just about aesthetics—it’s about
          relevance, connection, and continuous reinvention. Our strategy
          blended research, experimentation, and real-time adaptability.
        </p>

        <div className="space-y-16">
          {[
            {
              title: "1. Exploring Global and Local Inspirations",
              desc: `We studied top global retail design trends—from Dubai Mall’s luxury storytelling
              to Singapore’s experiential environments—while understanding Kerala’s cultural nuances.
              This fusion gave Lulu Mall a balance of global polish and regional soul.`,
            },
            {
              title: "2. Concept Ideation and Theme Building",
              desc: `We developed creative directions around key thematic pillars that guided seasonal campaigns.`,
              list: [
                "Seasonal Storytelling – visuals inspired by festivals and emotions.",
                "Minimal Luxe – premium, elegant layouts reflecting Lulu’s brand tone.",
                "Interactive Engagement – campaigns driving participation through digital touchpoints.",
                "Local Fusion – blending Kerala’s colors, art forms, and traditions into modern visuals.",
              ],
            },
            {
              title: "3. Collaborative Brainstorming with Lulu’s Team",
              desc: `We worked hand-in-hand with the marketing team to align our visual ideas with their
              event calendar, ensuring campaigns were immersive, timely, and emotionally resonant.`,
            },
            {
              title: "4. Multi-Platform Design Execution",
              desc: `Our creative concepts extended across every customer touchpoint, ensuring consistency and delight.`,
              list: [
                "In-Mall Branding – LED visuals, standees, thematic zones.",
                "Digital Campaigns – reels, social media creatives, festive promotions.",
                "Event Visuals – stage and award event backdrops with cohesive storytelling.",
              ],
            },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-3">{item.desc}</p>
              {item.list && (
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {item.list.map((l, idx) => (
                    <li key={idx}>{l}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Innovations */}
      <section className="bg-gray-50 py-24 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 border-l-4 border-black pl-4">
            Innovations Introduced
          </h2>
          <ul className="grid md:grid-cols-2 gap-6 text-lg text-gray-700">
            <li className="border-l-4 border-black pl-4">
              <strong>Adaptive Visual Moodboards:</strong> Dynamic design boards
              evolving per campaign.
            </li>
            <li className="border-l-4 border-black pl-4">
              <strong>Cultural + Modern Fusion:</strong> Blending Kerala’s art
              with futuristic layouts.
            </li>
            <li className="border-l-4 border-black pl-4">
              <strong>Motion-First Design:</strong> All visuals optimized for
              reels and storytelling.
            </li>
            <li className="border-l-4 border-black pl-4">
              <strong>Experiential Creative Zones:</strong> Turning shoppers
              into active participants.
            </li>
          </ul>
        </div>
      </section>

      {/* Results */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto py-24 px-6"
      >
        <h2 className="text-4xl font-bold mb-8 border-l-4 border-black pl-4">
          Results
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-3">
          <li>
            <strong>Higher Engagement:</strong> Increased campaign interaction
            across digital channels.
          </li>
          <li>
            <strong>Brand Recall Boost:</strong> Lulu’s campaigns became
            instantly recognizable.
          </li>
          <li>
            <strong>Customer Footfall Growth:</strong> Events drew massive
            participation.
          </li>
          <li>
            <strong>Positive Brand Perception:</strong> Lulu Mall became
            synonymous with innovation and freshness.
          </li>
        </ul>
      </motion.section>

      {/* Conclusion */}
      <section className="bg-black text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Conclusion</h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Our partnership with Lulu Mall Kozhikode is a testament to how
            creativity and strategy can coexist seamlessly. By merging artistic
            curiosity with market insight, DoStudio helped shape a visual
            identity that evolves with time—without losing its soul.
          </p>
          <p className="text-xl font-medium text-white italic">
            At DoStudio, we don’t just design campaigns. <br />
            We design experiences that make brands unforgettable.
          </p>
        </div>
      </section>
    </div>
  );
}
