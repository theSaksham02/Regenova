import { NextResponse } from "next/server";

const APPS_SCRIPT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyMJI5pjLr9fGBcy6zHIKuzg8_GoPbiuPztYDvnRVDIV39kBbZNL3AhIgnRRYSFxY8B/exec";

type WaitlistPayload = {
  email?: string;
  role?: string;
  source?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as WaitlistPayload;

    if (!payload?.email || typeof payload.email !== "string") {
      return NextResponse.json(
        { ok: false, error: "Missing email" },
        { status: 400 }
      );
    }

    const response = await fetch(APPS_SCRIPT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Upstream submission failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Submission failed" },
      { status: 500 }
    );
  }
}
