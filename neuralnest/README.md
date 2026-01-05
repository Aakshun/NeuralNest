# NeuralNest - Autonomous Podcast Agent

Zero-touch AI system that generates podcast scripts from AI news.

## Setup

1. Copy `.env.example` to `.env.local` and add your Anthropic API key:
```bash
cp .env.example .env.local
```

2. Start the dev server:
```bash
npm run dev
```

3. Open http://localhost:3000

## Usage

1. Select speaker profile (Pranjal or Aakshun)
2. Click "Generate New" to run the full pipeline (takes 1-2 minutes)
3. Click "Load Script" to view the generated script

## Architecture

- **News Ingestion**: Fetches from TechCrunch, MIT Tech Review, OpenAI, Google, Microsoft blogs
- **Signal Filtering**: AI filters out low-value content
- **Importance Scoring**: Ranks articles by editorial significance
- **Memory Matching**: Detects follow-ups from past episodes
- **Narrative Planning**: Structures episode theme and segments
- **Script Generation**: Creates conversational podcast script

Scripts are saved to `data/latest-script.json`
