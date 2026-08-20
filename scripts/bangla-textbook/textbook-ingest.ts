import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

// Helper function to pause execution and respect rate limits
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function ingestText() {
  const txtPath = path.join(process.cwd(), "data", "textbook.txt");
  if (!fs.existsSync(txtPath)) {
    throw new Error("Please ensure textbook.txt is inside the data/ folder.");
  }

  console.log("Reading textbook.txt...");
  const rawText = fs.readFileSync(txtPath, "utf8");

  console.log("Splitting text into chunks...");
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 150,
  });
  const splitDocs = await splitter.createDocuments([rawText]);
  console.log(`Total chunks to process: ${splitDocs.length}`);

  const embeddingsModel = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-embedding-001",
  });

  const outputDir = path.join(process.cwd(), "data");
  const outputPath = path.join(outputDir, "textbook-vectors.json");

  // Load existing vectors if resuming
  let vectorData: any[] = [];
  if (fs.existsSync(outputPath)) {
    try {
      vectorData = JSON.parse(fs.readFileSync(outputPath, "utf8"));
      console.log(`Resuming... Already processed ${vectorData.length} chunks.`);
    } catch (e) {
      vectorData = [];
    }
  }

  // Loop through chunks starting from where it left off
  for (let i = vectorData.length; i < splitDocs.length; i++) {
    console.log(`[${i + 1}/${splitDocs.length}] Embedding chunk...`);
    const doc = splitDocs[i];

    try {
      const res = await embeddingsModel.embedQuery(doc.pageContent);
      vectorData.push({
        content: doc.pageContent,
        metadata: { chunkIndex: i },
        embedding: res,
      });

      // Save progress incrementally every 5 chunks
      if ((i + 1) % 5 === 0) {
        fs.writeFileSync(outputPath, JSON.stringify(vectorData, null, 2));
      }

      // 5-second delay to safely stay inside free tier rate limits (approx 15 requests/min)
      await sleep(5000);
    } catch (err: any) {
      console.error(`❌ Error on chunk ${i + 1}:`, err.message || err);
      console.log("Waiting 30 seconds before retrying due to rate limit...");
      await sleep(30000); // Wait longer if hit with a 429
      i--; // Retry this same index
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(vectorData, null, 2));
  console.log(`✅ Success! All vectors saved to ${outputPath}`);
}

ingestText().catch((err) => {
  console.error("❌ Ingestion failed:", err);
});
