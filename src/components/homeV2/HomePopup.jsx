"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { EASE_OUT } from "./motion";

// The "get free consultation" pop-up, as on the previous home page: it opens once per visit after a while on the page,
// asks for a name and phone number, sends them to the same EmailJS template as the contact form, then flips to a thank-you.
const DELAY = 40000; // ms on the page before it opens
const SEEN_KEY = "popupShown"; // the same key the previous home page used, so a visitor is only asked once per visit
const SERVICE_ID = "service_inkkj5n";
const TEMPLATE_ID = "template_jgdcpd8";
const PUBLIC_KEY = "kj60QfQm-VcE4717P";
const THANKS_MS = 3200;

const field =
  "w-full rounded-[14px] border-[1.67px] border-[#1c1c1e] bg-white px-4 py-3 text-[clamp(1rem,1.1vw,1.2rem)] font-medium text-[#1c1c1e] outline-none transition-[box-shadow,transform] duration-200 placeholder:text-[#1c1c1e]/45 focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[4px_4px_0_0_#1c1c1e]";

export default function HomePopup() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const nameRef = useRef(null);

  // Open once per visit, after DELAY.
  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(SEEN_KEY);
    } catch {
      // storage can be blocked (private mode); then it simply shows once per page load
    }
    if (seen) return;
    const t = setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(SEEN_KEY, "true");
      } catch {
        // ignore
      }
    }, DELAY);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // While open: the page behind stays put, Esc closes, and the first field is focused.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const before = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const focus = setTimeout(() => nameRef.current?.focus(), 450);
    return () => {
      html.style.overflow = before;
      window.removeEventListener("keydown", onKey);
      clearTimeout(focus);
    };
  }, [open, close]);

  // After a successful send, show the thank-you for a moment, then close.
  useEffect(() => {
    if (!sent) return;
    const t = setTimeout(close, THANKS_MS);
    return () => clearTimeout(t);
  }, [sent, close]);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { msg_name: name, msg_phn_code: code, msg_phn: phone }, PUBLIC_KEY);
      setSent(true);
      setName("");
      setPhone("");
    } catch {
      toast.error("Error sending message");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="popup"
          data-lenis-prevent
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1c1c1e]/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Get a free consultation"
        >
          {/* The card flips from the form to the thank-you. */}
          <motion.div
            className="relative w-full max-w-[min(520px,92vw)] [perspective:1200px]"
            initial={{ opacity: 0, y: 40, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="relative [transform-style:preserve-3d]"
              animate={{ rotateY: sent ? 180 : 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              {/* Front: the form. */}
              <div className="relative rounded-[clamp(20px,2vw,32px)] border-[1.67px] border-[#1c1c1e] bg-[#f6f561] p-[clamp(1.5rem,3vw,2.5rem)] shadow-[8px_8px_0_0_#1c1c1e] [backface-visibility:hidden]">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border-[1.67px] border-[#1c1c1e] bg-white text-lg text-[#1c1c1e] transition-colors hover:bg-[#1c1c1e] hover:text-white"
                >
                  ✕
                </button>
                <span className="inline-block rounded-full bg-[#ffa8f4] px-4 py-1 text-[clamp(0.8rem,0.9vw,1rem)] font-bold uppercase tracking-[0.06em] text-[#1c1c1e]">
                  Free consultation
                </span>
                <h2 className="mt-4 pr-10 text-[clamp(1.9rem,3.2vw,3.2rem)] font-bold uppercase leading-[0.98] tracking-[-0.03em] text-[#1c1c1e]">
                  Let&apos;s grow your brand
                </h2>
                <p className="mt-3 text-[clamp(0.95rem,1.05vw,1.15rem)] leading-[1.35] text-[#1c1c1e]/75">
                  Leave your number and our team will call you back.
                </p>
                <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
                  <input
                    ref={nameRef}
                    type="text"
                    name="msg_name"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={field}
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      name="msg_phn_code"
                      aria-label="Country code"
                      inputMode="tel"
                      autoComplete="tel-country-code"
                      required
                      pattern="\+?[0-9]{1,4}"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/[^\d+]/g, ""))}
                      className={`${field} !w-[5.5rem] shrink-0 text-center`}
                    />
                    <input
                      type="tel"
                      name="msg_phn"
                      placeholder="Phone number"
                      inputMode="tel"
                      autoComplete="tel-national"
                      required
                      pattern="[0-9\s]{6,15}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^\d\s]/g, ""))}
                      className={field}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-2 flex h-[clamp(2.9rem,3.4vw,3.6rem)] w-fit items-center rounded-full bg-[#1c1c1e] px-[clamp(1.5rem,2vw,2.4rem)] text-[clamp(1rem,1.2vw,1.35rem)] font-medium text-white transition-[transform,opacity] duration-200 hover:scale-[1.04] active:scale-95 disabled:opacity-60"
                  >
                    {sending ? "Sending..." : "Submit"}
                  </button>
                </form>
              </div>

              {/* Back: the thank-you. */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[clamp(20px,2vw,32px)] border-[1.67px] border-[#1c1c1e] bg-[#ffa8f4] p-8 text-center shadow-[8px_8px_0_0_#1c1c1e] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <h2 className="text-[clamp(2rem,3.4vw,3.4rem)] font-bold uppercase leading-[0.98] tracking-[-0.03em] text-[#1c1c1e]">Thank you</h2>
                <p className="mt-3 text-[clamp(1rem,1.1vw,1.2rem)] text-[#1c1c1e]/80">Our team will contact you shortly.</p>
                <div className="mt-6 h-2 w-3/4 overflow-hidden rounded-full bg-[#1c1c1e]/15">
                  <motion.div
                    className="h-full rounded-full bg-[#1c1c1e]"
                    initial={{ width: "0%" }}
                    animate={{ width: sent ? "100%" : "0%" }}
                    transition={{ duration: THANKS_MS / 1000, ease: "linear" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
