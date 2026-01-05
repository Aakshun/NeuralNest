"use client";

import { useState } from "react";
import { SPEAKERS } from "@/lib/types";

export default function Home() {
  const [speaker, setSpeaker] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const loadScript = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/script");
      if (res.ok) {
        const data = await res.json();
        setScript(data.script);
      } else {
        setScript("No script available. Generate one first.");
      }
    } catch (e) {
      setScript("Error loading script");
    }
    setLoading(false);
  };

  const generateNew = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/generate", { method: "POST" });
      const data = await res.json();
      if (data.script) {
        setScript(data.script);
      }
    } catch (e) {
      alert("Error generating script");
    }
    setGenerating(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">NeuralNest</h1>

        <div className="mb-8 flex gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-400">Select Speaker Profile</label>
            <select
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded px-4 py-2"
            >
              <option value="">Choose profile</option>
              {SPEAKERS.map(s => (
                <option key={s.name} value={s.name}>{s.name} - {s.role}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 items-end">
            <button
              onClick={loadScript}
              disabled={loading || !speaker}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 px-6 py-2 rounded"
            >
              {loading ? "Loading..." : "Load Script"}
            </button>

            <button
              onClick={generateNew}
              disabled={generating}
              className="bg-green-600 hover:bg-green-700 disabled:bg-zinc-800 px-6 py-2 rounded"
            >
              {generating ? "Generating..." : "Generate New"}
            </button>
          </div>
        </div>

        {script && (
          <div className="bg-zinc-900 border border-zinc-800 rounded p-6">
            <h2 className="text-2xl font-bold mb-4">Podcast Script</h2>
            <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {script}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
