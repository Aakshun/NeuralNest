# NeuralNest Autonomous Podcast Agent

> **Zero‑touch AI system that autonomously researches AI news, tracks ongoing topics, and generates a ready‑to‑record podcast script.**

NeuralNest is designed for **fully automated podcast production**. The user does not research, curate, approve, or edit content. The only interaction required is:

```
Open App → Click Script → Select Speaker → Record
```

---

## 1. Core Philosophy

NeuralNest is **not** a chatbot or assistant. It is an **autonomous editorial agent**.

Key principles:

* Zero human decision‑making
* Deterministic, repeatable output
* Editorial judgment handled by agents
* Memory‑driven continuity across episodes

Humans are hosts, not editors.

---

## 2. High‑Level Architecture

```
[ News Ingestion ]
        ↓
[ Signal Filtering Agent ]
        ↓
[ Importance Scoring Agent ]
        ↓
[ Memory Matching Agent ]
        ↓
[ Narrative Planning Agent ]
        ↓
[ Script Generation Agent ]
        ↓
[ Voice‑Ready Podcast Script ]
```

Each stage is autonomous and agent‑driven.

---

## 3. Data Sources (No Manual APIs Required)

NeuralNest relies primarily on **RSS feeds and public sources**.

### Supported Inputs

* TechCrunch (AI RSS)
* MIT Technology Review (RSS)
* OpenAI Blog (RSS)
* Google AI Blog (RSS)
* Microsoft AI Blog (RSS)
* Hacker News (API – AI tagged stories)
* arXiv (API – AI/ML categories, optional)

> ❌ Individual publisher APIs are **not required**.

---

## 4. Agent Responsibilities

### 4.1 News Ingestion Agent

Runs on a fixed schedule (e.g. weekly).

Responsibilities:

* Fetch RSS feeds
* Pull relevant Hacker News stories
* Normalize article metadata
* Deduplicate content

**Output:**

```json
{
  "title": "...",
  "summary": "...",
  "source": "MIT Tech Review",
  "url": "...",
  "published_at": "...",
  "content": "..."
}
```

---

### 4.2 Signal Filtering Agent

Removes low‑value content.

Decision criteria:

* Marketing vs substance
* Novelty
* Technical depth
* Podcast relevance

**Output:**

```json
{
  "keep": true,
  "reason": "Major model release"
}
```

~70–80% of items are discarded here.

---

### 4.3 Importance Scoring Agent (Editor‑in‑Chief)

Ranks remaining items by editorial importance.

Scoring dimensions:

* Company impact
* Long‑term implications
* Technical significance
* Recurrence or follow‑up value
* Hype penalty

**Output:**

```json
{
  "importance_score": 8.7,
  "category": "Major"
}
```

Only top‑scoring items proceed.

---

### 4.4 Memory Matching Agent

Provides continuity across episodes.

System memory stores:

* Past episodes
* Topics discussed
* Tools mentioned
* Claims and opinions

New articles are vector‑matched against memory.

**Output:**

```json
{
  "type": "UPDATE",
  "original_episode": 12,
  "topic": "Google Antigravity",
  "urgency": "High"
}
```

This powers the **Updates** section automatically.

---

### 4.5 Narrative Planning Agent

Determines the **structure of the episode**, not the wording.

Responsibilities:

* Decide episode theme
* Order segments
* Allocate time per segment
* Decide transitions

**Output:**

```json
{
  "episode_theme": "AI Reality Check Week",
  "segments": [
    { "type": "Breaking News", "company": "OpenAI", "duration": 6 },
    { "type": "Industry Contradictions", "topic": "AI bubble vs hiring", "duration": 8 },
    { "type": "Follow‑up", "topic": "Google Antigravity", "duration": 5 }
  ]
}
```

This replaces human editorial planning.

---

### 4.6 Script Generation Agent

Final LLM pass.

Inputs:

* Narrative plan
* Curated news items
* Detected updates
* Speaker profiles
* Tone constraints

Outputs a **fully finished, speaker‑labeled script**.

**Characteristics:**

* Conversational
* Analytical
* No filler questions
* No marketing tone
* Callbacks to previous episodes

No edits expected.

---

## 5. Speaker Profiles

Speaker behavior is deterministic.

Example:

* **Pranjal**: leads analysis, frames context
* **Aakshun**: challenges assumptions, probes implications

This ensures consistent chemistry without improvisation.

---

## 6. UI Contract (Minimal by Design)

The UI is not an editor.

Available actions:

* View News (company‑wise)
* View Updates (automatic follow‑ups)
* View Script
* Select Speaker

No approvals, prompts, or manual curation.

---

## 7. Execution Model

* Background job runs weekly
* Script generated before user opens app
* Script stored in ready‑to‑read format

Opening the app is a **read‑only action**.

---

## 8. Known Trade‑offs

* Occasionally misses niche stories
* Biased toward high‑signal companies
* No human override by design

This is intentional to preserve autonomy.

---

## 9. Target Outcome

NeuralNest behaves like a disciplined newsroom:

* Consistent
* Opinionated
* Memory‑aware
* Zero‑touch

Humans only bring voice.

---

## 10. Status

This README defines the **canonical behavior** of the NeuralNest agent.

Any deviation that introduces human decision‑making violates system goals.
