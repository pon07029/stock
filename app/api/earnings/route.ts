// /app/api/earnings/route.js
import { ave, getQuarter } from "@/lib/time";
import yahooFinance from "yahoo-finance2";

export async function GET(request: any) {
  try {
    const symbol = "GOOGL"; // 애플의 심볼
    const result = await yahooFinance.quoteSummary(symbol, {
      modules: ["earnings"],
    });
    // console.log(result);
    if (result && result.earnings.earningsChart) {
      const {
        quarterly,
        currentQuarterEstimate,
        currentQuarterEstimateDate,
        currentQuarterEstimateYear,
      } = result.earnings.earningsChart;
      const data = quarterly.map((ele) => ele.actual);
      const aveEPS = ave(data);
      const labels = quarterly.map((ele) => ele.date);
      labels.push(
        "Est." + currentQuarterEstimateDate + String(currentQuarterEstimateYear)
      );
      data.push(currentQuarterEstimate);
      return new Response(
        JSON.stringify({
          ave: aveEPS,
          data: data,
          labels: labels,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
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

// try {
//   const symbol = "GOOGL"; // 애플의 심볼
//   const result = await yahooFinance.quoteSummary(symbol, {
//     modules: ["earningsHistory"],
//   });
//   if (result && result.earningsHistory) {
//     const { history } = result.earningsHistory;

//     // 분기별 EPS
//     const labels = history.map((data) => getQuarter(data.quarter));
//     const data = history.map((ele) => ele.epsActual);

//     try {
//       const eps = await yahooFinance.quote("AAPL");
//       if (eps && eps.epsForward && eps.epsTrailingTwelveMonths)
//         data.push(eps.epsForward);
//       labels.push("Est");
//       return new Response(
//         JSON.stringify({
//           epsTrailingTwelveMonths: eps.epsTrailingTwelveMonths,
//           data: data,
//           labels: labels,
//         }),
//         { status: 200, headers: { "Content-Type": "application/json" } }
//       );
//     } catch (error) {
//       return new Response(
//         JSON.stringify({ error: "No earnings data found" }),
//         {
//           status: 404,
//         }
//       );
//     }
//   }
//   return new Response(JSON.stringify({ error: "No earnings data found" }), {
//     status: 404,
//   });
// } catch (error) {
//   console.error("Error fetching earnings data:", error);
//   return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//     status: 500,
//   });
// }
