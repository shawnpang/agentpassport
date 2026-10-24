"use client";

import { useState } from "react";
import { content } from "./content";

export default function Waitlist() {
  const w = content.waitlist;
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState(false);

  if (done) {
    return <p className="font-medium text-[var(--accent-deep)]">{w.thanks}</p>;
  }

  return (
    <form
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={async (e) => {
        e.preventDefault();
        setErr(false);
        try {
          const r = await fetch("/api/waitlist", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email }),
          });
          if (r.ok) setDone(true);
          else setErr(true);
        } catch {
          setErr(true);
        }
      }}
    >
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={w.placeholder}
        className="flex-1 rounded-sm border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
      />
      <button
        type="submit"
        className="rounded-sm bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-ink)] transition hover:brightness-105"
      >
        {w.button}
      </button>
      {err && (
        <p className="w-full text-left text-sm text-[var(--stamp)] sm:col-span-2">
          Something went wrong — try again.
        </p>
      )}
    </form>
  );
}
