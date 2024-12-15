// /app/api/earnings/route.js
import { ave, getQuarter } from "@/lib/time";
import yahooFinance from "yahoo-finance2";

export async function GET(request: any) {
  try {
    const query = "GOOGL";

    const result = await yahooFinance.quoteSummary(query, {
      modules: ["earningsHistory"],
    });

    // console.log(result.history);
    if (result && result.earningsHistory && result.earningsHistory.history) {
      const dateList = result.earningsHistory.history.map((ele) =>
        ele.quarter.toISOString().slice(0, 10)
      );
      const queryOptions = {
        period1: dateList[0],
        period2: dateList[1],
        period3: dateList[2],
        period4: dateList[3],
      };
      try {
        const result1 = await yahooFinance.historical(query, queryOptions);
        console.log(result1);
        return new Response(
          JSON.stringify({
            data: result1,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      } catch (error) {}
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
