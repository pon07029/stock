"use client";
import LineChart, { chartType } from "@/components/LineChart";
import StockBox from "@/components/StockBox";
import { useEffect, useState } from "react";
import { infoType } from "./[tiker]/page";

export default function Home() {
  const [data, setData] = useState<infoType[]>();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/summary");
        const result = await res.json();
        console.log(result);
        if (result.data) {
          setData(result.data);
        }
      } catch (error) {}
    };
    getData();
  }, []);
  return (
    <div className="flex-grow overflow-y-auto p-4 w-full max-w-md bg-gradient-to-r from-slate-950 to-slate-900 shadow-lg">
      <h1 className="text-xl font-bold mb-4">Scrollable Content</h1>
      <p>
        This is the main body content. Add more text or elements here to see the
        scroll behavior.
      </p>

      <div className="mt-4 space-y-4 w-full">
        {data &&
          data.map((ele, i) => (
            <StockBox key={i} data={ele} />
          ))}
      </div>
    </div>
  );
}
