# Agent Passport — Product Pitch & Feature Spec

Last updated: 2026-10-24  
Status: working product narrative (for founders, partners, investors). Landing copy may lag this doc.

---

## One-liner

**Agent Passport** turns any AI agent into a trusted actor: one human verification, then an identity, an agent-native bank account, cards, a phone number, and a unified balance — reusable across every agent you run.

Spoken variant: *Anyone can buy a number or a card. Nobody gives your agent a portable, revocable credential — identity, money, and authority under one Passport — that travels across every agent you run.*

---

## The problem

Agents can think and plan, but the internet still mostly trusts people. Wherever an agent has to **act for you**, it hits the same walls:

- It can’t prove you authorized it
- It can’t pay safely (or mint a card for one purchase)
- It can’t receive SMS / OTP or place a phone call
- It can’t open or use a real account designed for agents
- You don’t want to paste sensitive credentials into every agent and every platform

So agents stay assistants. They don’t become operators.

**Why “just use a normal bank / eSIM / virtual number” is not enough:** those are parts. The hard product is binding them to a **verified human**, with **scoped, revocable, auditable authority**, a **unified balance**, and **reuse across many agents** without re-KYC and without dumping secrets into each agent.

---

## Positioning

| Do say | Don’t say |
|--------|-----------|
| Portable credential for agents (identity + money + authority) | “Another agent wallet” or feature checklist alone |
| Agent-native neobank rails | “We are a bank” / unlicensed banking claims |
| Standing card & Disposable card (passkey-authorized) | Bypass fraud / evade platform rules |
| Progressive disclosure of identity | Name underlying vendors on public pages |
| Verify once, reuse across agents & platforms | “Already accepted everywhere” (chicken-and-egg) |

**Brand vs fundraising language:** product name **Agent Passport**; commercial model can be framed as agent-native **neobank / financial rails** (not “bank” without care).

---

## What you get after verification

### 1. Identity & Passport
- One-time human verification → mint a Passport
- Passport attributes tied to the verified person
- Progressive disclosure / selective proof:
  - **Layer 1 — Authorized:** a human authorized this agent
  - **Layer 2 — Representing you:** this agent acts on your behalf
  - **Layer 3 — Attributes:** only what’s needed (e.g. adult, nationality) without full dossier
- Token sharing for regulated / partner KYC reuse (under consent)
- Cross-agent & cross-platform reuse: verify once, grant many agents

### 2. Agent-native neobank account
- Account issued for the agent after verification
- USD account
- Multi-currency support (confirm coverage before over-claiming)
- Stablecoin balance
- Conversion between USD / other currencies / stablecoins
- Unified ledger with the rest of Passport spend

### 3. Cards (you control)
- **Disposable card** — passkey-approve → mint a fresh card per transaction
- **Standing card** — longer-lived card you keep authorized for recurring use
- Passkey authorization for card issuance / use
- **Card Vault** — store your own cards for agent use under your rules
- Spend tied to Passport balance & limits

### 4. Phone number
- Dedicated number for the agent
- Outbound / inbound calls
- SMS send / receive (including OTP-style flows where allowed)
- Usage billed from the unified balance

### 5. Unified balance & controls
- Top-up / recharge
- One balance for account, cards, phone, and future gated features
- Limits, approvals, freeze / revoke
- Full audit trail of authorizations and spend

### 6. Access model
- Install / connect Passport to any agent
- Scope grants per agent (general vs vertical agents)
- Don’t paste secrets into every agent — Passport holds identity + rails

---

## Feature map (checklist)

**Identity & Passport**
- [ ] Human verification → Passport mint
- [ ] Attribute store
- [ ] Progressive disclosure (authorized / representing / attributes)
- [ ] Token sharing for partner KYC
- [ ] Cross-agent grants
- [ ] Cross-platform reuse

**Account**
- [ ] Agent-native account after verification
- [ ] USD
- [ ] Multi-currency
- [ ] Stablecoins
- [ ] Conversion
- [ ] Unified ledger

**Cards**
- [ ] Disposable card (per transaction, passkey)
- [ ] Standing card (persistent, passkey-governed)
- [ ] Card Vault (user’s own cards)
- [ ] Limits & audit

**Phone**
- [ ] Dedicated number
- [ ] Voice in/out
- [ ] SMS in/out
- [ ] Balance metering

**Controls**
- [ ] Unified balance & top-up
- [ ] Limits / approvals
- [ ] Freeze / revoke
- [ ] Audit trail

---

## 30-second pitch (English)

Agents can already think. They still can’t act, because the world only trusts people. Agent Passport fixes that. Verify once, and your agent gets an identity, an agent-native bank account, cards you approve with a passkey — disposable per purchase or a standing card for ongoing use — plus a phone number and one unified balance. When the internet asks who authorized this, who they represent, or whether you’re an adult, we disclose only what’s needed. One Passport, many agents, across platforms.

---

## Suggested landing order (English site)

1. Hero — Every agent deserves a passport. / Verify once → identity, account, cards, phone, unified balance
2. Problem — Every gate asks: who are you, who do you represent, who pays?
3. Flow — Verify → account → cards & number → top up → agent acts
4. What’s in the Passport — six cards (Identity, Account, Standing/Disposable cards + Vault, Phone, Unified balance, Controls)
5. Scenarios — e.g. trip ops, agent-hires-agent, minimal disclosure
6. For developers — plugin / CLI; honest onboarding (verify once, then provision)
7. Vision — portable credential; trust thickens with every authorization

Public pages: no vendor names; no unverified “licensed / bank” claims.

---

## Honest risks (internal)

- Platform acceptance of selective proofs is chicken-and-egg; near-term GTM is unified account + cards + phone under one policy.
- Standing/Disposable and Vault claims must match real capabilities (e.g. whether the agent can see PAN).
- Multi-currency / global bank wording must match actual coverage.

