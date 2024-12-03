import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/creatives?&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

const DigitalMarketing = async () => {
  const workdata = await getData();

  // Sort the data by the order field (replace 'order' with the correct field name)
  const sortedData = workdata.data?.sort(
    (a, b) => a.attributes.order - b.attributes.order
  );

  return (
    <>

      <main className="min-h-screen w-full bg-white">
        <div className="w-11/12 xl:w-9/12 mx-auto pt-32 py-20 grid grid-cols-2 md:grid-cols-3 gap-x-0 gap-y-0">
          {sortedData && sortedData.length > 0 ? (
            sortedData.map((data, i) => (
              <div className="relative group" key={i}>
                <div className="relative aspect-square w-full">
                  <Image
                    src={data.attributes.image.data.attributes.url}
                    fill={true}
                    loading="lazy"
                    className="object-cover"
                    alt={`wrk${i + 1}`}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-left text-2xl font-medium animate-bounce">
              No data found.
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default DigitalMarketing;
