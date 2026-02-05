import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

export interface ContactSubmission {
  projectType: string;
  stage: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch {
    // already exists
  }
}

async function readLeads(): Promise<ContactSubmission[]> {
  try {
    const raw = await readFile(LEADS_FILE, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function appendLead(submission: Omit<ContactSubmission, "createdAt">) {
  await ensureDataDir();
  const leads = await readLeads();
  const newLead: ContactSubmission = {
    ...submission,
    createdAt: new Date().toISOString(),
  };
  leads.push(newLead);
  await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  return newLead;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot: if this field is filled, treat as spam
    if (body.website && String(body.website).trim() !== "") {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const {
      projectType,
      stage,
      timeline,
      budget,
      name,
      email,
      message,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const submission = {
      projectType: String(projectType || ""),
      stage: String(stage || ""),
      timeline: String(timeline || ""),
      budget: String(budget || ""),
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message || "").trim(),
    };

    await appendLead(submission);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("Contact form error:", e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
