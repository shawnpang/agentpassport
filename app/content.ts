// Site copy — aligned with docs/PRODUCT.md (2026-10-24). English landing.
export const content = {
  brand: "Agent Passport",
  nav: ["Live demo", "How it works", "Passport", "Scenarios", "Developers", "FAQ"],
  hero: {
    eyebrow: "Portable credential for agents",
    title: "Every agent deserves a passport.",
    // Honest PRODUCT line — not "in one API call"
    sub: "Verify once. Your agent gets an account, a card and a phone number.",
    truth:
      "One human verification, then a portable credential — identity, rails, and authority — that travels with every agent you run.",
    primary: "Request early access",
    secondary: "See live demo",
    code: [
      "$ agentpassport init",
      "$ agentpassport grant --agent travel-ops",
      "$ agentpassport card create --limit 400",
    ],
  },
  demo: {
    title: "Issue & revoke",
    sub: "Try the credential lifecycle. Pure frontend mock — no KYC, no real funds.",
    badge: "Simulated · no real funds",
  },
  video: {
    title: "See it in motion",
    sub: "60-second walkthrough: verify → issue → mint → call → revoke.",
    placeholder: "Demo video coming soon",
  },
  problem: {
    title: "Every door on the internet asks three questions.",
    items: [
      {
        q: "Who are you?",
        a: "Agents show up anonymous. Sites can't tell a trusted assistant from a script.",
      },
      {
        q: "Who do you represent?",
        a: "There's no portable way to prove a real human authorized this agent, for this task.",
      },
      {
        q: "Who pays?",
        a: "Handing an agent your raw card number is a bad idea. Most agents simply stop at checkout.",
      },
    ],
  },
  flow: {
    title: "From verification to work, in minutes.",
    steps: [
      { t: "Verify identity", d: "A one-time human verification, signed with your passkey." },
      { t: "Open account", d: "An agent-native account opens once, after verification." },
      { t: "Get cards & number", d: "Disposable or standing cards, plus a phone number on the Passport." },
      { t: "Top up", d: "Fund one balance in USD or stablecoins." },
      { t: "Agent works", d: "It pays, calls and texts — within limits you set." },
      { t: "Freeze or revoke", d: "Cut authority anytime. Every step stays in the audit trail." },
    ],
  },
  passport: {
    title: "What's in the Passport",
    cards: [
      {
        t: "Identity",
        d: "Verify once. Progressive disclosure — authorized, representing you, or only the attributes needed.",
      },
      {
        t: "Agent-native account",
        d: "USD account and stablecoin balance on neobank rails — reusable across agents.",
      },
      {
        t: "Cards",
        d: "Disposable cards per purchase (passkey-minted) or a standing card. Optional Vault for your own cards.",
      },
      {
        t: "Phone number",
        d: "A dedicated number for calls and SMS, metered from the same balance.",
      },
      {
        t: "Unified balance",
        d: "One ledger for account, cards, phone, and future gated features.",
      },
      {
        t: "Controls",
        d: "Limits, approvals, freeze, revoke — every authorization recorded.",
      },
    ],
  },
  scenarios: {
    title: "One sentence in. Real work out.",
    items: [
      {
        t: "The one-sentence business trip",
        d: "“Book me two nights in Austin under $400.” The agent pays with a one-time card capped at $400, then calls the hotel. The card voids itself afterwards.",
        scope: "card · phone · $400 limit",
      },
      {
        t: "Agent hires agent",
        d: "Your research agent pays a specialist translation agent from its own balance — within the limit you set, both sides on the ledger.",
        scope: "pay · scoped grant",
      },
      {
        t: "Minimal disclosure",
        d: "A site asks if the buyer is an adult. The Passport answers yes — without name, birthday, or address.",
        scope: "attribute proof only",
      },
    ],
  },
  developers: {
    title: "One plugin. Your agent is ready.",
    sub: "Connect Passport to any agent. Verify once, then grant scoped authority — no secrets pasted into every runtime.",
    code: `# illustrative — API not final
$ npx agentpassport init
✔ Passport issued: ap_7f3k…

$ agentpassport grant --agent travel-ops
✔ Scope: identity · pay · sms

$ agentpassport card create --limit 400 --single-use
✔ Disposable card ready (passkey)

$ agentpassport ledger
  -$386.20  card   Hotel booking
  -$0.42    call   Front desk (3m)`,
  },
  faq: [
    {
      q: "Is this for getting around bot detection?",
      a: "No. Agent Passport is the opposite: a way for agents to show who they act for and what they're allowed to do, so sites can say yes with confidence.",
    },
    {
      q: "Does my agent ever see my card number?",
      a: "Disposable cards are minted per task under passkey approval. Cards in your Vault are used as you authorize; agents should not handle raw card details.",
    },
    {
      q: "Are you a bank?",
      a: "No. We provide agent-native neobank rails — identity, account, cards, and phone under one revocable Passport. We don't claim to be a licensed bank.",
    },
    {
      q: "Who can use it?",
      a: "Developers building agents — with Claude Code, Codex, open-source frameworks, or their own stack.",
    },
    {
      q: "What happens when the balance runs out?",
      a: "The agent stops spending. Top up manually or set auto-refill with a cap.",
    },
    {
      q: "Is it available now?",
      a: "We're onboarding early developers. Request access below.",
    },
  ],
  vision: {
    lead: "Every authorization leaves a record; the further agents go, the deeper the trust.",
    title: "Verify once. Carry authority everywhere your agents run.",
  },
  waitlist: {
    title: "Request early access",
    placeholder: "you@company.com",
    button: "Join waitlist",
    thanks: "Thanks — we'll be in touch.",
  },
  footer: "© 2026 Agent Passport.",
};
