export async function getData() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/testimonials?populate=*`,
      { cache: "no-store" }
    );
  
    if (!res.ok) {
      throw new Error('Data fetch failed');
    }
    
    return res.json();
  }
  