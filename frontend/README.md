# NeuralNest Frontend

Autonomous podcast script generation UI.

## Local Development

```bash
npm run dev
```

Open http://localhost:3000

## Pages

- **/** - Home page with overview
- **/news** - AI news organized by company (OpenAI, Google, Microsoft, Anthropic)
- **/updates** - Automatic follow-ups from previous episodes
- **/script** - Generated podcast scripts with speaker profiles

## Deployment

Deploy to Vercel:

1. Connect your GitHub repository
2. Set root directory to `frontend`
3. Deploy

Or use Vercel CLI:

```bash
vercel --prod
```

## Features

- Minimal, read-only UI
- Company-organized news view
- Memory-based episode updates
- Speaker profile selection (Pranjal, Aakshun)
- Dark theme optimized for readability

Backend integration coming soon.
