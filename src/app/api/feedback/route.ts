import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FEEDBACK_FILE = path.join(DATA_DIR, "feedback.json");

interface FeedbackEntry {
  name?: string;
  email?: string;
  category: string;
  message: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, category, message } = await request.json();

    // Validate required fields
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

    // Ensure data directory exists
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true });
    }

    // Read existing feedback or create new array
    let feedback: FeedbackEntry[] = [];
    if (existsSync(FEEDBACK_FILE)) {
      const data = await readFile(FEEDBACK_FILE, "utf-8");
      feedback = JSON.parse(data);
    }

    // Add new feedback
    feedback.push({
      name: name || "Anonym",
      email: email || undefined,
      category,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    // Save to file
    await writeFile(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));

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


