import { NextResponse } from "next/server";
import { ingestNews, filterSignal, scoreImportance, matchMemory, planNarrative, generateScript } from "@/lib/agents";
import { SPEAKERS } from "@/lib/types";
import { ensureDataDir, getPastEpisodes, saveEpisode, saveScript } from "@/lib/memory";

export async function POST() {
  try {
    await ensureDataDir();

    // Stage 1: Ingest
    const articles = await ingestNews();

    // Stage 2: Filter
    const filtered = [];
    for (const article of articles) {
      const result = await filterSignal(article);
      if (result.keep) filtered.push(article);
    }

    // Stage 3: Score
    const scored = await Promise.all(filtered.map(scoreImportance));
    scored.sort((a, b) => b.importance_score - a.importance_score);
    const top = scored.slice(0, 5);

    // Stage 4: Memory match
    const pastEpisodes = await getPastEpisodes();
    const updates = await matchMemory(top, pastEpisodes);

    // Stage 5: Plan narrative
    const plan = await planNarrative(top, updates);

    // Stage 6: Generate script
    const script = await generateScript(plan, top, updates, SPEAKERS);

    // Save
    await saveEpisode(plan.episode_theme);
    await saveScript(script, { plan, articles: top, updates });

    return NextResponse.json({ success: true, script, plan });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
