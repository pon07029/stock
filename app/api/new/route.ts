// /app/api/earnings/route.js
import { db } from "@/lib/db";
import { ave, getQuarter } from "@/lib/time";
import yahooFinance from "yahoo-finance2";

const getPrice = async (ticker: string, date: Date) => {
  const date2 = new Date();
  date2.setDate(date.getDate() + 4);
  const dateQuery = {
    period1: date.toISOString().slice(0, 10),
    period2: date2.toISOString().slice(0, 10),
  };

  try {
    const result = await yahooFinance.historical(ticker, dateQuery);

    return result[0].close;
  } catch (error) {
    return null;
  }
};

type newDataType ={
  date: Date,
  eps:number,
  price:number,
}

const addDb = async (ticker:string, newData:newDataType[]) => {
  try {

    const result = await yahooFinance.quoteSummary(ticker, {
      modules: ["earnings"],
    });
    if (!result || !result.earnings || !result.earnings.earningsChart) {
      return
    }

    const result2 = await yahooFinance.search(ticker, /* queryOptions */);
    // console.log(result2)
    const name = result2.quotes[0].longname
    
    const eps=result.earnings.earningsChart.currentQuarterEstimate
    console.log(newData)
    const [rows] = await db.query(
      `INSERT INTO info VALUES("${ticker}", "${name}", "${eps}", "")`
    );

    for (const ele of newData){
      await db.query(
        `INSERT INTO price (ticker, price, date) VALUES("${ticker}", "${ele.price}", "${ele.date}")`
      );

      await db.query(
        `INSERT INTO eps (eps, date, ticker) VALUES("${ele.eps}", "${ele.date}","${ticker}")`
      );
    }
    return true
  } catch (error) {
    console.log("SQL ERROR", error)
    return false
  }
}

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
        console.log(result.earningsHistory.history);
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

      const newData = [{
        date:result.earningsHistory.history[0].quarter.toISOString().slice(0, 10),
        eps:result.earningsHistory.history[0].epsActual,
        price:q1
      },
      {
        date:result.earningsHistory.history[1].quarter.toISOString().slice(0, 10),
        eps:result.earningsHistory.history[1].epsActual,
        price:q2
      },
      {
        date:result.earningsHistory.history[2].quarter.toISOString().slice(0, 10),
        eps:result.earningsHistory.history[2].epsActual,
        price:q3
      },
      {
        date:result.earningsHistory.history[3].quarter.toISOString().slice(0, 10),
        eps:result.earningsHistory.history[3].epsActual,
        price:q4
      }]
      if (await addDb(ticker, newData)){
        return new Response(JSON.stringify({ success:true }));
      }
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
