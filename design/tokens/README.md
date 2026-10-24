# Agent Passport — visual tokens (aligned to AllScale)

**Source:** https://www.allscale.io/ (boss direction 2026-10-25)  
**Status:** working draft — founder to pick light vs dark primary  
**Taste bar:** Cursor / Linear / Granola / Resend restraint — not crypto neon

## Extracted from AllScale

| Token | Hex | Use |
|-------|-----|-----|
| Brand green | `#00c96d` | CTA, active, stamps, focus |
| Green deep | `#24603a` | text-on-mint, secondary links |
| Green mid | `#438e60` | borders, chips |
| Ink | `#0c0c0c` | primary text (light mode) |
| Soft mint | `#f4f8f5` | section wash |
| Near white | `#ffffff` / `#f3f3f3` | page / cards |
| Muted | `#888888` | secondary text |

## Proposed Agent Passport systems

### Light (recommended first pass)
- Page `#FFFFFF`, wash `#F4F8F5`
- Text ink `#0C0C0C`, muted `#6B7280`
- Accent `#00C96D` (buttons, ISSUED stamp, live demo step active)
- Card surface white + 1px `#E1E6E1`, radius 12–16, soft shadow
- No cream paper, no amber seals

### Dark (alt)
- Page `#0C0C0C`, panels `#111111`
- Text `#FFFFFF` / `#ADB5BD`
- Accent `#00C96D` only (sparse)

## Do not
- Neon green glow, fake phone bezels, particle backgrounds
- Copy AllScale wordmark onto Agent Passport as if same product
- Over-claim bank / licensed language on UI chrome

## Repo layout (for founder check)
Push under `github.com/shawnpang/agentpassport`:
- `design/mockups/` — passport / card / phone / balance UI
- `design/video/` — storyboard + exports
- `design/refs/` — X viral structures, AllScale screenshots
- `docs/PRODUCT.md` — narrative (already exists locally)
