import { NextResponse } from "next/server";
import {
  GoogleGenerativeAIEmbeddings,
  ChatGoogleGenerativeAI,
} from "@langchain/google-genai";
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
} from "@langchain/core/messages";
import fs from "fs";
import path from "path";

// Keep a global in-memory cache to record request frequencies
const ipCache = new Map<string, { count: number; resetTime: number }>();

export const maxDuration = 10; // Vercel free tier limit

interface VectorDocument {
  content: string;
  metadata: any;
  embedding: number[];
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function dotProduct(vecA: number[], vecB: number[]): number {
  let product = 0;
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
}

export async function POST(request: Request) {
  try {
    // Get Client IP Address Safely
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();
    const rateLimitData = ipCache.get(ip);

    const WINDOW_MS = 60 * 1000; // 1 minute window
    const MAX_REQUESTS = 6; // Max 6 requests per minute from the same IP

    if (rateLimitData && now < rateLimitData.resetTime) {
      if (rateLimitData.count >= MAX_REQUESTS) {
        return NextResponse.json(
          {
            error:
              "অতিরিক্ত অনুরোধ পাঠানো হয়েছে। অনুগ্রহ করে এক মিনিট অপেক্ষা করুন।",
          },
          { status: 429 }, // HTTP Too Many Requests
        );
      }
      rateLimitData.count += 1;
    } else {
      // Create or reset record window
      ipCache.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    }

    const { question, history } = (await request.json()) as {
      question: string;
      history: ChatMessage[];
    };

    if (!question) {
      return NextResponse.json(
        { error: "কোনো প্রশ্ন পাওয়া যায়নি।" },
        { status: 400 },
      );
    }

    // Read Vector Database File Safely
    const filePath = path.join(
      process.cwd(),
      "data",
      "class-9-10-bangla-sohopath-vectors.json",
    );
    if (!fs.existsSync(filePath)) {
      console.error("Vector database file missing at path:", filePath);
      return NextResponse.json(
        { error: "এই মুহূর্তে বইয়ের তথ্যভাণ্ডারটি পাওয়া যাচ্ছে না।" },
        { status: 500 },
      );
    }

    let database: VectorDocument[];
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      database = JSON.parse(fileContent);
    } catch (parseError) {
      console.error("Failed to parse vector JSON file:", parseError);
      return NextResponse.json(
        { error: "বইয়ের ডাটাবেজ ফাইলটি পড়তে সমস্যা হয়েছে।" },
        { status: 500 },
      );
    }

    // Generate Question Embedding (Using Gemini Embeddings)
    let questionEmbedding: number[];
    try {
      const embeddingsModel = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        modelName: "gemini-embedding-001",
      });
      const [embeddingResult] = await embeddingsModel.embedDocuments([
        question,
      ]);
      questionEmbedding = embeddingResult;
    } catch (embeddingError) {
      console.error("Gemini embedding API error:", embeddingError);
      return NextResponse.json(
        { error: "তথ্যের মিল অনুসন্ধান করতে সমস্যা হয়েছে।" },
        { status: 502 },
      );
    }

    // Search and sort context
    const scoredDocs = database.map((doc, index) => {
      const score = dotProduct(doc.embedding, questionEmbedding);
      return {
        content: doc.content,
        score,
        originalIndex: index,
      };
    });

    const topMatches = scoredDocs.sort((a, b) => b.score - a.score).slice(0, 5);
    const sortedMatches = topMatches.sort(
      (a, b) => a.originalIndex - b.originalIndex,
    );
    const context = sortedMatches
      .map((match) => match.content)
      .join("\n\n---\n\n");

    // Build structured chat history payload
    const messages: any[] = [];
    messages.push(
      new SystemMessage(
        `আপনি নবম-দশম শ্রেণীর বাংলা সহপাঠ (গল্প, কবিতা, উপন্যাস ও নাটক) বিষয়ের একজন অত্যন্ত অভিজ্ঞ শিক্ষক। 

আপনার কাজ হলো শিক্ষার্থীর প্রশ্নের স্পষ্ট, নির্ভুল এবং পরীক্ষার মানসম্মত (Exam-standard) উত্তর দেওয়া।

নিচে বইয়ের প্রাসঙ্গিক অংশ থেকে কিছু তথ্যসূত্র দেওয়া হলো:
${context}

উত্তর প্রদানের ক্ষেত্রে নিম্নলিখিত নির্দেশনাবলী কঠোরভাবে অনুসরণ করুন:

১. সাধারণ প্রশ্ন বা আলোচনার উত্তর সহজ ও বিস্তারিত বাংলা ভাষায় বুঝিয়ে লিখুন। কিন্তু বইয়ের বাইরে থেকে ক‌োনো প্রশ্ন করলে বলবেন: "দুঃখিত, এই প্রশ্নের উত্তরটি মূল বইয়ে খুঁজে পাওয়া যায়নি।"
২. যদি শিক্ষার্থী সৃজনশীল প্রশ্ন (ক, খ, গ, ঘ) জিজ্ঞেস করে, তবে এভাবে সাজিয়ে লিখুন:
   - **ক:** ১টি বাক্যে সরাসরি মূল উত্তরটি লিখুন। কোনো অপ্রাসঙ্গিক কথা লিখবেন না।
   - **খ:** দুটি অনুচ্ছেদে (Para) লিখুন। প্রথম অনুচ্ছেদে মূল কথাটি (জ্ঞান) এবং দ্বিতীয় অনুচ্ছেদে তার বিস্তারিত ব্যাখ্যা (অনুধাবন) দিন।
   - **গ:** তিনটি অনুচ্ছেদে লিখুন। প্রথম অনুচ্ছেদে উদ্দীপকের সাথে বইয়ের মিল/অমিল (জ্ঞান), দ্বিতীয় অনুচ্ছেদে বইয়ের সংশ্লিষ্ট প্রসঙ্গের আলোচনা (অনুধাবন), এবং তৃতীয় অনুচ্ছেদে উদ্দীপকের সাথে বইয়ের কাহিনীর তুলনামূলক বিশ্লেষণ ও প্রয়োগ দেখান।
   - **ঘ:** চারটি অনুচ্ছেদে লিখুন। প্রথম অনুচ্ছেদে প্রশ্নের প্রেক্ষিতে আপনার সিদ্ধান্ত বা মন্তব্য (জ্ঞান), দ্বিতীয় অনুচ্ছেদে তাত্ত্বিক ব্যাখ্যা (অনুধাবন), তৃতীয় অনুচ্ছেদে উদ্দীপকের ঘটনার সাথে বিশ্লেষণ (প্রয়োগ), এবং চতুর্থ অনুচ্ছেদে একটি যৌক্তিক মূল্যায়ন ও উপসংহার (উচ্চতর দক্ষতা) লিখুন।
৩. সৃজনশীল প্রশ্নের 'গ' ও 'ঘ' এর উত্তর সরাসরি বইয়ে হুবহু থাকে না। তাই প্রদত্ত তথ্যসূত্রের (Context) মূলভাব, চরিত্র ও কাহিনীর ওপর ভিত্তি করে আপনার শিক্ষকসুলভ সৃজনশীলতা ব্যবহার করে একটি সুন্দর ও প্রাসঙ্গিক উত্তর তৈরি করুন।
৪. কোনো অবস্থাতেই অপ্রাসঙ্গিক বা মনগড়া তথ্য দেবেন না যা মূল বইয়ের কাহিনীর পরিপন্থী।`,
      ),
    );

    const limitedHistory = (history || []).slice(-8);
    for (const msg of limitedHistory) {
      if (msg.role === "user") {
        messages.push(new HumanMessage(msg.content));
      } else {
        messages.push(new AIMessage(msg.content));
      }
    }

    messages.push(new HumanMessage(question));

    // Invoke Google Gemini LLM with Primary -> Backup Fallback Logic
    let response;
    try {
      // Primary Attempt
      const primaryModel = new ChatGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "gemini-3.5-flash-lite",
        temperature: 0.3,
        maxOutputTokens: 1000,
      });
      response = await primaryModel.invoke(messages);
    } catch (primaryError) {
      console.warn(
        "Primary Gemini model failed. Attempting backup model...",
        primaryError,
      );

      try {
        // Backup Attempt
        const backupModel = new ChatGoogleGenerativeAI({
          apiKey: process.env.GOOGLE_API_KEY,
          model: "gemini-3.1-flash-lite",
          temperature: 0.3,
          maxOutputTokens: 1000,
        });
        response = await backupModel.invoke(messages);
      } catch (backupError: any) {
        console.error(
          "Both primary and backup Gemini models failed:",
          backupError,
        );
        return NextResponse.json(
          {
            error:
              "সার্ভার এই মুহূর্তে অতিরিক্ত ব্যস্ত রয়েছে। দয়া করে একটু পরে আবার চেষ্টা করুন।",
          },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({ answer: response.content });
  } catch (error: any) {
    console.error("Unexpected controller exception:", error);
    return NextResponse.json(
      { error: "দুঃখিত, একটি অভ্যন্তরীণ সার্ভার ত্রুটি ঘটেছে।" },
      { status: 500 },
    );
  }
}
