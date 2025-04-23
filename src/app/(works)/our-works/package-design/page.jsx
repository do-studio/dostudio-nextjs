import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeUp from "../../../../components/motions/fadeUp";
import axios from "axios";

export const metadata = {
  title: 'Package Designing Company in Calicut, Package Design Service',
  description: 'Our Package designing company in Calicut offers creative and effective packaging solutions to enhance your brand and drive sales.',
  metadataBase: new URL('https://dostudio.co.in'), // Set the base domain

}


async function getData() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/package-designs?&populate=*`,
      { headers: { "Cache-Control": "no-store" } } // Cache control for no-store
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return notFound();
  }
}

const PackageDesign = async () => {
  const workdata = await getData();

  return (
    <>
  
      <main className="min-h-screen w-full bg-white">
        <div className="w-11/12 xl:w-9/12 mx-auto pt-20 xl:pt-24 py-20 grid grid-cols-2 gap-0 xl:gap-10">
          {workdata.data && workdata.data.length > 0 ? (
            workdata.data?.reverse().map((data, i) => (
              <FadeUp duration={0.3} delay={0.1 * i} key={i}>
                <div className="relative group">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={data.attributes.image.data.attributes.url}
                      fill={true}
                      className="object-cover "
                      loading="lazy"
                      alt="wrk1"
                    />
                  </div>
                </div>
              </FadeUp>
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

export default PackageDesign;
