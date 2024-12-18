import { db } from "@/lib/db";

type User = {
  id: number;
  name: string;
  email: string;
};

// API 응답 타입 정의
type Data = User[] | { error: string };

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker");
  try {
    const [rows] = await db.query(
      "SELECT * FROM info WHERE ticker = '" + ticker + "'"
    );
    // 쿼리 결과를 User 타입으로 변환
    const data: User[] = rows as User[];
    // console.log(result.history);
    if (data) {
      return new Response(
        JSON.stringify({
          data: data,
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
