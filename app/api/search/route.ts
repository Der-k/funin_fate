import { NextResponse } from "next/server";

const data = [
  {
    id: "1",
    title: "Java House Karen",
    description: "Coffee and breakfast",
    type: "Business",
    url: "/food/java-house-karen",
  },
  {
    id: "2",
    title: "Karura Forest",
    description: "Nature walks and cycling",
    type: "Destination",
    url: "/nature/karura-forest",
  },
  {
    id: "3",
    title: "Jazz Night Friday",
    description: "Live music every Friday",
    type: "Event",
    url: "/events/jazz-night",
  },
  {
    id: "4",
    title: "Best Pizza in Nairobi",
    description: "Food guide",
    type: "Article",
    url: "/blog/best-pizza",
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q")?.toLowerCase() || "";

  const results = data.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(q)
  );

  return NextResponse.json(results);
}