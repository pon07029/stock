// /app/api/earnings/route.js
import { ave, getQuarter } from "@/lib/time";
import yahooFinance from "yahoo-finance2";
import { db } from "@/lib/db";
import { chartType } from "@/components/LineChart";

export async function GET(request: any) {
  const chart1: chartType = {
    labels: [],
    data: [],
  };
  try {
    const { searchParams } = new URL(request.url);
    const ticker = searchParams.get("ticker");

    if (!ticker) {
      return new Response(JSON.stringify({ error: "not in db" }), {
        status: 419,
      });
    }

    const [detail] = await db.query(
      `SELECT i.*, p.* FROM info i JOIN price p ON i.ticker = p.ticker WHERE i.ticker="${ticker}" ORDER BY p.date ASC LIMIT 1;`
    );

    const [data] = await db.query(
      `SELECT * FROM eps e JOIN price p ON e.date = p.date and e.ticker = p.ticker WHERE e.ticker="${ticker}"`
    );

    return new Response(JSON.stringify({ detail: detail, data: data }));
  } catch (error) {
    console.error("Error fetching earnings data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
