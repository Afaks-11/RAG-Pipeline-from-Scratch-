import { chunkText } from "./chunk/chunker.js";
import { embedTexts, embedQuery } from "./embedding/embedding.js";
import { VectorStore } from "./database/vector-store.js";
import { generate } from "./generator/generator.js";
import { CONFIG } from "./config/config.js";

const documents = [
  {
    source: "product-overview.md",
    content: `Chanl is an AI agent platform for building, connecting, and monitoring
customer experience agents. It supports voice and text channels. Agents can be
configured with custom prompts, knowledge bases, and tool integrations.
 
The platform provides real-time analytics for monitoring agent performance,
including call duration, resolution rates, and customer satisfaction scores.
Analytics dashboards show trends over time and highlight areas for improvement.
 
Agents connect to external systems through MCP (Model Context Protocol)
integrations. MCP allows agents to call APIs, query databases, and trigger
workflows in third-party tools without custom code.`,
  },
  {
    source: "pricing-faq.md",
    content: `Chanl offers three pricing tiers: Lite, Startup, and Business.
 
The Lite plan includes up to 5 agents and 1,000 interactions per month.
It costs $49/month and is designed for small teams getting started.
 
The Startup plan includes up to 25 agents and 10,000 interactions per month.
It costs $199/month and includes advanced analytics and priority support.
 
The Business plan includes unlimited agents and interactions.
Pricing is custom and includes dedicated support, SLAs, and SSO.`,
  },
  {
    source: "memory-system.md",
    content: `The memory system allows agents to remember information across conversations.
Short-term memory persists within a single conversation session.
Long-term memory stores facts about customers across multiple conversations.
 
Memory entries are automatically extracted from conversations and stored
as key-value pairs. For example, if a customer mentions they prefer email
communication, the agent stores this preference and uses it in future
interactions.
 
Memory can be managed through the API or the admin dashboard. Entries can
be viewed, edited, or deleted. Memory is scoped per customer per agent.`,
  },
];

async function main() {
  console.log("Checking API Key setup...");
  const key = CONFIG.API_KEY;
  if (!key) {
    console.log("Error: Key is completely empty!");
    return;
  } else {
    // This prints the first 5 letters just to prove it loaded, without exposing your whole secret key
    console.log(
      `Key loaded successfully! It starts with: ${key.substring(0, 5)}...`,
    );
  }

  console.log("=== RAG Pipeline Demo ===\n");

  // step 1: Index documents
  console.log("Indexing documents....");
  const store = new VectorStore();

  for (const doc of documents) {
    const chunks = chunkText(doc.content, { maxChunkSize: 300, overlap: 30 });
    const embeddings = await embedTexts(chunks.map((c) => c.text));
    store.add(chunks, embeddings, doc.source);
    console.log(`  ${doc.source}: ${chunks.length} chunks`);
  }

  console.log(`\nTotal chunks in store: ${store.size}\n`);

  // Step 2: Query
  const queries = [
    "What analytics features does Chanl provide?",
    "How much does the Startup plan cost?",
    "How does the memory system work?",
    "Does Chanl support Salesforce integration?",
  ];

  for (const query of queries) {
    console.log(`Q: ${query}`);

    // Retrieve
    const queryEmbedding = await embedQuery(query);
    const results = store.search(queryEmbedding, 3);

    console.log(`  Retrieved ${results.length} chunks:`);
    for (const r of results) {
      console.log(
        `    - [${r.source}] score: ${r.score.toFixed(3)} | "${r.chunk.text.slice(0, 60)}..."`,
      );
    }

    // Generate
    const { answer } = await generate(query, results);
    console.log(`\nA: ${answer}\n`);
    console.log("---\n");
  }
}

main().catch(console.error);
