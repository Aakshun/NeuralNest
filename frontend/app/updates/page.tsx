const MOCK_UPDATES = [
  {
    topic: "Google Gemini Launch",
    type: "FOLLOW_UP",
    episode: 12,
    urgency: "High",
    description: "Initial benchmarks have been validated by independent researchers",
  },
  {
    topic: "OpenAI Leadership Changes",
    type: "UPDATE",
    episode: 10,
    urgency: "Medium",
    description: "New organizational structure announced, matching our predictions",
  },
  {
    topic: "AI Regulation in EU",
    type: "CONTINUATION",
    episode: 8,
    urgency: "Low",
    description: "AI Act implementation timeline updated",
  },
];

export default function UpdatesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-4">Episode Updates</h1>
      <p className="text-zinc-400 mb-8">
        Automatic follow-ups on topics from previous episodes
      </p>

      <div className="space-y-4">
        {MOCK_UPDATES.map((update, i) => (
          <article key={i} className="border border-zinc-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-xl font-bold mb-1">{update.topic}</h2>
                <div className="flex gap-3 text-sm text-zinc-500">
                  <span className="text-blue-400">{update.type}</span>
                  <span>•</span>
                  <span>Episode {update.episode}</span>
                  <span>•</span>
                  <span
                    className={
                      update.urgency === "High"
                        ? "text-red-400"
                        : update.urgency === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }
                  >
                    {update.urgency} Urgency
                  </span>
                </div>
              </div>
            </div>
            <p className="text-zinc-300">{update.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
