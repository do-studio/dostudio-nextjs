"use client"

import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import ContactForm from "../../components/home/designs/ContactForm";
import { Clients } from "../../components";
import Head from "next/head";


// export const metadata = {
//     title: "SEO COMPANY IN CALICUT",
//     description:
//         "Boost your online visibility with Do Studio SEO company in Calicut. We offer expert SEO strategies that drive traffic, increase rankings, and grow your business",
//     metadataBase: new URL("https://dostudio.co.in"), // Set the base domain
//     keywords:
//         "seo company in calicut, best seo company in calicut, seo companies in calicut, best seo companies in calicut, seo agency in calicut, best seo agency in calicut, seo services in calicut, best seo services in calicut",
//     openGraph: {
//         title: "SEO COMPANY IN CALICUT",
//         description:
//             "Boost your online visibility with Do Studio SEO company in Calicut. We offer expert SEO strategies that drive traffic, increase rankings, and grow your business",
//         url: `https://dostudio.co.in/seo-company-in-calicut`,
//         type: "article",
//     },
// };


const Landing = () => {
    return (
        <div className="min-h-screen ">
           
            <section
                className="h-screen bg-cover bg-center flex items-center justify-left text-white relative"
                style={{
                    backgroundImage:
                        "url('https://res.cloudinary.com/djswkzoth/image/upload/v1750076024/Do%20Studio%20Website/seo2_vivh9n.webp')",
                }}
            >
                <div className="absolute w-full h-full bg-black opacity-60" ></div>
                <div className="w-full px-2 text-center md:text-left md:w-11/12 mx-auto z-50 flex flex-col items-center md:items-start gap-5">
                    {/* You can add content here if needed */}
                    <h1 className="text-5xl xl:text-7xl font-black uppercase text-center md:text-left">SEO Company in Calicut <br /> Do Studio</h1>
                    <p className=" max-w-4xl ">Do Studio is the leading SEO company in Calicut, trusted by businesses to drive impactful digital growth. We specialize in enhancing your website’s visibility, attracting targeted traffic, and ensuring your business ranks higher in search engine results.</p>
                    <Link
                        href='/contact'
                        className="bg-primarygreen shadow-lg hover:shadow-xl text-black font-medium py-3 px-6 rounded-[3rem] w-full hover:scale-110 duration-200 text-center max-w-52 capitalize"
                    >
                        Contact Now
                    </Link>
                </div>
            </section>
            <section>
                <Clients/>
            </section>
            <section id="why-us" className="py-16 bg-white">
                <div className="md:container mx-auto px-4">
                    <h2 className="text-5xl xl:text-7xl font-black uppercase text-center xl:text-center">Our SEO Services</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">At Do Studio, we provide a wide range of SEO services designed to meet the unique needs of your business. Whether you’re a local startup or a growing enterprise, we tailor our strategies to maximize your online presence.</p>
                    <div className="grid   md:grid-cols-3 gap-8 items-center">

                        <div className="mb-3 bg-black  rounded-2xl hover:scale-105 duration-200 p-5">
                            <h3 className="text-xl font-semibold mb-0 flex items-center text-white">
                                <span className=" text-primarygreen  p-2 rounded-full mr-3">✓</span>
                                On-Page SEO
                            </h3>
                            <p className="text-gray-400 ml-10">We optimize every element of your website to ensure it's search engine-friendly and rank your website on top of search engine pages.</p>
                        </div>
                        <div className="mb-3 bg-black  rounded-2xl hover:scale-105 duration-200 p-5">
                            <h3 className="text-xl font-semibold mb-0 flex items-center text-white">
                                <span className="text-primarygreen p-2 rounded-full mr-3">✓</span>
                                Off-Page SEO
                            </h3>
                            <p className="text-gray-400 ml-10">Our off-page SEO services, including <b>link building</b> and <b>social media marketing</b>, help improve your domain authority.</p>
                        </div>
                        <div className="mb-3 bg-black  rounded-2xl hover:scale-105 duration-200 p-5">
                            <h3 className="text-xl font-semibold mb-0 flex items-center text-white">
                                <span className="text-primarygreen p-2 rounded-full mr-3">✓</span>
                                Local SEO
                            </h3>
                            <p className="text-gray-400 ml-10">We specialize in <b>local SEO</b> strategies that help businesses appear in <b>local search results</b> through <b>Google My Business optimization.</b></p>
                        </div>
                        <div className="mb-3 bg-black  rounded-2xl hover:scale-105 duration-200 p-5">
                            <h3 className="text-xl font-semibold mb-0 flex items-center text-white">
                                <span className="text-primarygreen p-2 rounded-full mr-3">✓</span>
                                Technical SEO
                            </h3>
                            <p className="text-gray-400 ml-10">We go beyond basic optimizations. Our technical SEO services address website speed, mobile-friendliness, site structure, and more.</p>
                        </div>
                        <div className="mb-3 bg-black  rounded-2xl hover:scale-105 duration-200 p-5">
                            <h3 className="text-xl font-semibold mb-0 flex items-center text-white">
                                <span className="text-primarygreen p-2  rounded-full mr-3">✓</span>
                                E-Commerce SEO
                            </h3>
                            <p className="text-gray-400 ml-10">For e-commerce businesses, we implement SEO strategies tailored to improve your product pages, category pages, and user experience.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="why-us" className="py-10 bg-white">
                <div className="md:container  mx-auto px-4">
                    <h2 className="text-5xl xl:text-7xl font-black uppercase text-center xl:text-center md:max-w-5xl mx-auto">Why Choose Do Studio as Your SEO Partner?</h2>

                    <div className="grid md:grid-cols-2 gap-8 items-center mt-4">
                        <div>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2 flex items-center">
                                    <span className="bg-primarygreen text-black p-2 rounded-full mr-3">✓</span>
                                    Proven Track Record
                                </h3>
                                <p className="text-gray-600 ml-10">With years of experience, we’ve helped businesses in Calicut and beyond improve their Google rankings and achieve higher visibility.</p>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2 flex items-center">
                                    <span className="bg-primarygreen text-black p-2 rounded-full mr-3">✓</span>
                                    Tailored SEO Strategies
                                </h3>
                                <p className="text-gray-600 ml-10">We understand that every business is unique, so we offer customized SEO solutions based on your industry and goals.</p>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2 flex items-center">
                                    <span className="bg-primarygreen text-black p-2 rounded-full mr-3">✓</span>
                                    Transparent Reporting
                                </h3>
                                <p className="text-gray-600 ml-10">We provide regular updates and detailed reports on the performance of your SEO campaigns, ensuring full transparency and accountability.</p>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2 flex items-center">
                                    <span className="bg-primarygreen text-black p-2 rounded-full mr-3">✓</span>
                                    Experienced SEO Experts
                                </h3>
                                <p className="text-gray-600 ml-10">Our team of dedicated professionals stays up-to-date with the latest SEO trends and best practices to deliver the best results for your business.</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 rounded-lg">
                            <img
                                src={"https://res.cloudinary.com/djswkzoth/image/upload/v1750076030/Do%20Studio%20Website/seo_mqmnj1.webp"}
                                alt="seo company in calicut"
                                className="rounded-lg shadow-md w-full h-auto"
                                width={600}
                                height={400}
                                
                            />
                        </div>
                    </div>
                    <div className="flex justify-center pt-5">
                        <Link
                            href='/contact'
                            className="bg-primarygreen shadow-lg hover:shadow-xl text-black font-medium py-3 px-6 rounded-[3rem]  w-full  hover:scale-110 duration-200 text-center max-w-52 capitalize"
                        >
                            Get A Quote
                        </Link>
                    </div>
                </div>
            </section>



            <section className="py-10 xl:py-20" id="serivesect">
                <div className="bg-black text-white w-11/12 overflow-hidden rounded-3xl xl:rounded-[3rem] p-8 sm:p-10 mx-auto justify-center items-center flex flex-col   gap-5 xl:gap-10 relative">
                    <div className="flex flex-col items-center gap-5 py-10">

                        <h2 className="font-black text-4xl xl:text-6xl uppercase text-center max-w-4xl">
                            Let’s Boost Your Online Visibility Together
                        </h2>
                        <p className="text-gray-400 text-justify md:text-center max-w-4xl">
                            Ready to take your business to the next level? Do Studio, your trusted SEO company in Calicut, is here to help. Whether you need SEO for small business websites or enterprise-level SEO solutions, we have the expertise to make your brand visible online.
                        </p>
                        <Link
                            href='/contact'
                            className="bg-primarygreen shadow-lg hover:shadow-xl text-black font-medium py-3 px-6 rounded-[3rem]  w-full  hover:scale-110 duration-200 text-center max-w-52 capitalize"
                        >
                            Contact Now
                        </Link>
                    </div>
                </div>
            </section>


            <section className='relative flex justify-center'>
                <section className='bg-white w-full xl:w-full mx-auto text-center py-10 xl:py-20 flex flex-col gap-5'>
                    <h4 className='text-5xl xl:text-7xl font-black text-black'>Get in Touch with <br /> Do Studio Today!</h4>
                    <p className='xl:w-10/12 w-full mx-auto px-5'>If you're looking for a reliable SEO company in Calicut, get in touch with Do Studio now to schedule a free consultation. Let's discuss how our SEO strategies can help drive more traffic, increase leads, and grow your business.</p>
                    <ContactForm width='1/2' />

                </section>
            </section>


        </div>
    );
};

export default Landing;
