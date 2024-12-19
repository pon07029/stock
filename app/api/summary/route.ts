// /app/api/earnings/route.js
import { db } from "@/lib/db";
import { ave, getQuarter } from "@/lib/time";

export async function GET(request: any) {
  try {
    const [detail] = await db.query(`SELECT i.*, p.*
FROM info i
JOIN price p ON i.ticker = p.ticker
WHERE p.date = (
    SELECT MAX(date)
    FROM price p2
    WHERE p2.ticker = p.ticker
);`);

    return new Response(JSON.stringify({ data: detail }));
  } catch (error) {
    console.error("Error fetching earnings data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
