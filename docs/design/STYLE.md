# Agent Passport — visual style

**Locked reference (boss, 2026-10-25):** [allscale.io](https://www.allscale.io/)  
**Taste bar:** Cursor / Linear / Granola / Resend restraint — not crypto neon, not cream “Paper Issue” as final brand.

Paper Issue (cream/amber) was a temporary scaffold only. Production tokens now follow AllScale **white + company green**.

## Tokens (implemented in `app/globals.css`)

| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#ffffff` | Page |
| `--bg-wash` | `#f4f8f5` | Soft mint sections |
| `--bg-elevated` | `#ffffff` | Cards / panels |
| `--text` | `#0c0c0c` | Ink |
| `--text-muted` | `#888888` | Secondary |
| `--accent` | `#00c96d` | CTA, ISSUED stamp, focus |
| `--accent-ink` | `#0c0c0c` | Text on green buttons |
| `--accent-soft` | `#e8f8f0` | Soft chip / hover |
| `--accent-deep` | `#24603a` | Success / deep green text |
| `--border` | `#e0e0e0` | Hairlines |
| `--code-bg` | `#0c0c0c` | Code islands |
| `--code-text` | `#f3f3f3` | Code |
| `--code-accent` | `#00c96d` | Code highlight |
| `--stamp` | `#00c96d` | ISSUED seal |
| `--danger` | `#c2410c` | REVOKED |

Typography: **Playfair Display** (hero / section titles) + **Inter** (body) + **IBM Plex Mono** (code).

## Hard product constraints (unchanged)

1. Developer hero: title + honest PRODUCT line + 3-line code  
2. Live demo (Simulated): **Issue → Mint disposable → Simulate call → Revoke**  
3. Public copy: no vendor names; no unlicensed bank claims  
4. Honest line: “Verify once. Your agent gets an account, a card and a phone number.”

## Repo layout for founder review

| Path | Purpose |
|------|---------|
| `design/STYLE.md` | This file |
| `design/refs/` | Reference notes / screenshots |
| `design/mockups/` | Passport / card / phone / balance UI (placeholder) |
| `design/video/` | Storyboard + exports (placeholder) |
| `docs/PRODUCT.md` | Product narrative |

Dark (black + green) remains an alternate if founder prefers sharper contrast — swap via CSS variables only.
