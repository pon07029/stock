"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { redirect, useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [ticker, setTicker] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const go = () => {
    router.push("/" + ticker);
  };
  const getData = async () => {
    if (ticker == "") return;
    console.log("확인");
    setLoading(true);
    try {
      const res = await fetch("/api/new?ticker=" + ticker);
      if (!res.ok) {
        throw new Error("Failed to fetch earnings data");
      }
      const result = await res.json();

      if (result.success) {
        go();
      }
    } catch (err) {
      // setError(err.message);
    }

    setLoading(false);
  };

  function onlyAlphaNum(input: string) {
    const regex = /^[A-Za-z]*$/; // 영문, 숫자, 언더바만 허용하는 정규 표현식
    if (!regex.test(input)) {
      console.log("asd");
      return false;
    }
    return true;
  }

  return (
    <div className="flex-grow overflow-y-auto scrollbar-hide p-4 w-full h-screen max-w-md bg-gradient-to-r from-slate-950 to-slate-900 shadow-lg pb-24">
      <Input
        value={ticker}
        onChange={(ele) => {
          if (onlyAlphaNum(ele.target.value)) {
            setTicker(ele.target.value.toUpperCase());
          }
        }}
        label="Ticker"
        type="only english"
        className="mt-32"
      />
      <div className="flex justify-center mt-10">
        <Button
          isLoading={loading}
          // onClick={() => {
          //   console.log();
          // }}
          onPress={getData}
          size="lg"
          className="w-1/2"
          color="default"
        >
          {!loading ? "확인" : "loading"}
        </Button>
      </div>
    </div>
  );
}

export default Page;
