import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    const { fullName, email, phone, message } = body as {
      fullName?: string;
      email?: string;
      phone?: string;
      message?: string;
    };

    if (!fullName || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return NextResponse.json(
        { ok: false, error: "Server missing WEB3FORMS_ACCESS_KEY" },
        { status: 500 }
      );
    }

    // Web3Forms accepts form fields and forwards the message to the configured destination.
    const formData = new URLSearchParams();
    formData.set("access_key", accessKey);
    formData.set("from_name", fullName);
    formData.set("from_email", email);
    if (phone) formData.set("phone", phone);
    formData.set("message", message);
    formData.set("to_email", "dgjmaria@gmail.com");

    const resp = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    const data = await resp.json().catch(() => null);

    if (!resp.ok || !data || data.success !== true) {
      return NextResponse.json(
        { ok: false, error: data?.message ?? "Web3Forms failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}

