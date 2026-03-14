import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "E-postadress krävs" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ogiltig e-postadress" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const { data: existing } = await supabase
      .from("signup_early_access")
      .select("id")
      .eq("email", normalizedEmail)
      .single();

    if (existing) {
      return NextResponse.json(
        { message: "Du är redan registrerad!" },
        { status: 200 }
      );
    }

    // Insert new signup
    const { error } = await supabase
      .from("signup_early_access")
      .insert({ email: normalizedEmail });

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "Tack för ditt intresse! Vi kontaktar dig snart." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing signup:", error);
    return NextResponse.json(
      { error: "Något gick fel. Försök igen senare." },
      { status: 500 }
    );
  }
}
