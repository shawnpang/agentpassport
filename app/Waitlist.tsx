"use client";
import { useState } from "react";
import { content } from "./content";
export default function Waitlist() {
  const w = content.waitlist;
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return done ? <p className="text-amber-300">{w.thanks}</p> : (
    <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row" onSubmit={async (e) => {
      e.preventDefault();
      const r = await fetch("/api/waitlist", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) });
      if (r.ok) setDone(true);
    }}>
      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={w.placeholder}
        className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-white outline-none focus:border-amber-300" />
      <button className="rounded-full bg-amber-300 px-6 py-3 font-semibold text-black hover:bg-amber-200">{w.button}</button>
    </form>
  );
}
