"use client";
import LineChart, { chartType } from "@/components/LineChart";
import { usePathname, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";
type fetchDataType = {
  num: number;
  eps: number;
  date: string;
  price: number;
};

export type infoType = {
  date: string;
  name: string;
  price: number;
  image?: string;
  ticker: string;
};

function Page() {
  const pathname = usePathname();
  const [ch1, setCh1] = useState<chartType>();
  const [ch2, setCh2] = useState<chartType>();
  const [detail, setDetail] = useState<infoType>();
  console.log(ch1, ch2, detail);
  useEffect(() => {
    if (!pathname) {
      return;
    }
    const makeChart = (
      data: fetchDataType[],
      epsForward: number,
      price: number
    ) => {
      let chart1: chartType = {
        labels: [],
        data: [],
      };
      let chart2: chartType = {
        labels: [],
        data: [],
      };

      data.map((ele) => {
        // chart1.labels.push(getQuarter(new Date(ele.date)));
        // chart2.labels.push(getQuarter(new Date(ele.date)));
        console.log(ele.date);
        chart1.labels.push(ele.date.slice(0, 10));
        chart2.labels.push(ele.date.slice(0, 10));
        chart1.data.push(ele.eps);
        chart2.data.push(ele.price / ele.eps / 4);
        console.log("2");
      });
      chart1.ave =
        data.reduce((acc, currentValue) => acc + currentValue.eps, 0) /
        data.length;
      chart2.ave =
        data.reduce(
          (acc, currentValue) => acc + currentValue.price / currentValue.eps,
          0
        ) /
        data.length /
        4;
      chart1.labels.push("Est." + new Date().toISOString().slice(0, 10));
      chart2.labels.push("Est." + new Date().toISOString().slice(0, 10));
      chart1.data.push(epsForward);
      chart2.data.push(price / epsForward / 4);
      return { ch1: chart1, ch2: chart2 };
    };

    async function fetchDetail() {
      try {
        console.log(pathname.slice(1));
        const res = await fetch("/api/detail?ticker=" + pathname.slice(1));
        if (!res.ok) {
          throw new Error("Failed to fetch earnings data");
        }

        const result = await res.json();
        console.log(result);
        const v = makeChart(
          result.data,
          result.detail[0].EpsForward,
          result.detail[0].price
        );
        console.log(v);
        setDetail(result.detail[0]);
        setCh1(v.ch1);
        setCh2(v.ch2);
      } catch (err) {
        // setError(err.message);
      }
    }

    fetchDetail();
  }, [pathname]);

  return (
    <div className="flex-grow overflow-y-auto scrollbar-hide p-4 w-full h-screen max-w-md bg-gradient-to-r from-slate-950 to-slate-900 shadow-lg pb-24">
      {detail && (
        <div className="flex flex-row mb-10">
          <p className="flex-1 font-bold text-3xl">{detail?.name}</p>
          <p className="flex-1 font-bold text-3xl">
            {detail?.price.toFixed(2)}
          </p>
        </div>
      )}
      {ch1 && (
        <div className="mb-10">
          <p className="flex-1 font-bold text-xl mb-4">eps</p>
          <LineChart chartData={ch1} />
        </div>
      )}
      {ch2 && (
        <div>
          <p className="flex-1 font-bold text-xl mb-4">perBand</p>
          <LineChart chartData={ch2} />
        </div>
      )}
    </div>
  );
}

export default Page;
