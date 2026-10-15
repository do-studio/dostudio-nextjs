"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { client } from "../../../utils/sanity";

async function getClients() {
  const query = `*[_type == "client"] | order(orderRank){
    _id,
    title,
    image { alt, asset->{ url } }
  }`;

  try {
    return await client.fetch(query);
  } catch (err) {
    console.error("Error fetching clients for clients carousel:", err);
    return [];
  }
}

export default function ClientsCarouselSection({
  title = "Our Clients",
  description,
}) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients().then(setClients);
  }, []);

  if (!clients || clients.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 xl:py-20">
      <div className="w-11/12 xl:w-10/12 mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase text-black">
          {title}
        </h2>
        {description && (
          <p className="text-gray-500 mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <Marquee speed={60} pauseOnHover gradient={false}>
        {clients.map((c) => (
          <div
            key={c._id}
            className="h-20 w-20 md:h-32 md:w-32 xl:h-40 xl:w-40 relative mx-4 md:mx-8 shrink-0"
          >
            {c.image?.asset?.url && (
              <Image
                src={c.image.asset.url}
                alt={c.image.alt || c.title || "Client logo"}
                fill
                sizes="160px"
                className="object-contain grayscale hover:grayscale-0 duration-200"
              />
            )}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
