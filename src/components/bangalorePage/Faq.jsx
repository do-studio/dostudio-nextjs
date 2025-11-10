"use client"
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";


const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="">
            <div
                className={`flex gap-x-10  ${isOpen ? "bg-white" : "bg-white"
                    } rounded-md md:gap-x-0  justify-between items-center  pl-0 p-4 cursor-pointer transition duration-300 ease-in-out `}
                onClick={toggleOpen}
            >
                <div className=" text-sm md:text-base pl-5">{question}</div>
                <div
                    className={`transform transition-transform ${isOpen ? "rotate-45" : "rotate-0"
                        }`}
                >
                    <FiPlus />
                </div>
            </div>
            <div
                className={`bg-white px-5 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <p className="p-4 pl-0 text-sm font-PoppinsRegular">{answer}</p>
            </div>
        </div>
    );
};



const Faq = ({ faqs }) => {
    return (
        <>
            <section className="w-11/12 xl:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 pb-20 pt-20 gap-y-5">
                <div className="h-full flex flex-col justify-center space-y-3">
                    <h5 className="text-5xl xl:text-7xl font-black uppercase text-center xl:text-left">
                        Frequently asked <span className="text-visaclr">questions?</span>
                    </h5>


                </div>
                <div className="">
                    {faqs?.map((dt, i) => (
                        <FAQItem key={i} question={dt.question} answer={dt.answer} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Faq;