import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  consent?: boolean;
  company_website?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Payload;

  if (body.company_website) return NextResponse.json({ ok: true });

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim().slice(0, 100) || "General";
  const message = body.message?.trim() ?? "";
  const invalid =
    !name ||
    name.length > 100 ||
    !EMAIL.test(email) ||
    email.length > 254 ||
    message.length < 8 ||
    message.length > 5000 ||
    !body.consent;

  if (invalid) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const endpoint = process.env.CONTACT_ENDPOINT;
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
      body: JSON.stringify({ name, email, subject, message }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "provider" },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "provider" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
