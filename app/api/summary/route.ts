// /app/api/earnings/route.js
import { infoType } from "@/app/[tiker]/page";
import { db } from "@/lib/db";
import { ave, getQuarter } from "@/lib/time";

let lastUpdateTime = new Date("2020-12-12");
let data: string;
export async function GET(request: any) {
  const now = new Date();
  const diffInMillis = new Date().getTime() - lastUpdateTime.getTime(); // 밀리초 단위로 차이 계산
  if (diffInMillis / 1000 / 60 < 10) {
    return new Response(data);
  }
  lastUpdateTime = now;
  try {
    const [detail] = await db.query(`SELECT *
FROM info i;`);
    data = JSON.stringify({ data: detail });
    console.log(data)
    return new Response(data);
  } catch (error) {
    console.error("Error fetching earnings data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
