import fs from "fs/promises";
import path from "path";

const MEMORY_DIR = path.join(process.cwd(), "data");
const EPISODES_FILE = path.join(MEMORY_DIR, "episodes.json");
const SCRIPT_FILE = path.join(MEMORY_DIR, "latest-script.json");

export async function ensureDataDir() {
  try {
    await fs.mkdir(MEMORY_DIR, { recursive: true });
  } catch (e) {}
}

export async function getPastEpisodes(): Promise<string[]> {
  try {
    const data = await fs.readFile(EPISODES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export async function saveEpisode(theme: string) {
  const episodes = await getPastEpisodes();
  episodes.push(theme);
  await fs.writeFile(EPISODES_FILE, JSON.stringify(episodes, null, 2));
}

export async function saveScript(script: string, metadata: any) {
  await fs.writeFile(SCRIPT_FILE, JSON.stringify({ script, metadata, timestamp: new Date().toISOString() }, null, 2));
}

export async function getLatestScript(): Promise<{ script: string; metadata: any; timestamp: string } | null> {
  try {
    const data = await fs.readFile(SCRIPT_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}
