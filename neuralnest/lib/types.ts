export interface Article {
  title: string;
  summary: string;
  source: string;
  url: string;
  published_at: string;
  content: string;
}

export interface FilterResult {
  keep: boolean;
  reason: string;
}

export interface ScoredArticle extends Article {
  importance_score: number;
  category: string;
}

export interface MemoryMatch {
  type: string;
  original_episode?: number;
  topic: string;
  urgency: string;
}

export interface Segment {
  type: string;
  topic: string;
  duration: number;
  company?: string;
}

export interface NarrativePlan {
  episode_theme: string;
  segments: Segment[];
}

export interface SpeakerProfile {
  name: string;
  role: string;
}

export const SPEAKERS: SpeakerProfile[] = [
  { name: "Pranjal", role: "leads analysis, frames context" },
  { name: "Aakshun", role: "challenges assumptions, probes implications" }
];

export const RSS_FEEDS = [
  "https://techcrunch.com/tag/artificial-intelligence/feed/",
  "https://www.technologyreview.com/feed/",
  "https://openai.com/blog/rss/",
  "https://blog.google/technology/ai/rss/",
  "https://blogs.microsoft.com/ai/feed/"
];
