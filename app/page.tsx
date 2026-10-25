import { content as c } from "./content";
import Waitlist from "./Waitlist";
import LiveDemo from "./LiveDemo";

const navIds = ["demo", "how", "passport", "scenarios", "developers", "faq"];

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.35rem)] font-medium leading-tight tracking-tight text-[var(--text)]">
      {children}
    </h2>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--text-muted)]">
      {children}
    </p>
  );
}

function Sec({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-6 py-20 sm:py-24 ${className}`}>
      {children}
    </section>
  );
}

function PassportPanel() {
  return (
    <div className="relative w-full max-w-md overflow-hidden as-card ">
      <div className="absolute bottom-5 left-0 top-5 w-3.5 binding-holes opacity-80" aria-hidden />
      <div className="border-b border-[var(--border)] bg-[var(--bg)]/60 px-6 py-3 pl-9">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
            Agent Passport
          </span>
          <span className="stamp px-1.5 py-0.5 text-[9px]">Issued</span>
        </div>
      </div>
      <div className="px-6 py-5 pl-9">
        <p className="font-mono text-xs text-[var(--text-muted)]">No. AP-2026-····-2938</p>
        <dl className="mt-4 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-2 text-sm">
          <dt className="text-[var(--text-muted)]">Holder</dt>
          <dd>Verified human</dd>
          <dt className="text-[var(--text-muted)]">Status</dt>
          <dd>ISSUED · live</dd>
          <dt className="text-[var(--text-muted)]">Scope</dt>
          <dd className="font-mono text-[12px]">identity · pay · sms</dd>
          <dt className="text-[var(--text-muted)]">Balance</dt>
          <dd className="font-mono text-[13px]">$1,240.00</dd>
        </dl>
        <div className="mt-5 flex gap-2 border-t border-[var(--border)] pt-4">
          <span className="rounded-xl border border-[var(--border)] px-2 py-1 font-mono text-[11px] text-[var(--text-muted)]">
            Revoke
          </span>
          <span className="rounded-xl border border-[var(--border)] px-2 py-1 font-mono text-[11px] text-[var(--text-muted)]">
            Freeze
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
          <a href="#" className="flex items-center gap-2 font-medium tracking-tight">
            <span
              className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--accent-text)] font-mono text-[11px] font-medium text-white"
              aria-hidden
            >
              AP
            </span>
            <span>{c.brand}</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-[var(--text-muted)] lg:flex">
            {c.nav.map((n, i) => (
              <a key={n} href={`#${navIds[i]}`} className="transition hover:text-[var(--text)]">
                {n}
              </a>
            ))}
          </nav>
          <a
            href="#waitlist"
            className="btn-primary px-3.5 py-1.5 text-sm font-medium "
          >
            {c.hero.primary}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-16 sm:pb-24 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Eyebrow>{c.hero.eyebrow}</Eyebrow>
            <h1 className="font-display mt-5 text-[clamp(2.5rem,6vw,3.75rem)] font-medium leading-[1.08] tracking-tight text-[var(--text)]">
              {c.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-[var(--text)] sm:text-xl">{c.hero.sub}</p>
            <p className="mt-3 max-w-xl text-[var(--text-muted)]">{c.hero.truth}</p>

            <pre className="font-mono mt-8 max-w-lg overflow-x-auto rounded-[18px] bg-[var(--code-bg)] px-4 py-3.5 text-[13px] leading-6 text-[var(--code-text)]">
              <code>
                {c.hero.code.map((line) => (
                  <span key={line} className="block">
                    <span className="text-[var(--code-accent)]">$</span>
                    {line.replace(/^\$\s*/, " ")}
                  </span>
                ))}
              </code>
            </pre>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#waitlist"
                className="btn-primary px-5 py-2.5 text-sm font-medium "
              >
                {c.hero.primary}
              </a>
              <a
                href="#demo"
                className="btn-secondary px-5 py-2.5 text-sm font-medium"
              >
                {c.hero.secondary}
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <PassportPanel />
          </div>
        </div>
      </section>

      {/* Live demo */}
      <Sec id="demo" className="pt-4 sm:pt-8 rounded-xl">
        <div className="mb-8 max-w-2xl">
          <Eyebrow>Live demo</Eyebrow>
          <H2>Verify · trusted to act · revoke</H2>
          <p className="mt-3 text-[var(--text-muted)]">
            Travel flagship, Simulated. Prove who trusts whom — then book, then take it back.
          </p>
        </div>
        <LiveDemo />
      </Sec>

      {/* Product video — locked light UI, silent captions */}
      <Sec id="video" className="pt-4">
        <div className="overflow-hidden as-card">
          <div className="flex flex-col gap-4 px-6 pb-6 pt-8 sm:px-8 sm:pt-10">
            <div className="max-w-2xl">
              <Eyebrow>Product film</Eyebrow>
              <p className="font-display mt-2 text-2xl tracking-tight sm:text-3xl">{c.video.title}</p>
              <p className="mt-2 max-w-md text-[var(--text-muted)]">{c.video.sub}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                ~43s · silent captions · Travel trust arc
              </p>
            </div>
            <video
              className="aspect-video w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/video/frames-travel-poster.jpg"
            >
              <source src="/video/agent-passport-travel-silent.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </Sec>

      {/* Three questions */}
      <Sec>
        <Eyebrow>The problem</Eyebrow>
        <H2>{c.problem.title}</H2>
        <div className="mt-10 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {c.problem.items.map((p, i) => (
            <div key={p.q} className="grid gap-2 py-6 sm:grid-cols-[2.5rem_14rem_1fr] sm:gap-8">
              <span className="font-mono text-xs text-[var(--text-muted)]">0{i + 1}</span>
              <p className="font-display text-xl tracking-tight">{p.q}</p>
              <p className="text-[var(--text-muted)]">{p.a}</p>
            </div>
          ))}
        </div>
      </Sec>

      {/* Steps */}
      <Sec id="how">
        <Eyebrow>How it works</Eyebrow>
        <H2>{c.flow.title}</H2>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.flow.steps.map((s, i) => (
            <li
              key={s.t}
              className="relative as-card p-6"
            >
              <span className="font-mono text-xs text-[var(--accent-deep)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-medium tracking-tight">{s.t}</p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{s.d}</p>
            </li>
          ))}
        </ol>
      </Sec>

      {/* Passport contents */}
      <Sec id="passport">
        <Eyebrow>The credential</Eyebrow>
        <H2>{c.passport.title}</H2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.passport.cards.map((f, i) => (
            <div
              key={f.t}
              className="as-card p-6"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-display text-lg tracking-tight">{f.t}</p>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                  FIELD {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{f.d}</p>
            </div>
          ))}
        </div>
      </Sec>

      {/* Scenarios */}
      <Sec id="scenarios">
        <Eyebrow>Scenarios</Eyebrow>
        <H2>{c.scenarios.title}</H2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {c.scenarios.items.map((s) => (
            <article
              key={s.t}
              className="flex flex-col as-card p-6"
            >
              <p className="font-display text-lg tracking-tight">{s.t}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">{s.d}</p>
              <p className="mt-5 border-t border-[var(--border)] pt-3 font-mono text-[11px] text-[var(--accent-deep)]">
                scope · {s.scope}
              </p>
            </article>
          ))}
        </div>
      </Sec>

      {/* Developers */}
      <Sec id="developers">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Developers</Eyebrow>
            <H2>{c.developers.title}</H2>
            <p className="mt-4 max-w-md text-[var(--text-muted)]">{c.developers.sub}</p>
          </div>
          <pre className="font-mono overflow-x-auto rounded-[18px] bg-[var(--code-bg)] p-5 text-[12.5px] leading-6 text-[var(--code-text)] sm:p-6">
            <code>{c.developers.code}</code>
          </pre>
        </div>
      </Sec>

      {/* FAQ */}
      <Sec id="faq">
        <Eyebrow>FAQ</Eyebrow>
        <H2>Questions, answered honestly</H2>
        <div className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {c.faq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium tracking-tight">
                {f.q}
                <span className="font-mono text-[var(--text-muted)] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-[var(--text-muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </Sec>

      {/* Waitlist */}
      <section id="waitlist" className="border-t border-[var(--border)] bg-[var(--bg-wash)]">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
          <p className="text-[var(--text-muted)]">{c.vision.lead}</p>
          <h2 className="font-display mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium tracking-tight">
            {c.vision.title}
          </h2>
          <p className="mt-10 mb-4 text-lg">{c.waitlist.title}</p>
          <Waitlist />
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-8 text-center text-sm text-[var(--text-muted)]">
        <p>{c.footer}</p>
        <p className="mt-3 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
          Built on <img src="/allscale/allscale-logo.svg" alt="AllScale" width={73} height={23} className="inline-block" />
        </p>
      </footer>
    </main>
  );
}
