import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { name, email, category, message } = await request.json();

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Meddelandet måste vara minst 10 tecken långt" },
        { status: 400 }
      );
    }

    if (!category || typeof category !== "string") {
      return NextResponse.json(
        { error: "Kategori krävs" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("feedback")
      .insert({
        name: name || "Anonym",
        email: email || null,
        category,
        message: message.trim(),
      });

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "Tack för din feedback!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing feedback:", error);
    return NextResponse.json(
      { error: "Något gick fel. Försök igen senare." },
      { status: 500 }
    );
  }
}
