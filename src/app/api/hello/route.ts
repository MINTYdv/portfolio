import { NextResponse, type NextRequest } from "next/server";
import { getClientKey } from "@/lib/server/clientKey";
import { getHelloCount, incrementHelloCountOnce } from "@/lib/server/helloCounter";
import { checkRateLimit } from "@/lib/server/rateLimit";

const HELLO_RATE_LIMIT = 5;
const HELLO_RATE_WINDOW_MS = 60_000;

export async function GET() {
  return NextResponse.json({ count: getHelloCount() });
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);
  if (!checkRateLimit(`hello:${clientKey}`, HELLO_RATE_LIMIT, HELLO_RATE_WINDOW_MS)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  return NextResponse.json({ count: incrementHelloCountOnce(clientKey) });
}
