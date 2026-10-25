# Agent Passport — Travel 首标杆视频（信任弧）

**Status:** QA passed · 测试抽帧过关 · 创始人认过 · **站 `#video` 只挂 silent**（有声 / punch 不进站）  
**Brand LOCKED:** white `#FFFFFF` · ink `#0C0C0C` · green `#00C96D` · wash `#F4F8F5`  
**Arc LOCKED:** 验清身份 → 被信任去办事 → 随时收回  
**三高潮:** Verify once · Hotel recognizes mandate · Authority wiped  
**Reject:** Mint/卡/号/烧卡当高潮 · bank · already available everywhere · Mint form 主标题 · 大张 BURNED 卡作 Revoke 主视觉

## Caption axis（站 silent ~43s）— English on-screen LOCK

| t | Caption |
|---|--------|
| 0–3s | Agents can plan. Sites still only trust people. |
| 3–8s | No proof you authorized it. |
| 8–12s | Stuck booking. Stuck calling the desk. |
| 12–17s | Verify once → Agent Passport |
| 17–24s | Hotel recognizes this mandate. |
| 24–30s | Booked. Desk confirmed. One ledger. |
| 30–36s | Revoke. Authority gone. |
| 36–42s | One Passport. Many agents. Request access. |

## X punch ~16.3s（归档，不进站）

Stuck hotel won’t trust → Verify once → Hotel recognizes mandate → booked → Revoke wiped → CTA `One Passport. Many agents.`  
下一步再定是否推 X。

## Source

- Reel: `docs/video/reel/reel-v4-travel.html` (`?seek=` · `window.__REEL_READY__`)
- Storyboard: `docs/video/TRAVEL-STORYBOARD.md`
- Capture: `/workspace/ap-video-travel/capture-v4.mjs`
- BGM: `docs/video/audio/upbeat-bed-v3.mp3`（欢快 120–140BPM）
- UI: self-drawn Travel panels（mandate / Spend proof · secondary / Authority map · wiped）— 不复用旧 Mint/BURNED 截图作主镜头

## Exports（双轨归档）

| File | Track | Site |
|------|-------|------|
| `public/video/agent-passport-travel-silent.mp4` | 站用静音 ~43s 1280×720 | **挂 `#video`** |
| `public/video/agent-passport-travel.mp4` | 有声同长 | 归档，不进站 |
| `public/video/agent-passport-travel-punch.mp4` | X punch ~16.3s 有声 | 归档，不进站 |
| `public/video/agent-passport-travel-punch-silent.mp4` | punch 静音 | 归档，可选 |

## Measured mix（Asia/Shanghai encode）

- Full scored: mean **−22.9 dB** · max **−8.6 dB**
- Punch scored: mean **−22.9 dB** · max **−10.7 dB**

## Gate

- [x] 三高潮钉死，无 Mint / 烧卡主镜头
- [x] OTP / 电话标 secondary
- [x] 字幕轴英文大字按表
- [x] 双轨 silent + scored + punch 归档进 `docs/video` + `public/video`
- [x] 测试抽帧过关 · 创始人认过（2026-10-25）
- [ ] 连续光标实录（仍为债；本轮 reel 截帧）
- [ ] X punch 是否外发（待定）

*设计 · AgentPassport 工作组 · 2026-10-25*
