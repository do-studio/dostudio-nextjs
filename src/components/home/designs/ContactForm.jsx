"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { LogoDO } from "../../../../public/images";



// Main PopupForm Component
const ContactForm = () => {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [phn, setPhn] = useState("");



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

    };

    return (
        <div className=" ">

            <div className="flex items-center justify-center z-50 ">
                <div className="bg-[#ffffff] p-6 xl:p-10 xl:py-20 flex w-full md:w-1/2  justify-center  items-center rounded-[1.5rem] relative">

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center w-full z-20 relative border p-10 border-gray-500 rounded-3xl"
                    >
                        <div className="mb-4 flex flex-col gap-2 w-full">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full p-2 pl-0 border-b border-gray-500  bg-transparent placeholder:text-gray-600 outline-none"
                                name="msg_name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <div className="w-full flex p-2 pl-0 bg-transparent border-b border-gray-500 ">
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
                            className="bg-primarygreen text-black shadow-lg hover:shadow-xl duration-200 shadow-gray-200 py-4 uppercase font-semibold rounded-full px-10 w-fit"
                        >
                            Get Started
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ContactForm;
