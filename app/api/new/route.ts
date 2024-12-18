// /app/api/earnings/route.js
import { ave, getQuarter } from "@/lib/time";
import yahooFinance from "yahoo-finance2";

const getPrice = async (ticker: string, date: Date) => {
  const date2 = new Date();
  date2.setDate(date.getDate() + 4);
  console.log(dateQuery);
  const dateQuery = {
    period1: date.toString().slice(0, 10),
    period2: date2.toString().slice(0, 10),
  };

  try {
    const result = await yahooFinance.historical(ticker, dateQuery);

    return result;
  } catch (error) {
    return null;
  }
};

export async function GET(request: any) {
  try {
    const { searchParams } = new URL(request.url);
    const ticker = searchParams.get("ticker");

    if (ticker == null) {
      return new Response(JSON.stringify({ error: "No ticker" }), {
        status: 404,
      });
    }

    const result = await yahooFinance.quoteSummary(ticker, {
      modules: ["earningsHistory"],
    });

    // console.log(result.history);
    if (result && result.earningsHistory && result.earningsHistory.history[0]) {
      //   console.log(result.earningsHistory.history);
      const q1 = await getPrice(
        ticker,
        result.earningsHistory.history[0].quarter
      );
      const q2 = await getPrice(
        ticker,
        result.earningsHistory.history[1].quarter
      );
      const q3 = await getPrice(
        ticker,
        result.earningsHistory.history[2].quarter
      );
      const q4 = await getPrice(
        ticker,
        result.earningsHistory.history[3].quarter
      );

      var price = [];
      //   console.log(q1);
      console.log(q1, q2, q3, q4);
    }
    return new Response(JSON.stringify({ error: "No earnings data found" }), {
      status: 404,
    });
  } catch (error) {
    console.error("Error fetching earnings data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
