"use client";

import { useState } from "react";
import { content } from "./content";

type Phase = "blank" | "issued" | "minting" | "minted" | "calling" | "connected" | "revoked";

type LogEntry = { t: string; msg: string };

function now() {
  const d = new Date();
  return d.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function LiveDemo() {
  const [phase, setPhase] = useState<Phase>("blank");
  const [log, setLog] = useState<LogEntry[]>([]);
  const [callSecs, setCallSecs] = useState(0);

  const push = (msg: string) => setLog((prev) => [{ t: now(), msg }, ...prev].slice(0, 8));

  const issue = () => {
    if (phase !== "blank" && phase !== "revoked") return;
    setPhase("issued");
    setCallSecs(0);
    push("authorized · holder verified · passport AP-2026-2938");
  };

  const mint = () => {
    if (phase !== "issued" && phase !== "connected") return;
    setPhase("minting");
    push("passkey.confirm · waiting");
    window.setTimeout(() => {
      setPhase("minted");
      push("card.mint · disposable ·•••• 4291 · $400 limit");
    }, 700);
  };

  const call = () => {
    if (phase !== "minted" && phase !== "issued" && phase !== "connected") return;
    setPhase("calling");
    setCallSecs(0);
    push("phone.dial · +1-512-555-0100");
    window.setTimeout(() => {
      setPhase("connected");
      push("phone.connected · hotel front desk");
      let n = 0;
      const id = window.setInterval(() => {
        n += 1;
        setCallSecs(n);
        if (n >= 12) window.clearInterval(id);
      }, 1000);
    }, 900);
  };

  const revoke = () => {
    if (phase === "blank") return;
    setPhase("revoked");
    push("revoke · all scopes · card void · line released");
  };

  const restore = () => {
    setPhase("blank");
    setLog([]);
    setCallSecs(0);
  };

  const issued = phase !== "blank";
  const revoked = phase === "revoked";
  const hasCard = phase === "minted" || phase === "calling" || phase === "connected" || (revoked && log.some((l) => l.msg.includes("card.mint")));
  const calling = phase === "calling";
  const connected = phase === "connected";

  return (
    <div className="overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[0_1px_0_rgba(26,25,21,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg tracking-tight">Issue & revoke</span>
          <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-[var(--accent)]">
            {content.demo.badge}
          </span>
        </div>
        <p className="text-sm text-[var(--text-muted)]">{content.demo.sub}</p>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        {/* Passport panel */}
        <div className="relative border-b border-[var(--border)] p-5 sm:p-8 lg:border-b-0 lg:border-r">
          <div
            className={`relative overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--bg)] transition-opacity duration-300 ${
              revoked ? "opacity-55" : ""
            }`}
          >
            {/* binding holes */}
            <div className="absolute bottom-4 left-0 top-4 w-4 binding-holes opacity-70" aria-hidden />

            <div className="pl-7 pr-5 py-5 sm:pl-9 sm:pr-7 sm:py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
                    Agent Passport
                  </p>
                  <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
                    No. {issued ? "AP-2026-····-2938" : "AP-————-————"}
                  </p>
                </div>
                {issued && !revoked && (
                  <span className="stamp stamp-enter px-2 py-1 text-[11px]">Issued</span>
                )}
                {revoked && (
                  <span className="stamp stamp-revoked stamp-enter px-2 py-1 text-[11px]">
                    Revoked
                  </span>
                )}
              </div>

              <div className="mt-5 border-t border-[var(--border)] pt-4">
                <dl className="grid grid-cols-[7.5rem_1fr] gap-x-3 gap-y-2.5 text-sm">
                  <dt className="text-[var(--text-muted)]">Holder</dt>
                  <dd className={issued ? "fade-up" : "text-[var(--text-muted)]"}>
                    {issued ? "Verified human" : "—"}
                  </dd>
                  <dt className="text-[var(--text-muted)]">Agent</dt>
                  <dd className={`font-mono text-[13px] ${issued ? "fade-up" : "text-[var(--text-muted)]"}`}>
                    {issued ? "travel-ops" : "—"}
                  </dd>
                  <dt className="text-[var(--text-muted)]">Status</dt>
                  <dd className={issued ? "fade-up" : "text-[var(--text-muted)]"}>
                    {revoked ? "REVOKED" : issued ? "ISSUED · live" : "—"}
                  </dd>
                  <dt className="text-[var(--text-muted)]">Scope</dt>
                  <dd className={issued ? "fade-up" : "text-[var(--text-muted)]"}>
                    {issued ? (
                      <span className="flex flex-wrap gap-1.5">
                        {["identity", "pay", "sms"].map((s) => (
                          <span
                            key={s}
                            className={`rounded-sm border px-1.5 py-0.5 font-mono text-[11px] ${
                              revoked
                                ? "border-[var(--border)] text-[var(--text-muted)] line-through"
                                : "border-[var(--border)] bg-[var(--bg-elevated)]"
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </span>
                    ) : (
                      "—"
                    )}
                  </dd>
                  <dt className="text-[var(--text-muted)]">Card</dt>
                  <dd
                    className={`font-mono text-[13px] ${
                      hasCard && !revoked ? "fade-up" : "text-[var(--text-muted)]"
                    } ${revoked && hasCard ? "line-through" : ""}`}
                  >
                    {phase === "minting"
                      ? "Confirming passkey…"
                      : hasCard
                        ? "•••• •••• •••• 4291"
                        : "—"}
                  </dd>
                  <dt className="text-[var(--text-muted)]">Phone</dt>
                  <dd
                    className={`font-mono text-[13px] ${
                      calling || connected ? "fade-up" : "text-[var(--text-muted)]"
                    } ${revoked ? "line-through" : ""}`}
                  >
                    {calling
                      ? "Ringing +1-512-555-0100…"
                      : connected
                        ? `Connected · ${callSecs}s`
                        : issued
                          ? "+1-512-555-0199"
                          : "—"}
                  </dd>
                </dl>
              </div>

              {/* Passkey mock strip */}
              {phase === "minting" && (
                <div className="fade-up mt-5 flex items-center gap-3 rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M12 3a5 5 0 00-3 9v2h6v-2a5 5 0 00-3-9z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path d="M9 14h6v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                  <div className="text-sm">
                    <p className="font-medium">Confirm with passkey</p>
                    <p className="text-[var(--text-muted)]">Mint disposable card · $400 limit</p>
                  </div>
                </div>
              )}

              {/* Call mock */}
              {(calling || connected) && !revoked && (
                <div className="fade-up mt-5 flex items-center justify-between gap-3 rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-full ${
                        connected ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "bg-[var(--border)] text-[var(--text-muted)]"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.57 3.6 1 1 0 01-.25 1L6.6 10.8z" />
                      </svg>
                    </span>
                    <div className="text-sm">
                      <p className="font-medium">{calling ? "Calling hotel…" : "On the line"}</p>
                      <p className="font-mono text-[12px] text-[var(--text-muted)]">
                        +1-512-555-0100{connected ? ` · 0:${String(callSecs).padStart(2, "0")}` : ""}
                      </p>
                    </div>
                  </div>
                  {connected && (
                    <span className="font-mono text-[11px] text-[var(--text-muted)]">ledger +$0.42</span>
                  )}
                </div>
              )}

              {revoked && (
                <div
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  aria-hidden
                >
                  <span className="stamp stamp-revoked stamp-enter px-4 py-2 text-2xl sm:text-3xl">Revoked</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls + audit */}
        <div className="flex flex-col gap-5 p-5 sm:p-6">
          <div className="grid grid-cols-2 gap-2">
            <DemoBtn
              label="1 · Issue"
              onClick={issue}
              disabled={phase !== "blank" && phase !== "revoked"}
              primary={phase === "blank"}
            />
            <DemoBtn
              label="2 · Mint disposable"
              onClick={mint}
              disabled={phase !== "issued" && phase !== "connected"}
              primary={phase === "issued"}
            />
            <DemoBtn
              label="3 · Simulate call"
              onClick={call}
              disabled={(phase !== "minted" && phase !== "issued") || calling}
              primary={phase === "minted"}
            />
            <DemoBtn
              label="4 · Revoke"
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

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Audit log
            </p>
            <ul className="mt-2 max-h-48 space-y-1.5 overflow-y-auto font-mono text-[12px] leading-relaxed text-[var(--text-muted)]">
              {log.length === 0 && <li className="text-[var(--border)]">waiting for issue…</li>}
              {log.map((e, i) => (
                <li key={`${e.t}-${i}`} className="fade-up flex gap-2">
                  <span className="shrink-0 text-[var(--border)]">{e.t}</span>
                  <span className="text-[var(--text)]">{e.msg}</span>
                </li>
              ))}
            </ul>
          </div>

          {(connected || (hasCard && !revoked)) && (
            <div className="rounded-sm border border-[var(--border)] bg-[var(--bg)] px-3 py-2 font-mono text-[11px] text-[var(--text-muted)]">
              <p className="uppercase tracking-[0.18em]">Ledger (sim)</p>
              {hasCard && <p className="mt-1 text-[var(--text)]">-$0.00 pending · card •••• 4291</p>}
              {connected && <p className="text-[var(--text)]">-$0.42 call · hotel front desk</p>}
            </div>
          )}
        </div>
      </div>
    </div>
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
