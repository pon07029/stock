"use client";
import LineChart, { chartType } from "@/components/LineChart";
import { useEffect, useState } from "react";

export default function Home() {
  const [dd, setDd] = useState<chartType>();
  const [bb, setb] = useState<chartType>();
  useEffect(() => {
    async function fetchEarn() {
      try {
        const res = await fetch("/api/earnings");
        if (!res.ok) {
          throw new Error("Failed to fetch earnings data");
        }
        const result = await res.json();
        setDd(result);
      } catch (err) {
        // setError(err.message);
      }
    }
    async function fetchHis() {
      try {
        const res = await fetch("/api/history");
        if (!res.ok) {
          throw new Error("Failed to fetch earnings data");
        }
        const result = await res.json();
        setb(result);
      } catch (err) {
        // setError(err.message);
      }
    }
    fetchHis();
    fetchEarn();
  }, []);
  return (
    <div className="flex-grow overflow-y-auto p-4 w-full max-w-md bg-white shadow-lg">
      <h1 className="text-xl font-bold mb-4">Scrollable Content</h1>
      <p>
        This is the main body content. Add more text or elements here to see the
        scroll behavior.
      </p>
      {dd && <LineChart chartData={dd} />}
      <div className="mt-4 space-y-4">
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} className="bg-white p-2 rounded shadow">
            Example content line {i + 1}
          </p>
        ))}
      </div>
    </div>
  );
}
