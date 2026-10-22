// All site copy lives here. Copy is a DRAFT — the team is still iterating.
export const content = {
  brand: "Agent Passport",
  nav: ["How it works", "Passport", "Scenarios", "Developers", "FAQ"],
  hero: {
    eyebrow: "Draft preview",
    title: "Every agent deserves a passport.",
    sub: "Verify once and your agent gets an identity, a global account, cards and a phone number. Every charge comes from one balance, within limits you set.",
    primary: "Request early access",
    secondary: "Book a demo",
  },
  problem: {
    title: "Every door on the internet asks three questions.",
    items: [
      { q: "Who are you?", a: "Agents show up anonymous. Sites can't tell a trusted assistant from a script." },
      { q: "Who are you acting for?", a: "There's no portable way to prove a real human authorized this agent, for this task." },
      { q: "Who pays?", a: "Handing an agent your raw card number is a bad idea. Most agents simply stop at checkout." },
    ],
  },
  flow: {
    title: "From verification to work, in minutes.",
    steps: [
      { t: "Verify identity", d: "A one-time human verification, signed with your passkey." },
      { t: "Open account", d: "Your agent's account is opened once, at signup." },
      { t: "Get cards & number", d: "Disposable cards and a phone number, issued to the passport." },
      { t: "Top up", d: "Fund one balance in USD or stablecoins." },
      { t: "Agent works", d: "It pays, calls and texts — within your limits." },
      { t: "Refill when used", d: "Top up again or set auto-refill. Nothing runs past what you allow." },
    ],
  },
  passport: {
    title: "What's in the passport",
    cards: [
      { t: "Identity", d: "Verify once, disclose only what's needed — e.g. prove adult or human-authorized only." },
      { t: "Global account", d: "USD account plus multi-chain stablecoin balance — usable by developers outside the US too." },
      { t: "Cards", d: "Disposable cards generated per task and limit, void after use; a Vault to store your own cards for your agent to use as you authorize." },
      { t: "Phone number", d: "A real number for calls and SMS, so your agent can confirm a booking or reach a human." },
      { t: "One balance", d: "Top-ups, card spend, calls and SMS in one ledger." },
      { t: "Controls", d: "Limits, approvals, freeze, revoke — every step recorded." },
    ],
  },
  advantages: [
    { t: "Live today", d: "Accounts and cards that work now — not a protocol waiting for adoption." },
    { t: "Global, with stablecoins", d: "Built for developers wherever they are, not just one country." },
    { t: "Every authorization recorded", d: "Trust compounds with use." },
  ],
  scenarios: {
    title: "One sentence in. Real work out.",
    items: [
      { t: "The one-sentence business trip", d: "\u201cBook me two nights in Austin under $400.\u201d The agent pays with a one-time card capped at $400, then calls the hotel to confirm late check-in. The card voids itself afterwards." },
      { t: "Agent hires agent", d: "Your research agent pays a specialist translation agent from its own balance — within the limit you set, with both sides recorded in the ledger." },
      { t: "Minimal disclosure", d: "A site asks if the buyer is an adult. The passport answers yes — without revealing name, birthday or address." },
    ],
  },
  developers: {
    title: "One plugin. Your agent is ready.",
    sub: "Add the MCP server or CLI and your agent has a balance, a card and a phone number in minutes.",
    code: `# illustrative — API not final
$ npx agentpassport init
✔ Passport issued: ap_7f3k…

$ agentpassport card create --limit 400 --single-use
✔ Card ready (void after first charge)

$ agentpassport call +1-512-555-0100 \\
    --task "Confirm late check-in for reservation #A1B2"

$ agentpassport ledger
  -$386.20  card   Hotel booking
  -$0.42    call   Hotel front desk (3m)`,
  },
  faq: [
    { q: "Is this for getting around bot detection?", a: "No. Agent Passport is the opposite: a way for agents to show who they act for and what they're allowed to do, so sites can say yes with confidence." },
    { q: "Does my agent ever see my card number?", a: "Disposable cards are generated per task. Cards in your Vault are used as you authorize; our goal is that agents don't handle raw card details." },
    { q: "Who can use it?", a: "Developers building agents — with Claude Code, Codex, open-source frameworks or their own stack — including developers outside the US." },
    { q: "What happens when the balance runs out?", a: "The agent stops spending. Top up manually or set auto-refill with a cap." },
    { q: "Is it available now?", a: "We're onboarding early developers. Request access below." },
  ],
  vision: {
    lead: "Every authorization leaves a record; the further agents go, the deeper the trust.",
    title: "Humans spent centuries building passports and banks. For the agent era, we issue that layer.",
  },
  waitlist: { title: "Request early access", placeholder: "you@company.com", button: "Join waitlist", thanks: "Thanks — we'll be in touch." },
  footer: "© 2026 Agent Passport. Draft preview.",
};
