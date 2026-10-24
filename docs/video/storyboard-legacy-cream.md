# AgentPassport 产品视频分镜（配方 A：静音 UI + 大字字幕）

**日期：** 2026-10-25（Asia/Shanghai）  
**主片：** ~60s · 16:9（站内 hero）  
**锁定：** 方向 **A · Paper Issue**（奶油纸 + 平面护照页 + 琥珀印记）  
**原则：** 无声也能懂；界面为 Paper Issue mock（可 HTML 录制）；**禁止**文生视频生成小字 UI。

对齐群决策：
- 站上 live demo：Issue → Mint disposable → Revoke（Simulated）；通话可选第四步不挡上线
- **模拟通话 + 流水更新进视频主线**（测试 VIDEO-SCRIPT + 创始人定调）

参考：Notion Agents / Cursor / Linear 静音 UI；`/workspace/agentpassport-design-refs/VIDEO-SCRIPT.md`

---

## 主片 ~60s Beat-by-beat（英文 on-screen copy）

| t | 画面 | On-screen copy |
|---|------|----------------|
| 0:00–0:04 | 奶油底字卡 | **Every agent deserves a passport.** |
| 0:04–0:10 | 痛点字卡 | **The internet still only trusts people.** |
| 0:10–0:12 | 短切 | **Verify once.** |
| 0:12–0:24 | **Issue**：空白护照页 → 字段填入 → 琥珀 **ISSUED** 印记 | **Issue a portable credential.** |
| 0:24–0:34 | **Mint**：passkey mock → disposable 卡掩码 `•••• 4291` | **Passkey-mint a card. Per purchase.** |
| 0:34–0:46 | **Call + ledger**：拨号/通话态 20s mock；流水两行跳动（card $12 · call） | **Card · Phone · One ledger.** |
| 0:46–0:54 | **Revoke**：盖章 **REVOKED**；audit 三行 | **Revoke anytime. Full audit.** |
| 0:54–1:00 | Logo + CTA | **Agent Passport** · **Request early access** |

> 压到 45s：删痛点句、通话段剪到 6s。  
> 不要：供应商 logo、「licensed bank」、绕过 CAPTCHA / fraud 话术。

### 必出状态（成片 checklist）

- [ ] 空白护照 → ISSUED
- [ ] Disposable 卡掩码
- [ ] 模拟通话 UI + 流水两行
- [ ] REVOKED 印记 + audit
- [ ] 结束 CTA

### 视觉 token（跟开发站一致）

- 底 `#F7F4EC` · 墨 `#1A1714` · 琥珀印 `#C47A2C` · 纸边线 `#D9D2C4`
- 字幕大号、每句 ≤ 8 词；硬切或 2 帧奶油底；无闪白/粒子

---

## 制作

| 角色 | 事 |
|------|----|
| **设计** | 本分镜 + HTML 纸感 reel 录制成片 → 丢开发嵌站 |
| **开发** | Live Demo mock（A token）；嵌视频 |
| **测试** | 验收文案不过头 + 三步 demo |


> DEPRECATED — cream Paper Issue. Use storyboard.md (locked light).
