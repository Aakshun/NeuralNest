import Anthropic from "@anthropic-ai/sdk";
import Parser from "rss-parser";
import { Article, FilterResult, ScoredArticle, MemoryMatch, NarrativePlan, SpeakerProfile } from "./types";
import { RSS_FEEDS } from "./types";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const parser = new Parser();

export async function ingestNews(): Promise<Article[]> {
  const articles: Article[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed);
      for (const item of parsed.items.slice(0, 10)) {
        articles.push({
          title: item.title || "",
          summary: item.contentSnippet || item.summary || "",
          source: parsed.title || "",
          url: item.link || "",
          published_at: item.pubDate || new Date().toISOString(),
          content: item.content || item.contentSnippet || ""
        });
      }
    } catch (e) {
      console.error(`Failed to fetch ${feed}`);
    }
  }

  return articles;
}

export async function filterSignal(article: Article): Promise<FilterResult> {
  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 256,
    messages: [{
      role: "user",
      content: `Is this AI news article worth discussing in a technical podcast? Respond with JSON only: {"keep": true/false, "reason": "brief reason"}

Title: ${article.title}
Summary: ${article.summary}`
    }]
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "{}";
  return JSON.parse(text);
}

export async function scoreImportance(article: Article): Promise<ScoredArticle> {
  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 256,
    messages: [{
      role: "user",
      content: `Score this AI news article's importance (0-10) considering: company impact, long-term implications, technical significance. Respond with JSON only: {"importance_score": 8.5, "category": "Major"}

Title: ${article.title}
Summary: ${article.summary}
Source: ${article.source}`
    }]
  });

  const text = message.content[0].type === "text" ? message.content[0].text : '{"importance_score": 5, "category": "Medium"}';
  const score = JSON.parse(text);
  return { ...article, ...score };
}

export async function matchMemory(articles: ScoredArticle[], pastEpisodes: string[]): Promise<MemoryMatch[]> {
  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: `Given these new articles and past episodes, identify any follow-ups or updates. Respond with JSON array only: [{"type": "UPDATE", "topic": "...", "urgency": "High"}]

New articles:
${articles.map(a => `- ${a.title}`).join('\n')}

Past episodes:
${pastEpisodes.join('\n')}`
    }]
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "[]";
  return JSON.parse(text);
}

export async function planNarrative(articles: ScoredArticle[], updates: MemoryMatch[]): Promise<NarrativePlan> {
  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: `Plan a podcast episode structure. Respond with JSON only: {"episode_theme": "...", "segments": [{"type": "Breaking News", "topic": "...", "duration": 6, "company": "..."}]}

Top articles:
${articles.map(a => `- ${a.title} (${a.source}) - Score: ${a.importance_score}`).join('\n')}

Updates from past episodes:
${updates.map(u => `- ${u.topic} (${u.urgency})`).join('\n')}`
    }]
  });

  const text = message.content[0].type === "text" ? message.content[0].text : '{"episode_theme": "AI Updates", "segments": []}';
  return JSON.parse(text);
}

export async function generateScript(
  plan: NarrativePlan,
  articles: ScoredArticle[],
  updates: MemoryMatch[],
  speakers: SpeakerProfile[]
): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 4096,
    messages: [{
      role: "user",
      content: `Generate a conversational podcast script. Use speaker labels like "[Pranjal]" and "[Aakshun]". Be analytical, no filler questions, no marketing tone.

Episode theme: ${plan.episode_theme}

Segments:
${plan.segments.map(s => `- ${s.type}: ${s.topic} (${s.duration}min)`).join('\n')}

Articles:
${articles.slice(0, 5).map(a => `${a.title}\n${a.summary}\nSource: ${a.source}`).join('\n\n')}

Updates:
${updates.map(u => u.topic).join(', ')}

Speakers:
${speakers.map(s => `${s.name}: ${s.role}`).join('\n')}`
    }]
  });

  return message.content[0].type === "text" ? message.content[0].text : "No script generated";
}
