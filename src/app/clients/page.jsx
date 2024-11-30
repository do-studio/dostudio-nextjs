import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/client-logos?&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

const ClientsPage = async () => {
  const clintsdata = await getData();

  return (
    <>
    <Head>
        <link rel="canonical" href="https://dostudio.co.in/clients" />
      </Head>
    <main className="min-h-screen w-full bg-white">
      <div className="w-11/12 xl:w-9/12 mx-auto pt-32 py-20">
        <h1 className="text-4xl lg:text-6xl font-bold capitalize text-center pb-3">
          our clients
        </h1>
        <div className="grid grid-cols-4 xl:grid-cols-6 gap-5">
          {clintsdata.data && clintsdata.data.length > 0 ? (
            clintsdata?.data?.map((data, i) => (
              <div className="h-16 w-16 md:h-32 md:w-32 xl:h-48 xl:w-48 relative"  key={i}>
                <Image
                 
                  fill={true}
                  className="object-cover grayscale hover:grayscale-0 duration-200"
                  src={data.attributes.image.data.attributes.url}
                  alt="clients"
                  />
              </div>
            ))
          ) : (
            <div className="text-left text-2xl font-medium animate-bounce">
              No data found.
            </div>
          )}
        </div>
      </div>
    </main>
          </>
  );
};

export default ClientsPage;
