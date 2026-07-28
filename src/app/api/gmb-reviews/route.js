import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || process.env.GOOGLE_PLACE_ID;

    if (apiKey && placeId) {
      const googleUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total,url&key=${apiKey}`;
      const response = await fetch(googleUrl, { next: { revalidate: 3600 } });
      const data = await response.json();

      if (data?.result) {
        return NextResponse.json({
          status: "success",
          source: "google_places",
          rating: data.result.rating || "4.8",
          totalReviews: data.result.user_ratings_total || 100,
          gmbUrl: data.result.url || `https://www.google.com/maps/place/?q=place_id:${placeId}`,
          reviews: data.result.reviews
            ? data.result.reviews.map((r, i) => ({
                id: i,
                name: r.author_name,
                photo: r.profile_photo_url,
                rating: r.rating,
                review: r.text,
                date: r.relative_time_description,
                url: r.author_url,
              }))
            : [],
        });
      }
    }

    // Fallback placeholder payload if Google Places credentials are not provided yet
    return NextResponse.json({
      status: "fallback",
      source: "gmb_placeholder",
      rating: "4.8",
      totalReviews: "100+",
      gmbUrl: "https://share.google/2qPhjmmyeXHxWn6Vz",
      reviews: [
        {
          id: 1,
          name: "Haroon Rasheed",
          role: "Verified GMB Reviewer",
          rating: 5,
          review:
            "Do Studio is hands down the best digital marketing & creative agency. Their creativity and strategic approach have helped us achieve remarkable growth.",
          date: "2 months ago",
          photo: "",
        },
        {
          id: 2,
          name: "Neshma Abdurrahman",
          role: "Verified GMB Reviewer",
          rating: 5,
          review:
            "Their out-of-the-box ideas and innovative campaigns helped us stand out in a crowded market, generating significant brand awareness and high ROI.",
          date: "1 month ago",
          photo: "",
        },
        {
          id: 3,
          name: "MC Nasar",
          role: "Verified GMB Reviewer",
          rating: 5,
          review:
            "Do Studio has consistently delivered exceptional designs and marketing solutions that exceeded our expectations. Highly recommend their services!",
          date: "3 months ago",
          photo: "",
        },
        {
          id: 4,
          name: "Arshad",
          role: "Verified GMB Reviewer",
          rating: 5,
          review:
            "Dedicated agency for marketing. They go above and beyond to understand our business goals, delivering tailored solutions that yielded fantastic results.",
          date: "4 months ago",
          photo: "",
        },
      ],
    });
  } catch (error) {
    console.error("GMB Reviews API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GMB reviews" },
      { status: 500 }
    );
  }
}
