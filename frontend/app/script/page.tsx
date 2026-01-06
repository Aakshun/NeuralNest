"use client";

import { useState } from "react";

const SPEAKERS = [
  { name: "Pranjal", role: "leads analysis, frames context" },
  { name: "Aakshun", role: "challenges assumptions, probes implications" },
];

const MOCK_SCRIPT = `[Pranjal]
Welcome to NeuralNest, your autonomous AI news digest. This week we're diving into what I'm calling "The Reality Check Week" - where several major AI announcements are getting their first real-world validation.

[Aakshun]
And not all of them are holding up to the initial hype. Let's start with the big one - Google's Gemini 2.0 independent benchmarks are in.

[Pranjal]
Right. So Google claimed GPT-4 level performance across the board. The independent tests show they're close on language tasks, but there's a significant gap in reasoning tasks. About 15-20% behind on complex mathematical problems.

[Aakshun]
Which is interesting because that's exactly where Google has historically struggled. Their strength has always been in multimodal understanding, not pure reasoning. Are they trying to compete on the wrong battlefield?

[Pranjal]
That's the strategic question. Meanwhile, OpenAI quietly announced they're starting GPT-5 training. No fanfare, just a brief blog post.

[Aakshun]
And that tells us something. When they're confident, they're quiet. Remember GPT-4 - we didn't know about it until it was basically done. This suggests they have something substantial.

[Pranjal]
Agreed. Now, this connects to something we discussed in Episode 10 - the OpenAI leadership changes. The new organizational structure they announced this week matches what we predicted: more separation between research and product.

[Aakshun]
Which makes sense if you're training a model that might not ship for 18 months. You need research to run independently while the product team scales GPT-4 Turbo.

[Pranjal]
Exactly. And speaking of scaling - Microsoft's Copilot expansion is the quiet giant story this week. They're now in every Office application.

[Aakshun]
This is where the real money is. Not the flashy demos, but the boring enterprise integration that affects a billion users.

[Pranjal]
That's our show. Next week, we'll be watching the EU AI Act implementation timeline - there are some concerning details in the updated schedule.

[Aakshun]
Until then, stay skeptical.`;

export default function ScriptPage() {
  const [selectedSpeaker, setSelectedSpeaker] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-4">Podcast Script</h1>
      <p className="text-zinc-400 mb-8">
        Generated conversational script ready for recording
      </p>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-zinc-400 mb-2">
          SELECT YOUR SPEAKER PROFILE
        </label>
        <div className="flex gap-3">
          {SPEAKERS.map((speaker) => (
            <button
              key={speaker.name}
              onClick={() => setSelectedSpeaker(speaker.name)}
              className={`px-6 py-3 rounded-lg border transition ${
                selectedSpeaker === speaker.name
                  ? "border-blue-500 bg-blue-600 text-white"
                  : "border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="font-bold">{speaker.name}</div>
              <div className="text-xs text-zinc-400">{speaker.role}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedSpeaker && (
        <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Episode Script</h2>
            <div className="text-sm text-zinc-500">
              Theme: AI Reality Check Week
            </div>
          </div>

          <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed space-y-4">
            {MOCK_SCRIPT.split("\n").map((line, i) => (
              <div
                key={i}
                className={
                  line.startsWith(`[${selectedSpeaker}]`)
                    ? "text-blue-400 font-bold"
                    : line.startsWith("[")
                    ? "text-zinc-500"
                    : "text-zinc-300"
                }
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      )}

      {!selectedSpeaker && (
        <div className="border border-zinc-800 rounded-lg p-12 text-center text-zinc-500">
          Select a speaker profile to view the script
        </div>
      )}
    </div>
  );
}
