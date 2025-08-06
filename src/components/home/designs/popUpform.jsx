"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { LogoDO } from "../../../../public/images";

// CircleTimer Component (unchanged)
const CircleTimer = ({ duration, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    let interval;

    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    };

    interval = setInterval(updateProgress, 50);

    return () => {
      clearInterval(interval);
    };
  }, [duration, onComplete]);

  const size = 36;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-9 h-9">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primarygreen"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
    </div>
  );
};

// Main PopupForm Component with Flip Animation and Close Animation
const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [phn, setPhn] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showSmiley, setShowSmiley] = useState(false);


  useEffect(() => {
    const hasShown = sessionStorage.getItem("popupShown");
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("popupShown", "true");
      }, 40000);
      return () => clearTimeout(timer);
    }

    const clearSessionStorage = () => {
      sessionStorage.clear();
    };
    window.addEventListener("beforeunload", clearSessionStorage);
    return () => {
      window.removeEventListener("beforeunload", clearSessionStorage);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const closePopup = () => {
    // Step 1: Start fade out
    setIsClosing(true);

    // Step 2: After fade completes, show smiley
    setTimeout(() => {
      setShowSmiley(true);

      // Step 3: Keep smiley for 1 second then close
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
        setIsSubmitted(false);
        setShowSmiley(false);
      }, 1000);
    }, 500); // Match this with fade duration
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_inkkj5n";
    const templateId = "template_jgdcpd8";
    const publicKey = "kj60QfQm-VcE4717P";

    const templateParams = {
      msg_name: name,
      msg_phn_code: value,
      msg_phn: phn,
    };
   

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        setIsSubmitted(true); // Trigger the flip animation

        // Close popup after 3 seconds (after animation completes)
        setTimeout(() => {
          closePopup();
        }, 3000);
      })
      .catch((error) => {
        toast.error("Error sending email", error);
      });
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          {/* Main Card Container with Flip Animation */}
          <div className={`relative w-[90%] md:w-[30%] h-[430px] ${isSubmitted ? 'flipped' : ''}`}>
            {/* Front Side of Card (Form) */}
            <div className={`absolute w-full h-full bg-[#ffffff] flex flex-col justify-center items-center p-6 xl:p-10 rounded-[1.5rem] shadow-2xl backface-hidden ${isSubmitted ? 'rotate-y-180' : 'rotate-y-0'}`}>
              {/* Closing Overlay - shown when closing without submit */}


              {showSmiley && (
                <div className="absolute rotate-90 inset-0 flex items-center justify-center z-20  text-8xl">
                  :(
                </div>
              )}

              {/* Form Content - fades out first */}
              <div className={`${isClosing ? 'opacity-0 transition-opacity duration-500' : 'opacity-100'} w-full h-full flex flex-col items-center justify-center`}>
                <img
                  className="h-60 w-60 xl:h-[350px] xl:w-[350px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] opacity-5 z-10"
                  src={LogoDO.src}
                  alt=""
                />
                <div className="absolute top-3 right-5">
                  <button
                    onClick={closePopup}
                    className="absolute top-1 right-3 text-xl text-gray-500 hover:text-gray-800"
                  >
                    &times;
                  </button>
                </div>
                <h2 className="text-xl xl:text-4xl text-center font-normal mb-4 uppercase">
                  get free
                  <br /> <span className="font-bold">consultation now</span>
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center w-full z-20 relative"
                >
                  <div className="mb-4 flex flex-col gap-2 w-full">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full p-2 pl-0 border-b-2 bg-transparent placeholder:text-gray-600 outline-none"
                      name="msg_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <div className="w-full flex p-2 pl-0 bg-transparent border-b-2">
                      <PhoneInput
                        required
                        className="phonecode w-24 outline-none !bg-transparent"
                        international
                        name="msg_phn_code"
                        defaultCountry="IN"
                        value={value}
                        onChange={setValue}
                      />
                      <input
                        className="w-full bg-transparent outline-none placeholder:text-gray-600"
                        type="number"
                        inputMode="numeric"
                        placeholder="Mobile"
                        name="msg_phn"
                        value={phn}
                        onChange={(e) => setPhn(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-primarygreen mt-5 text-black hover:bg-black hover:text-white duration-200 h-10 px-10 w-fit rounded-full mx-auto"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            {/* Back Side of Card (Thank You) */}
            <div className={`absolute w-full h-full bg-white p-6 xl:p-10 rounded-[1.5rem] shadow-2xl backface-hidden ${isSubmitted ? 'rotate-y-0' : 'rotate-y-180'}`}>
              <div className={`${isClosing ? 'opacity-0 transition-opacity duration-500' : 'opacity-100'} flex flex-col items-center justify-center h-full`}>
                <img
                  className="h-60 w-60 xl:h-[350px] xl:w-[350px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] opacity-5 z-10"
                  src={LogoDO.src}
                  alt=""
                />
                <h2 className="text-xl xl:text-4xl text-center mb-4 uppercase font-semibold">
                  THANK YOU
                </h2>
                <p className="text-black mb-6">Our team will contact you shortly.</p>
                <div className="w-full rounded-full h-2.5">
                  <div className={`bg-primarygreen h-2.5 rounded-full ${isSubmitted ? 'animate-progress' : ''}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add these styles to your global CSS */}
      <style jsx>{`
        .backface-hidden {
          backface-visibility: hidden;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .flipped {
          perspective: 1000px;
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PopupForm;