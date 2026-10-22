import { content as c } from "./content";
import Waitlist from "./Waitlist";
const ids = ["how", "passport", "scenarios", "developers", "faq"];
const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{children}</h2>;
const Sec = ({ id, children }: { id?: string; children: React.ReactNode }) => <section id={id} className="mx-auto max-w-6xl px-6 py-20">{children}</section>;

function PassportCard() {
  return (
    <div className="guilloche relative w-full max-w-sm rotate-2 rounded-2xl border border-amber-300/30 bg-gradient-to-br from-[#122042] to-[#0a1124] p-6 shadow-2xl shadow-amber-500/10">
      <div className="flex items-center justify-between text-xs tracking-[.3em] text-amber-300/80"><span>AGENT PASSPORT</span><span>◎</span></div>
      <div className="mt-6 flex gap-4">
        <div className="grid h-20 w-16 place-items-center rounded-md border border-amber-300/30 bg-white/5 text-3xl">🤖</div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <dt className="text-white/40">Agent</dt><dd>travel-agent-01</dd>
          <dt className="text-white/40">Acting for</dt><dd>Verified human ✓</dd>
          <dt className="text-white/40">Balance</dt><dd>$1,240.00</dd>
          <dt className="text-white/40">Limit</dt><dd>$400 / task</dd>
        </dl>
      </div>
      <p className="mt-6 font-mono text-[10px] leading-4 text-white/40">P&lt;AGT&lt;&lt;TRAVEL&lt;AGENT&lt;01&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />AP7F3K&lt;&lt;USD&lt;USDC&lt;CARD&lt;TEL&lt;&lt;&lt;&lt;&lt;</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <header className="sticky top-0 z-10 border-b border-white/5 bg-[#07090f]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-semibold"><span className="text-amber-300">◎</span> {c.brand}</span>
          <nav className="hidden gap-6 text-sm text-white/60 md:flex">{c.nav.map((n, i) => <a key={n} href={`#${ids[i]}`} className="hover:text-white">{n}</a>)}</nav>
          <a href="#waitlist" className="rounded-full border border-amber-300/50 px-4 py-1.5 text-sm text-amber-300">{c.hero.primary}</a>
        </div>
      </header>

      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(252,211,77,.12),transparent_60%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">{c.hero.eyebrow}</span>
            <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">{c.hero.title}</h1>
            <p className="mt-6 text-lg text-white/65">{c.hero.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#waitlist" className="rounded-full bg-amber-300 px-6 py-3 font-semibold text-black hover:bg-amber-200">{c.hero.primary}</a>
              {/* TODO: demo booking link — contact intentionally left empty */}
              <a href="#waitlist" className="rounded-full border border-white/15 px-6 py-3 hover:bg-white/5">{c.hero.secondary}</a>
            </div>
          </div>
          <div className="flex justify-center"><PassportCard /></div>
        </div>
      </section>

      <Sec><H2>{c.problem.title}</H2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">{c.problem.items.map((p) => (
          <div key={p.q} className="rounded-2xl border border-white/10 bg-white/[.03] p-6"><p className="text-xl font-medium text-amber-300">{p.q}</p><p className="mt-3 text-white/60">{p.a}</p></div>))}</div>
      </Sec>

      <Sec id="how"><H2>{c.flow.title}</H2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">{c.flow.steps.map((s, i) => (
          <li key={s.t} className="rounded-2xl border border-white/10 p-5"><span className="font-mono text-xs text-amber-300">0{i + 1}</span><p className="mt-2 font-medium">{s.t}</p><p className="mt-2 text-sm text-white/55">{s.d}</p></li>))}</ol>
      </Sec>

      <Sec id="passport"><H2>{c.passport.title}</H2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{c.passport.cards.map((f, i) => (
          <div key={f.t} className="guilloche rounded-2xl border border-white/10 bg-[#0d1426] p-6"><span className="font-mono text-xs text-white/30">PAGE {i + 1}</span><p className="mt-2 text-lg font-medium">{f.t}</p><p className="mt-2 text-white/60">{f.d}</p></div>))}</div>
      </Sec>

      <div className="border-y border-white/10 bg-amber-300/[.04]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">{c.advantages.map((a) => (
          <div key={a.t}><p className="font-semibold text-amber-300">{a.t}</p><p className="mt-1 text-white/60">{a.d}</p></div>))}</div>
      </div>

      <Sec id="scenarios"><H2>{c.scenarios.title}</H2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">{c.scenarios.items.map((s) => (
          <div key={s.t} className="rounded-2xl border border-white/10 p-6"><p className="text-lg font-medium">{s.t}</p><p className="mt-3 text-white/60">{s.d}</p></div>))}</div>
      </Sec>

      <Sec id="developers">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div><H2>{c.developers.title}</H2><p className="mt-4 text-white/60">{c.developers.sub}</p></div>
          <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/60 p-6 text-sm leading-6 text-emerald-200/90"><code>{c.developers.code}</code></pre>
        </div>
      </Sec>

      <Sec id="faq"><H2>FAQ</H2>
        <div className="mt-8 divide-y divide-white/10">{c.faq.map((f) => (
          <details key={f.q} className="py-5"><summary className="cursor-pointer font-medium">{f.q}</summary><p className="mt-3 text-white/60">{f.a}</p></details>))}</div>
      </Sec>

      <section id="waitlist" className="guilloche border-t border-white/10">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
          <p className="text-white/50">{c.vision.lead}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{c.vision.title}</h2>
          <p className="mt-10 mb-4 text-lg">{c.waitlist.title}</p>
          <Waitlist />
        </div>
      </section>
      <footer className="py-8 text-center text-sm text-white/35">{c.footer}</footer>
    </main>
  );
}
