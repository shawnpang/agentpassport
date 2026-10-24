# Product film assets

| File | Role |
|------|------|
| `agent-passport-60s-v2-silent.mp4` | **Current** site film (silent captions) |
| `agent-passport-60s-v2.mp4` | Scored cut (light BGM) |
| `agent-passport-60s.mp4` | v1 fallback |
| `reel-v2.html` / `reel.html` | Motion / legacy reel sources |
| `frames/` | v1 stills |
| `frames-v2/` | optional capture scratch (gitignored if huge) |

Encode: `node scripts/record-launch-v2.mjs` (requires local `next start` on :3456).
