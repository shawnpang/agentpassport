"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { content } from "./content";

type Phase =
  | "blank"
  | "issued"
  | "minting"
  | "minted"
  | "calling"
  | "connected"
  | "revoked";

type LogEntry = { t: string; msg: string };
type LedgerRow = {
  id: string;
  ico: string;
  title: string;
  sub: string;
  amt: string;
  kind: "neg" | "pos" | "zero" | "freeze";
};
type VaultCard = {
  last4: string;
  type: "Disposable" | "Standing";
  limit: string;
  status: string;
  live: boolean;
  burned?: boolean;
};

const PASSPORT_ID = "APT-7F2C-91E0";
const AGENT = "travel-ops";
const CARD_LAST4 = "4291";
const CARD_LIMIT = "$400.00";
const HOTEL_NUM = "+1 (512) 555-0100";
const AGENT_LINE = "+1 (415) 555-0142";
const STANDING_LAST4 = "4410";

const DISCLOSURE = [
  {
    lvl: "L1",
    name: "Authorized by human",
    desc: "Operator presence attested",
    chip: "Shared",
    shared: true,
  },
  {
    lvl: "L2",
    name: "Acts on your behalf",
    desc: "Agency + mandate",
    chip: "Shared",
    shared: true,
  },
  {
    lvl: "L3",
    name: "Adult · jurisdiction",
    desc: "Age + region selective",
    chip: "On request",
    shared: false,
  },
  {
    lvl: "L4",
    name: "Full KYC dossier",
    desc: "Never default · vaulted",
    chip: "Hidden",
    shared: false,
  },
] as const;

function now() {
  const d = new Date();
  return d.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatCall(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function LiveDemo() {
  const [phase, setPhase] = useState<Phase>("blank");
  const [log, setLog] = useState<LogEntry[]>([]);
  const [ledger, setLedger] = useState<LedgerRow[]>([]);
  const [vault, setVault] = useState<VaultCard[]>([]);
  const [callSecs, setCallSecs] = useState(0);
  const [hadCard, setHadCard] = useState(false);
  const timers = useRef<number[]>([]);
  const settledCall = useRef(false);

  const clearTimers = () => {
    timers.current.forEach((id) => {
      window.clearTimeout(id);
      window.clearInterval(id);
    });
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const pushLog = (msg: string) =>
    setLog((prev) => [{ t: now(), msg }, ...prev].slice(0, 10));

  const pushLedger = (row: Omit<LedgerRow, "id">) =>
    setLedger((prev) => [{ ...row, id: `${Date.now()}-${prev.length}` }, ...prev]);

  const issue = () => {
    if (phase !== "blank" && phase !== "revoked") return;
    clearTimers();
    settledCall.current = false;
    setPhase("issued");
    setCallSecs(0);
    setHadCard(false);
    setLedger([]);
    setVault([
      {
        last4: STANDING_LAST4,
        type: "Standing",
        limit: "$2,000 / day",
        status: "Idle",
        live: false,
      },
    ]);
    pushLog(`trust.verify · ${PASSPORT_ID} · human attested · travel-ops`);
    pushLedger({
      ico: "P",
      title: "Trust verified",
      sub: `${PASSPORT_ID} · human→agent L1–L2 · Austin hotel mandate`,
      amt: "$0.00",
      kind: "zero",
    });
  };

  const mint = () => {
    if (phase !== "issued") return;
    clearTimers();
    setPhase("minting");
    pushLog("trust.site · hotel recognizes mandate · waiting passkey");
    const t = window.setTimeout(() => {
      setPhase("minted");
      setHadCard(true);
      setVault((prev) => [
        {
          last4: CARD_LAST4,
          type: "Disposable",
          limit: CARD_LIMIT,
          status: "Live · 15m",
          live: true,
        },
        ...prev.filter((c) => c.type === "Standing"),
      ]);
      pushLog(`trust.accepted · hotel site · spend/OTP proofs secondary · ${CARD_LIMIT}`);
      pushLedger({
        ico: "C",
        title: "Hotel recognized mandate",
        sub: `Austin hotel · mandate accepted · proofs attached`,
        amt: "$0.00",
        kind: "zero",
      });
    }, 750);
    timers.current.push(t);
  };

  const call = () => {
    if (phase !== "minted") return;
    clearTimers();
    settledCall.current = false;
    setPhase("calling");
    setCallSecs(0);
    pushLog(`act.call · hotel front desk trusts agent · ${HOTEL_NUM}`);
    const t1 = window.setTimeout(() => {
      setPhase("connected");
      pushLog("phone.connected · hotel front desk");
      let n = 0;
      const tick = window.setInterval(() => {
        n += 1;
        setCallSecs(n);
        if (n >= 12 && !settledCall.current) {
          settledCall.current = true;
          window.clearInterval(tick);
          pushLedger({
            ico: "☎",
            title: "Trusted call · hotel front desk",
            sub: `${HOTEL_NUM} · ${formatCall(n)}`,
            amt: "−$0.42",
            kind: "neg",
          });
          pushLog("phone.settled · −$0.42 · ledger");
        }
      }, 1000);
      timers.current.push(tick);
    }, 900);
    timers.current.push(t1);
  };

  const revoke = () => {
    if (phase === "blank" || phase === "revoked") return;
    clearTimers();
    setPhase("revoked");
    setVault((prev) =>
      prev.map((c) => ({
        ...c,
        live: false,
        burned: c.type === "Disposable" ? true : c.burned,
        status: c.type === "Disposable" ? "Burned" : "Frozen",
      })),
    );
    pushLog("trust.revoke · all scopes · proofs void · line released");
    pushLedger({
      ico: "×",
      title: "TRUST_REVOKED",
      sub: "Spend proofs burned · number suspended · L1–L2 invalid",
      amt: "$0.00",
      kind: "freeze",
    });
  };

  const restore = () => {
    clearTimers();
    settledCall.current = false;
    setPhase("blank");
    setLog([]);
    setLedger([]);
    setVault([]);
    setCallSecs(0);
    setHadCard(false);
  };

  const issued = phase !== "blank";
  const revoked = phase === "revoked";
  const calling = phase === "calling";
  const connected = phase === "connected";

  let main: ReactNode = null;
  if (phase === "blank") main = <EmptySurface onIssue={issue} />;
  else if (phase === "issued") main = <IssueSurface revoked={false} />;
  else if (phase === "minting") main = <MintingSurface />;
  else if (phase === "minted") main = <MintSurface revoked={false} />;
  else if (calling || connected)
    main = <CallSurface calling={calling} connected={connected} callSecs={callSecs} />;
  else if (revoked) main = <RevokeSurface hadCard={hadCard} />;

  return (
    <div className="overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[0_1px_0_rgba(26,25,21,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg tracking-tight">Travel · trusted to act</span>
          <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-[var(--accent)]">
            {content.demo.badge}
          </span>
        </div>
        <p className="text-sm text-[var(--text-muted)]">{content.demo.sub}</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-[var(--border)] bg-[var(--bg-wash)] px-5 py-3 sm:px-6">
        {(
          [
            { n: "01", t: "Verify", on: phase === "blank" || phase === "issued" },
            { n: "02", t: "Trusted", on: phase === "minting" || phase === "minted" },
            { n: "03", t: "Act", on: calling || connected },
            { n: "04", t: "Revoke", on: revoked },
          ] as const
        ).map((s) => (
          <div
            key={s.n}
            className={`min-w-[5.5rem] flex-1 rounded-sm border px-3 py-2 ${
              s.on
                ? "border-[var(--accent)]/50 bg-[var(--bg-elevated)]"
                : "border-[var(--border)] bg-[var(--bg-elevated)]/60"
            }`}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {s.n}
            </p>
            <p
              className={`text-[13px] font-medium ${
                s.on ? "text-[var(--accent-deep)]" : "text-[var(--text)]"
              }`}
            >
              {s.t}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative border-b border-[var(--border)] p-5 sm:p-6 lg:border-b-0 lg:border-r">
          {main}
        </div>

        <div className="flex flex-col gap-5 p-5 sm:p-6">
          <div className="grid grid-cols-2 gap-2">
            <DemoBtn
              label="1 · Verify trust"
              onClick={issue}
              disabled={phase !== "blank" && phase !== "revoked"}
              primary={phase === "blank"}
            />
            <DemoBtn
              label="2 · Site trusts mandate"
              onClick={mint}
              disabled={phase !== "issued"}
              primary={phase === "issued"}
            />
            <DemoBtn
              label="3 · Call hotel"
              onClick={call}
              disabled={phase !== "minted" || calling}
              primary={phase === "minted"}
            />
            <DemoBtn
              label="4 · Revoke trust"
              onClick={revoke}
              disabled={phase === "blank" || revoked}
              danger
            />
          </div>

          {revoked && (
            <button
              type="button"
              onClick={restore}
              className="text-left text-sm text-[var(--accent)] underline-offset-2 hover:underline"
            >
              Reset playground
            </button>
          )}

          <VaultPanel vault={vault} issued={issued} revoked={revoked} />
          <LedgerPanel rows={ledger} />
          <AuditPanel log={log} />
        </div>
      </div>
    </div>
  );
}

function EmptySurface({ onIssue }: { onIssue: () => void }) {
  return (
    <div className="fade-up flex min-h-[320px] flex-col items-center justify-center rounded-sm border border-dashed border-[var(--border)] bg-[var(--bg-wash)] px-6 py-12 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        No passport yet
      </p>
      <h3 className="font-display mt-2 text-xl tracking-tight">Verify who trusts this agent</h3>
      <p className="mt-2 max-w-sm text-sm text-[var(--text-muted)]">
        One human check for a Travel mandate — sites and counterparties can trust travel-ops, and
        you can take it back.
      </p>
      <button
        type="button"
        onClick={onIssue}
        className="mt-5 inline-flex items-center gap-2 rounded-sm bg-[var(--text)] px-4 py-2.5 text-sm font-medium text-white hover:brightness-110"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
        Start verification
      </button>
    </div>
  );
}

function IssueSurface({ revoked }: { revoked: boolean }) {
  return (
    <div className={`fade-up space-y-4 ${revoked ? "opacity-60" : ""}`}>
      <div className="demo-passport relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] text-[var(--text-muted)]">{PASSPORT_ID}</p>
            <h3 className="font-display mt-1 text-xl tracking-tight">Trusted Travel mandate</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Human verified · sites can trust this agent · reusable across agents
            </p>
          </div>
          {revoked ? (
            <span className="stamp stamp-revoked stamp-enter px-2 py-1 text-[11px]">Revoked</span>
          ) : (
            <span className="stamp stamp-enter px-2 py-1 text-[11px]">Issued</span>
          )}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
          <Attr label="Holder" value="Verified human · US" />
          <Attr
            label="Status"
            value={revoked ? <Chip danger>Revoked</Chip> : <Chip live>Active</Chip>}
          />
          <Attr label="Agent" value={<span className="font-mono text-[13px]">{AGENT}</span>} />
          <Attr label="Mandate" value="Austin hotel · $400 · phone" />
        </div>
      </div>

      <div className="rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <p className="text-sm font-medium">Progressive disclosure</p>
          <p className="text-xs text-[var(--text-muted)]">Prove only what&apos;s needed</p>
        </div>
        <div className="demo-disclosure">
          {DISCLOSURE.map((d) => (
            <div key={d.lvl} className="demo-disclosure-layer">
              <span className="font-mono text-[11px] font-semibold text-[var(--accent-deep)]">
                {d.lvl}
              </span>
              <div className="min-w-0">
                <p
                  className={`text-sm font-medium ${
                    revoked && d.shared ? "text-[var(--text-muted)] line-through" : ""
                  }`}
                >
                  {d.name}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{d.desc}</p>
              </div>
              {revoked && d.shared ? (
                <Chip danger>Invalid</Chip>
              ) : d.shared ? (
                <Chip live>{d.chip}</Chip>
              ) : (
                <Chip>{d.chip}</Chip>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MintingSurface() {
  return (
    <div className="fade-up space-y-4">
      <div className="demo-plastic demo-plastic-ghost" aria-label="Card minting">
        <div className="flex items-center justify-between">
          <span className="demo-chip-icon opacity-40" />
          <span className="text-[11px] uppercase tracking-[0.12em]">Confirming…</span>
        </div>
        <p className="font-mono text-lg tracking-[0.12em]">···· ···· ···· ····</p>
        <div className="flex justify-between text-[10px] uppercase tracking-[0.06em] opacity-70">
          <span>
            Holder
            <strong className="mt-0.5 block text-[12px] font-semibold normal-case tracking-normal">
              —
            </strong>
          </span>
          <span>
            Limit
            <strong className="mt-0.5 block text-[12px] font-semibold normal-case tracking-normal">
              —
            </strong>
          </span>
        </div>
      </div>
      <div className="demo-passkey">
        <span className="demo-passkey-icon" aria-hidden>
          ⌀
        </span>
        <div>
          <p className="text-sm font-medium">Confirm: hotel may trust this agent</p>
          <p className="text-xs text-[var(--text-muted)]">
            Passkey · Travel mandate · Austin · {CARD_LIMIT}
          </p>
        </div>
      </div>
    </div>
  );
}

function MintSurface({ revoked }: { revoked: boolean }) {
  return (
    <div className={`fade-up space-y-4 ${revoked ? "opacity-70" : ""}`}>
      <div className="rounded-sm border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-4 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-deep)]">
          Site ↔ agent
        </p>
        <h3 className="font-display mt-1 text-xl tracking-tight">
          {revoked ? "Hotel no longer trusts this mandate" : "Hotel recognized this mandate"}
        </h3>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          {revoked
            ? "Authorization withdrawn — checkout and front desk will refuse the agent."
            : "The booking site accepts travel-ops as acting for a verified human on this Austin stay."}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip live={false}>{revoked ? "Mandate invalid" : "Mandate accepted"}</Chip>
          <Chip>Agent: {AGENT}</Chip>
          <Chip>Ceiling {CARD_LIMIT}</Chip>
        </div>
      </div>

      <div className="rounded-sm border border-[var(--border)] bg-[var(--bg-wash)] px-4 py-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
          Spend proof · secondary
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <p className="text-xs text-[var(--text-muted)]">
            Spend{" "}
            <span className={`font-mono text-[var(--text)] ${revoked ? "line-through" : ""}`}>
              ···· {CARD_LAST4}
            </span>{" "}
            · {CARD_LIMIT} · 15m
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            OTP / front desk line{" "}
            <span className={`font-mono text-[var(--text)] ${revoked ? "line-through" : ""}`}>
              {AGENT_LINE}
            </span>
          </p>
        </div>
        <p className="mt-2 text-[11px] text-[var(--text-muted)]">
          {revoked
            ? "Card + line burned with the mandate — zero residual auth."
            : "Card and number exist only as proof the agent is allowed to pay and call."}
        </p>
      </div>
    </div>
  );
}

function CallSurface({
  calling,
  connected,
  callSecs,
}: {
  calling: boolean;
  connected: boolean;
  callSecs: number;
}) {
  return (
    <div className="fade-up space-y-4">
      <div className="rounded-sm border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-4 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-deep)]">
          Act · site trusts agent
        </p>
        <h3 className="font-display mt-1 text-xl tracking-tight sm:text-2xl">
          Hotel recognizes travel-ops — Austin mandate
        </h3>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Booking site and front desk treat the agent as authorized. Calling and OTP are just how
          that trust gets used — not the story.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip live>Mandate live</Chip>
          <Chip>Agent: {AGENT}</Chip>
          <Chip>Austin · {CARD_LIMIT}</Chip>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Using trust · call
            </p>
            <Chip live={connected}>{calling ? "Dialing" : connected ? "Live" : "Idle"}</Chip>
          </div>
          <p className="font-mono mt-2 text-lg tracking-wide">{HOTEL_NUM}</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Front desk · from {AGENT_LINE}
            {connected ? (
              <>
                {" "}
                · <span className="font-mono">{formatCall(callSecs)}</span>
              </>
            ) : calling ? (
              " · ringing…"
            ) : null}
          </p>
          {connected && callSecs >= 12 && (
            <p className="mt-2 text-xs text-[var(--text-muted)]">Ledger −$0.42 posted</p>
          )}
        </div>

        <div className="rounded-sm border border-[var(--border)] bg-[var(--bg-wash)] px-4 py-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Using trust · OTP · secondary
          </p>
          <p className="mt-2 text-xs text-[var(--text-muted)]">SMS stub · redacted</p>
          <p className="font-mono mt-2 text-base tracking-[0.18em] text-[var(--text-muted)]">
            8 4 2 · · ·
          </p>
        </div>
      </div>
    </div>
  );
}

function RevokeSurface({ hadCard }: { hadCard: boolean }) {
  return (
    <div className="fade-up space-y-4">
      <div className="flex items-start gap-3 rounded-sm border border-[var(--danger)]/30 bg-[#fff5f5] px-4 py-3 text-sm">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--danger)] text-[11px] font-bold text-white">
          ×
        </span>
        <p>
          <strong>Trust revoked — authority wiped.</strong> Site no longer recognizes this agent.
          Pay / phone / identity shares are dead. Human balance preserved.
        </p>
      </div>

      <div className="demo-passport relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] text-[var(--text-muted)]">{PASSPORT_ID}</p>
            <h3 className="font-display mt-1 text-xl tracking-tight">Trusted Travel mandate</h3>
          </div>
          <span className="stamp stamp-revoked stamp-enter px-2 py-1 text-[11px]">Revoked</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Attr label="Revoked at" value="Just now · Simulated" />
          <Attr label="Actor" value="Human operator" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <span className="stamp stamp-revoked stamp-enter px-4 py-2 text-2xl sm:text-3xl">
            Revoked
          </span>
        </div>
      </div>

      <div className="rounded-sm border border-[var(--danger)]/25 bg-[#fff5f5] p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-sm font-medium">Authority map · wiped</p>
          <Chip danger>0 scopes live</Chip>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            "site trust",
            "identity L1–L2",
            "pay",
            "sms / OTP",
            "card",
            "phone",
            "hotel mandate",
          ].map((s) => (
            <span
              key={s}
              className="rounded-sm border border-[var(--danger)]/30 bg-white px-1.5 py-0.5 font-mono text-[11px] text-[var(--danger)] line-through"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--text-muted)]">
          Every grant that let the agent act is invalid. Re-verify required to trust again.
        </p>
      </div>

      {hadCard && (
        <div className="demo-plastic demo-plastic-void relative">
          <div className="flex items-center justify-between">
            <span className="demo-chip-icon opacity-50" />
            <span className="text-[10px] uppercase tracking-[0.12em] opacity-60">Spend proof · burned</span>
          </div>
          <p className="font-mono text-[17px] tracking-[0.12em] line-through opacity-50">
            4242&nbsp;····&nbsp;····&nbsp;{CARD_LAST4}
          </p>
          <div className="text-[10px] uppercase tracking-[0.06em] text-white/50">
            Limit
            <strong className="mt-0.5 block text-[12px] font-semibold normal-case tracking-normal text-white/70 line-through">
              {CARD_LIMIT}
            </strong>
          </div>
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <span className="stamp stamp-revoked stamp-enter px-3 py-1.5 text-lg">Void</span>
          </div>
        </div>
      )}

      <div className="rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)]">
        <div className="border-b border-[var(--border)] px-4 py-3">
          <p className="text-sm font-medium">Progressive disclosure</p>
        </div>
        <div className="demo-disclosure">
          {DISCLOSURE.map((d) => (
            <div key={d.lvl} className="demo-disclosure-layer">
              <span className="font-mono text-[11px] font-semibold text-[var(--accent-deep)]">
                {d.lvl}
              </span>
              <div className="min-w-0">
                <p
                  className={`text-sm font-medium ${
                    d.shared ? "text-[var(--text-muted)] line-through" : ""
                  }`}
                >
                  {d.name}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{d.desc}</p>
              </div>
              {d.shared ? <Chip danger>Invalid</Chip> : <Chip>{d.chip}</Chip>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VaultPanel({
  vault,
  issued,
  revoked,
}: {
  vault: VaultCard[];
  issued: boolean;
  revoked: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
          Vault
        </p>
        <span className="text-[11px] text-[var(--text-muted)]">
          {revoked
            ? "Emptied / frozen"
            : vault.length
              ? `${vault.length} in vault`
              : issued
                ? "Standing only"
                : "—"}
        </span>
      </div>
      <div className="mt-2 overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--bg)]">
        {vault.length === 0 ? (
          <p className="px-3 py-4 text-center text-xs text-[var(--text-muted)]">
            Vault empty · spend proofs land after trust
          </p>
        ) : (
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-[var(--border)] text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)]">
                <th className="px-3 py-2 font-medium">Card</th>
                <th className="px-2 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {vault.map((c) => (
                <tr
                  key={`${c.type}-${c.last4}`}
                  className="border-b border-[var(--border)] last:border-0"
                >
                  <td className="font-mono px-3 py-2.5">···· {c.last4}</td>
                  <td className="px-2 py-2.5 text-[var(--text-muted)]">{c.type}</td>
                  <td className="px-3 py-2.5">
                    {c.burned || (revoked && c.type === "Disposable") ? (
                      <Chip danger>Burned</Chip>
                    ) : revoked ? (
                      <Chip danger>Frozen</Chip>
                    ) : c.live ? (
                      <Chip live>{c.status}</Chip>
                    ) : (
                      <Chip>{c.status}</Chip>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function LedgerPanel({ rows }: { rows: LedgerRow[] }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        Ledger
      </p>
      <ul className="mt-2 max-h-44 space-y-0 overflow-y-auto rounded-sm border border-[var(--border)] bg-[var(--bg)]">
        {rows.length === 0 && (
          <li className="px-3 py-4 text-center text-xs text-[var(--text-muted)]">
            No movements yet
          </li>
        )}
        {rows.map((r) => (
          <li
            key={r.id}
            className="fade-up grid grid-cols-[2rem_1fr_auto] items-center gap-2 border-b border-[var(--border)] px-3 py-2.5 last:border-0"
          >
            <span
              className={`grid h-7 w-7 place-items-center rounded-sm border border-[var(--border)] text-[11px] font-semibold ${
                r.kind === "freeze"
                  ? "bg-[#fffaeb] text-[#b54708]"
                  : r.kind === "neg"
                    ? "bg-[var(--bg-wash)] text-[var(--text)]"
                    : "bg-[var(--accent-soft)] text-[var(--accent-deep)]"
              }`}
            >
              {r.ico}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium">{r.title}</p>
              <p className="truncate text-[11px] text-[var(--text-muted)]">{r.sub}</p>
            </div>
            <span
              className={`font-mono text-[12px] ${
                r.kind === "pos"
                  ? "text-[var(--accent-deep)]"
                  : r.kind === "neg"
                    ? "text-[var(--text)]"
                    : "text-[var(--text-muted)]"
              }`}
            >
              {r.amt}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AuditPanel({ log }: { log: LogEntry[] }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        Audit log
      </p>
      <ul className="mt-2 max-h-36 space-y-1.5 overflow-y-auto font-mono text-[12px] leading-relaxed text-[var(--text-muted)]">
        {log.length === 0 && <li className="text-[var(--border)]">waiting for issue…</li>}
        {log.map((e, i) => (
          <li key={`${e.t}-${i}`} className="fade-up flex gap-2">
            <span className="shrink-0 text-[var(--border)]">{e.t}</span>
            <span className="text-[var(--text)]">{e.msg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Attr({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
        {label}
      </p>
      <div className="mt-0.5 text-sm font-medium">{value}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-[var(--text-muted)]">{label}</label>
      <div className="mt-1 flex h-9 items-center rounded-sm border border-[var(--border)] bg-[var(--bg-wash)] px-2.5 text-[13px]">
        {value}
      </div>
    </div>
  );
}

function Chip({
  children,
  live,
  danger,
}: {
  children: ReactNode;
  live?: boolean;
  danger?: boolean;
}) {
  const cls = danger
    ? "border-[#f1c8c8] bg-[#fff5f5] text-[var(--danger)]"
    : live
      ? "border-[var(--accent)]/30 bg-[var(--accent-soft)] text-[var(--accent-deep)]"
      : "border-[var(--border)] bg-[var(--bg-wash)] text-[var(--text-muted)]";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${cls}`}
    >
      {children}
    </span>
  );
}

function DemoBtn({
  label,
  onClick,
  disabled,
  primary,
  danger,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
  danger?: boolean;
}) {
  const base =
    "rounded-sm px-3 py-2.5 text-left text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-35";
  const style = danger
    ? "border border-[var(--danger)]/40 text-[var(--danger)] hover:bg-[var(--accent-soft)]"
    : primary
      ? "bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-105"
      : "border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)] hover:bg-[var(--accent-soft)]";
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`${base} ${style}`}>
      {label}
    </button>
  );
}
