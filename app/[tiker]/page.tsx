"use client";
import LineChart, { chartType } from "@/components/LineChart";
import React, { useEffect, useState } from "react";

const Data = [
  {
    title: "abc",
    labels: ["2020", "2021", "2022", "2023"],
    data: [2, 3, 4, 5],
    ave: 2.5,
  },
  {
    title: "ccc",
    labels: ["2020", "2021", "2022", "2023"],
    data: [2, 3, 4, 5],
    ave: 2.5,
  },
];

function Page() {
  useEffect(() => {
    async function fetchEarn() {
      try {
        const res = await fetch("/api/test?ticker=APPL");
        if (!res.ok) {
          throw new Error("Failed to fetch earnings data");
        }
        const result = await res.json();
        console.log(result);
      } catch (err) {
        // setError(err.message);
      }
    }

    fetchEarn();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch("/api/new?ticker=GOOGL");
      if (!res.ok) {
        throw new Error("Failed to fetch earnings data");
      }
      const result = await res.json();
      console.log(result);
    } catch (err) {
      // setError(err.message);
    }
  };

  return (
    <div className="flex-grow overflow-y-auto scrollbar-hide p-4 w-full h-screen max-w-md bg-gradient-to-r from-slate-950 to-slate-900 shadow-lg pb-24">
      <div className="flex flex-row">
        <p className="flex-1 font-bold text-3xl">AAAA</p>
        <p className="flex-1 font-bold text-3xl">1999</p>
      </div>
      <button onClick={getData}>asdasd</button>
      {Data.map((ele, i) => (
        <div key={i + "1"}>
          <p className="flex-1 font-bold text-2xl my-3">AAAA</p>
          <LineChart chartData={ele} key={i} />
        </div>
      ))}
      {Data.map((ele, i) => (
        <div key={i + "1"}>
          <p className="flex-1 font-bold text-2xl my-3">AAAA</p>
          <LineChart chartData={ele} key={i} />
        </div>
      ))}
    </div>
  );
}

export default Page;
