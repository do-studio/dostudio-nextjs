"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { LogoDO } from "../../../../public/images";

// CircleTimer Component
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
        clearInterval(interval); // Clear interval when progress reaches 100
        if (onComplete) onComplete();
      }
    };

    // Start interval
    interval = setInterval(updateProgress, 50);

    return () => {
      clearInterval(interval); // Clean up interval on component unmount
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

// Main PopupForm Component
const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [phn, setPhn] = useState("");

  useEffect(() => {
    // Check if the popup has been shown during this session
    const hasShown = sessionStorage.getItem("popupShown");

    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("popupShown", "true"); // Mark the popup as shown
      }, 20000);

      return () => clearTimeout(timer);
    }

    // Clear session storage when the page is closed
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
      // Lock scroll on body and html
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Restore scroll
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
    setShowCloseButton(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = "service_inkkj5n";
    const templateId = "template_jgdcpd8";
    const publicKey = "kj60QfQm-VcE4717P";

    // Create a new object that contains dynamic template params
    const templateParams = {
      msg_name: name,
      msg_phn_code: value,
      msg_phn: phn,
    };

    // Send the email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        toast.dark("Message sent successfully", response);
        setName("");
        setValue("");
        setPhn("");
      })
      .catch((error) => {
        toast.error("Error sending email", error);
      });

    // Close popup after 2 seconds
    setTimeout(() => {
      closePopup();
    }, 1000);
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#ffffff] p-6 xl:p-10 xl:py-20 rounded-[1.5rem] shadow-2xl w-[90%] md:w-[30%] relative">
            <img
              className="h-60 w-60 xl:h-[350px] xl:w-[350px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] opacity-5 z-10"
              src={LogoDO.src}
              alt=""
            />
            <div className="absolute top-3 right-5">
              {/* <CircleTimer
                duration={5000}
                onComplete={() => {
                  setShowCloseButton(true);
                }}
              /> */}

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
      )}
    </div>
  );
};

export default PopupForm;
