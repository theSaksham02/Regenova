import { NextResponse } from "next/server";

const APPS_SCRIPT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbx3dVoEE--g91Yj5F7EieVpkUXdiZOOYidIVdnuj6vGX0PA1XdHP6ENXgr2ybUw5NN4lw/exec";

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

    const jsonAttempt = await fetch(APPS_SCRIPT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    let upstream: { ok?: boolean; error?: string } | null = null;
    let rawBody = "";
    try {
      rawBody = await jsonAttempt.text();
      upstream = JSON.parse(rawBody) as { ok?: boolean; error?: string };
    } catch {
      upstream = null;
    }

    if (jsonAttempt.ok && (!upstream || upstream.ok !== false)) {
      return NextResponse.json({ ok: true });
    }

    // Fallback for Apps Script projects expecting form-urlencoded payloads.
    const fallbackPayload = new URLSearchParams();
    fallbackPayload.set("email", payload.email);
    fallbackPayload.set("role", payload.role || "");
    fallbackPayload.set("source", payload.source || "");
    fallbackPayload.set("message", payload.message || "");

    const formAttempt = await fetch(APPS_SCRIPT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json,text/plain,*/*",
      },
      body: fallbackPayload.toString(),
      cache: "no-store",
    });

    let fallbackUpstream: { ok?: boolean; error?: string } | null = null;
    let fallbackRawBody = "";
    try {
      fallbackRawBody = await formAttempt.text();
      fallbackUpstream = JSON.parse(fallbackRawBody) as {
        ok?: boolean;
        error?: string;
      };
    } catch {
      fallbackUpstream = null;
    }

    if (formAttempt.ok && (!fallbackUpstream || fallbackUpstream.ok !== false)) {
      return NextResponse.json({ ok: true });
    }

    const snippet = (fallbackRawBody || rawBody || "No response body")
      .slice(0, 240)
      .replace(/\s+/g, " ");

    if (fallbackUpstream?.ok === false || upstream?.ok === false) {
      return NextResponse.json(
        {
          ok: false,
          error:
            fallbackUpstream?.error ||
            upstream?.error ||
            "Upstream mail/send failed",
          detail: snippet,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Upstream submission failed", detail: snippet },
      { status: 502 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Submission failed",
        detail: error instanceof Error ? error.message : "unknown error",
      },
      { status: 500 }
    );
  }
}
