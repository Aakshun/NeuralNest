"use client";

import { useState } from "react";

const MOCK_NEWS = {
  "OpenAI": [
    { title: "GPT-5 Training Begins", summary: "OpenAI announces the start of GPT-5 training with unprecedented scale", score: 9.2 },
    { title: "ChatGPT Enterprise Updates", summary: "New features for enterprise customers including advanced analytics", score: 7.5 },
  ],
  "Google": [
    { title: "Gemini 2.0 Release", summary: "Google releases Gemini 2.0 with improved reasoning capabilities", score: 8.8 },
    { title: "AI-Powered Search Evolution", summary: "Major updates to Google Search using advanced AI models", score: 7.2 },
  ],
  "Microsoft": [
    { title: "Copilot Expansion", summary: "Microsoft expands Copilot to all Office applications", score: 8.1 },
    { title: "Azure AI Infrastructure", summary: "New AI infrastructure investments announced for 2025", score: 7.8 },
  ],
  "Anthropic": [
    { title: "Claude 4 Architecture", summary: "Technical deep-dive into Claude 4's novel architecture", score: 8.9 },
    { title: "Constitutional AI Research", summary: "New research on making AI systems more aligned and safe", score: 8.3 },
  ],
};

export default function NewsPage() {
  const [selectedCompany, setSelectedCompany] = useState("OpenAI");

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8">AI News by Company</h1>

      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0">
          <div className="sticky top-8">
            <h3 className="text-sm font-semibold text-zinc-400 mb-4">COMPANIES</h3>
            <nav className="space-y-1">
              {Object.keys(MOCK_NEWS).map((company) => (
                <button
                  key={company}
                  onClick={() => setSelectedCompany(company)}
                  className={`w-full text-left px-4 py-2 rounded transition ${
                    selectedCompany === company
                      ? "bg-blue-600 text-white"
                      : "hover:bg-zinc-800"
                  }`}
                >
                  {company}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <div className="space-y-4">
            {MOCK_NEWS[selectedCompany as keyof typeof MOCK_NEWS].map((article, i) => (
              <article key={i} className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-bold">{article.title}</h2>
                  <span className="text-sm text-blue-400 font-mono">Score: {article.score}</span>
                </div>
                <p className="text-zinc-400">{article.summary}</p>
                <div className="mt-4 flex gap-3 text-sm text-zinc-500">
                  <span>{selectedCompany}</span>
                  <span>•</span>
                  <span>2 days ago</span>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
