import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const { email } = (await request.json().catch(() => ({}))) as { email?: string };

  const normalizedEmail = email?.trim() ?? "";
  if (!EMAIL.test(normalizedEmail) || normalizedEmail.length > 254) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const endpoint = process.env.NEWSLETTER_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json(
      { ok: false, error: "unavailable" },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalizedEmail }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: "provider" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "provider" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
