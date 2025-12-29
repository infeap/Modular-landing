import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const EMAILS_FILE = path.join(DATA_DIR, "early-access-emails.json");

interface EmailEntry {
  email: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
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

    // Ensure data directory exists
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true });
    }

    // Read existing emails or create new array
    let emails: EmailEntry[] = [];
    if (existsSync(EMAILS_FILE)) {
      const data = await readFile(EMAILS_FILE, "utf-8");
      emails = JSON.parse(data);
    }

    // Check if email already exists
    if (emails.some((entry) => entry.email === email)) {
      return NextResponse.json(
        { message: "Du är redan registrerad!" },
        { status: 200 }
      );
    }

    // Add new email
    emails.push({
      email,
      timestamp: new Date().toISOString(),
    });

    // Save to file
    await writeFile(EMAILS_FILE, JSON.stringify(emails, null, 2));

    return NextResponse.json(
      { message: "Tack för ditt intresse! Vi kontaktar dig snart." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing early access signup:", error);
    return NextResponse.json(
      { error: "Något gick fel. Försök igen senare." },
      { status: 500 }
    );
  }
}


