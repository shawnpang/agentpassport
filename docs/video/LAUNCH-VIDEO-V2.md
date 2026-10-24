# Agent Passport — Launch Video V2

**Status:** scored remix · mean ≈ −22 dB (was −90 bug) · silent track unchanged
**Brand LOCKED:** white `#FFFFFF` · ink `#0C0C0C` · green `#00C96D` · wash `#F4F8F5`  
**Reject:** slideshow · lifestyle B-roll · cream paper · neon · fake phone bezels

## Exports

| File | Track | Notes |
|------|-------|-------|
| [`public/video/agent-passport-60s-v2-silent.mp4`](../../public/video/agent-passport-60s-v2-silent.mp4) | Silent + captions | **Site `#video` default** |
| [`public/video/agent-passport-60s-v2.mp4`](../../public/video/agent-passport-60s-v2.mp4) | Same picture + BGM | X / social |
| `public/video/agent-passport-60s.mp4` | v1 fallback | Keep; do not delete |

**Spec:** 1280×720 · H.264 yuv420p · 24 fps · ~51s  
**Source:** continuous LiveDemo on production UI (Issue → Mint → Call → Revoke), not stills.  
**Record script:** `scripts/record-launch-v2.mjs`  
**Reel (optional motion HTML):** `public/video/reel-v2.html`  
**BGM:** `docs/video/audio/ambient-pad.mp3` — see `docs/video/audio/README.md`

## Formula

Primary = **① Computer-Use continuous UI** (Claude-style) with **③ silent big-caption** overlays for site.

| Beat | Caption (≤8 words) | UI |
|------|--------------------|-----|
| Open | Every agent deserves a passport. | Title card |
| Issue | Verify once. Issue a credential. | LiveDemo Issued Active |
| Mint | Passkey-mint. Per purchase. | Disposable card Live |
| Call | Card · Phone · One ledger. | In call + vault/ledger |
| Revoke | Revoke anytime. Full audit. | Revoke action |
| CTA | Agent Passport — early access. | Hold |

## Gate checklist

- [x] Fine screens approved (with footer / hero-state conditions)
- [x] Continuous real UI (LiveDemo clicks), not slideshow
- [x] Dual silent + BGM tracks
- [x] No neon / phone bezel / lifestyle
- [x] v1 retained as fallback
