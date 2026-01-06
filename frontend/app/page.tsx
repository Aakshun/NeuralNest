export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold">NeuralNest</h1>
        <p className="text-2xl text-zinc-400 max-w-2xl mx-auto">
          Autonomous AI system that researches AI news, tracks ongoing topics,
          and generates ready-to-record podcast scripts
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition">
            <h3 className="text-xl font-bold mb-2">News</h3>
            <p className="text-zinc-400">
              AI news curated and organized by company from top sources
            </p>
          </div>

          <div className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition">
            <h3 className="text-xl font-bold mb-2">Updates</h3>
            <p className="text-zinc-400">
              Automatic follow-ups on topics from previous episodes
            </p>
          </div>

          <div className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition">
            <h3 className="text-xl font-bold mb-2">Script</h3>
            <p className="text-zinc-400">
              Generated podcast scripts ready for recording
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-4 text-zinc-500 text-sm">
          <p>Zero human decision-making • Memory-driven continuity • Deterministic output</p>
        </div>
      </div>
    </div>
  );
}
