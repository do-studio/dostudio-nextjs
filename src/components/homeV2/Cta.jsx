"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { EASE_OUT, Reveal, SPRING, TypedText } from "./motion";

// Same EmailJS config as components/home/designs/ContactForm.jsx
const SERVICE_ID = "service_inkkj5n";
const TEMPLATE_ID = "template_jgdcpd8";
const PUBLIC_KEY = "kj60QfQm-VcE4717P";

const fieldClass =
  "flex items-center gap-3 rounded-[clamp(0.75rem,0.94vw,1.125rem)] bg-[#f6f561] px-[clamp(1rem,1.72vw,2.06rem)] h-[clamp(3.25rem,4.53vw,5.44rem)] w-full max-w-[615px] transition-[transform,box-shadow] duration-200 focus-within:-translate-x-1 focus-within:-translate-y-1 focus-within:shadow-[6px_6px_0px_0px_#1c1c1e]";
const labelClass =
  "shrink-0 text-[clamp(1rem,1.86vw,2.23rem)] font-semibold text-[#1c1c1e]";
const inputClass =
  "w-full min-w-0 bg-transparent text-[clamp(1rem,1.86vw,2.23rem)] font-medium text-[#1c1c1e] outline-none";

export default function Cta() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { msg_name: name, msg_phn_code: "+91", msg_phn: phone },
        PUBLIC_KEY
      );
      toast.dark("Message sent successfully");
      setName("");
      setPhone("");
    } catch {
      toast.error("Error sending message");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="mt-[clamp(3rem,4.43vw,5.31rem)] bg-[#ffa8f4] pb-[clamp(3rem,4.84vw,5.81rem)] pt-[clamp(3rem,5.83vw,7rem)]">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="mx-auto grid w-[89.5%] max-w-[1719px] grid-cols-1 gap-8 rounded-[clamp(1rem,1.46vw,1.75rem)] bg-white pb-[clamp(2rem,5.57vw,6.69rem)] pl-[clamp(1.5rem,4.01vw,4.81rem)] pr-[clamp(1.5rem,3.125vw,3.75rem)] pt-[clamp(2rem,3.125vw,3.75rem)] md:grid-cols-[41.1%_1fr] md:gap-0"
      >
        <div className="flex flex-col gap-[clamp(1.5rem,2.29vw,2.75rem)]">
          {/* Line breaks are kept (whitespace-pre-line), so it types out on three lines like the design. */}
          <TypedText
            as="h2"
            delay={0.4}
            speed={60}
            className="whitespace-pre-line text-[clamp(2.5rem,6.917vw,8.3rem)] font-bold leading-[1.024] text-[#1c1c1e]"
            text={"Ready\nTo Work\nWith Us?"}
          />
          
        </div>

        <Reveal className="flex flex-col" delay={0.35}>
          {/* Line breaks follow the Figma copy on desktop. */}
          <p className="text-[clamp(1rem,1.875vw,2.25rem)] leading-[1.278] text-[#3e3e3e] md:mt-[1.6vw]">
            Go beyond typical with Do Studio, the best digital marketing &amp; <br className="hidden md:block" />
            advertising agency in Calicut. You&apos;re not just choosing a campaign, <br className="hidden md:block" />
            you&apos;re choosing a partner who understands your brand &amp; crafts <br className="hidden md:block" />
            meaningful stories that connect. Tell us about your project &amp; <br className="hidden md:block" />
            get a free strategy call
          </p>
          <div className="mt-[clamp(1.5rem,2.92vw,3.5rem)] flex flex-col gap-[clamp(1rem,1.72vw,2.06rem)]">
            <label className={fieldClass}>
              <span className={labelClass}>Name :</span>
              <input
                type="text"
                name="msg_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className={inputClass}
              />
            </label>
            <label className={fieldClass}>
              <span className={labelClass}>Contact :</span>
              <input
                type="tel"
                name="msg_phn"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^\d\s+]/g, ""))}
                required
                inputMode="tel"
                autoComplete="tel"
                pattern="[0-9+\s]{7,15}"
                className={inputClass}
              />
            </label>
            <motion.button
            type="submit"
            disabled={sending}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...SPRING, delay: 0.7 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="group flex w-fit origin-left items-center gap-1 disabled:opacity-60 md:ml-[0.52vw]"
          >
            <span className="flex h-[clamp(2.75rem,3.75vw,4.5rem)] items-center rounded-full bg-[#1c1c1e] px-[clamp(1.25rem,2.24vw,2.69rem)] text-[clamp(1rem,1.906vw,2.29rem)] font-medium text-white">
              {sending ? "Sending..." : "Get Started"}
            </span>
            <Image
              src="/images/home2/process-arrow.svg"
              alt=""
              width={72}
              height={70}
              className={`h-auto w-[clamp(2.75rem,3.75vw,4.5rem)] transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45 ${sending ? "animate-spin" : ""}`}
            />
          </motion.button>
          </div>
        </Reveal>
      </motion.form>
    </section>
  );
}
