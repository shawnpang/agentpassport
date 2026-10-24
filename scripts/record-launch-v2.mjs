/**
 * Launch video v2 — headless LiveDemo continuous capture (no OS chrome).
 * Screenshot loop ~18fps while real clicks drive Issue→Mint→Call→Revoke.
 */
import puppeteer from '/workspace/agentpassport-design/out/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FRAMES = '/tmp/ap-v2-frames';
const OUT_SILENT = path.join(ROOT, 'public/video/agent-passport-60s-v2-silent.mp4');
const OUT_BGM = path.join(ROOT, 'public/video/agent-passport-60s-v2.mp4');
const BGM = path.join(ROOT, 'docs/video/audio/ambient-pad.mp3');
const TARGET_FPS = 18;

fs.rmSync(FRAMES, { recursive: true, force: true });
fs.mkdirSync(FRAMES, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const run = (cmd, args) => new Promise((resolve, reject) => {
  const p = spawn(cmd, args, { stdio: 'inherit' });
  p.on('exit', c => c === 0 ? resolve() : reject(new Error(`${cmd} ${c}`)));
});

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--font-render-hinting=none', '--window-size=1280,720'],
  defaultViewport: { width: 1280, height: 720, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
await page.goto('http://127.0.0.1:3456/#demo', { waitUntil: 'networkidle0', timeout: 90000 });

await page.evaluate(() => {
  const style = document.createElement('style');
  style.textContent = `
    html, body { background: #fff !important; overflow: hidden !important; margin: 0 !important; }
    header, nav, footer { display: none !important; }
    #video, #how, #passport, #scenarios, #developers, #faq, #waitlist { display: none !important; }
    main > section:not(#demo) { display: none !important; }
    #demo {
      margin: 0 !important; padding: 16px 24px 18px !important;
      max-width: none !important; width: 1280px !important;
      box-sizing: border-box !important; background: #fff !important;
    }
    /* Hide marketing chrome above the playground — film shows product only */
    #demo > .mb-8, #demo > div.mb-8 { display: none !important; }
    #demo p.text-sm.text-\\[var\\(--text-muted\\)\\] { display: none !important; }
    /* tighter top bar copy */
    #film-cap {
      position: fixed; left: 0; right: 0; bottom: 24px; z-index: 99999;
      text-align: center; pointer-events: none;
      font-family: Inter, system-ui, sans-serif;
      font-size: 27px; font-weight: 600; letter-spacing: -0.03em; color: #0c0c0c;
      text-shadow: 0 1px 0 #fff, 0 0 18px rgba(255,255,255,.95), 0 6px 20px rgba(255,255,255,.85);
      opacity: 0; transition: opacity .28s ease; padding: 0 64px;
    }
    #film-cap.on { opacity: 1; }
    #film-brand {
      position: fixed; top: 14px; left: 20px; z-index: 99999;
      display: flex; align-items: center; gap: 8px;
      font-family: Inter, system-ui, sans-serif; font-weight: 600; font-size: 13px;
      color: #0c0c0c; opacity: 0; transition: opacity .25s; pointer-events: none;
    }
    #film-brand.on { opacity: 1; }
    #film-brand .m { width: 18px; height: 18px; border-radius: 5px; background: #0c0c0c; position: relative; }
    #film-brand .m::after { content:""; position:absolute; inset:5px; background:#00c96d; border-radius:2px; transform:rotate(45deg); }
    #film-sim {
      position: fixed; top: 14px; right: 20px; z-index: 99999;
      font-family: ui-monospace, Menlo, monospace; font-size: 10px; letter-spacing: .12em;
      text-transform: uppercase; color: #24603a;
      background: rgba(0,201,109,.12); border: 1px solid rgba(0,201,109,.28);
      padding: 4px 9px; border-radius: 999px; opacity: 0; transition: opacity .25s; pointer-events: none;
    }
    #film-sim.on { opacity: 1; }
    #film-veil {
      position: fixed; left: 0; right: 0; bottom: 0; height: 100px; z-index: 99990;
      background: linear-gradient(transparent, rgba(255,255,255,.9));
      pointer-events: none; opacity: 0; transition: opacity .25s;
    }
    #film-veil.on { opacity: 1; }
    #film-open {
      position: fixed; inset: 0; z-index: 99980; background: #fff;
      display: flex; align-items: center; justify-content: center;
      opacity: 1; transition: opacity .4s ease; pointer-events: none;
    }
    #film-open.off { opacity: 0; visibility: hidden; }
    #film-open .t {
      font-family: Inter, system-ui, sans-serif;
      font-size: 44px; font-weight: 600; letter-spacing: -0.03em; text-align: center;
      padding: 0 80px; color: #0c0c0c; max-width: 900px;
    }
    #film-cursor {
      position: fixed; z-index: 100000; width: 22px; height: 22px;
      pointer-events: none; opacity: 0; filter: drop-shadow(0 2px 2px rgba(0,0,0,.28));
      transition: opacity .15s;
    }
    #film-cursor.on { opacity: 1; }
  `;
  document.head.appendChild(style);

  // Also hide the muted helper line inside demo card header via JS
  document.querySelectorAll('#demo p').forEach(p => {
    const t = p.textContent || '';
    if (/Pure frontend mock|Try the credential lifecycle|Four Simulated steps/.test(t)) {
      p.style.display = 'none';
      const wrap = p.closest('.mb-8');
      if (wrap) wrap.style.display = 'none';
    }
  });

  const open = document.createElement('div');
  open.id = 'film-open';
  open.innerHTML = `<div class="t">Every agent deserves a passport.</div>`;
  document.body.appendChild(open);
  const brand = document.createElement('div');
  brand.id = 'film-brand';
  brand.innerHTML = `<div class="m"></div>Agent Passport`;
  document.body.appendChild(brand);
  const sim = document.createElement('div');
  sim.id = 'film-sim'; sim.textContent = 'Simulated';
  document.body.appendChild(sim);
  document.body.appendChild(Object.assign(document.createElement('div'), { id: 'film-veil' }));
  document.body.appendChild(Object.assign(document.createElement('div'), { id: 'film-cap' }));
  const cur = document.createElement('div');
  cur.id = 'film-cursor';
  cur.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 3l14 8.2-6.2 1.6L9.4 21 5 3z" fill="#0c0c0c" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
  document.body.appendChild(cur);

  window.__film = {
    setCap(t) {
      const el = document.getElementById('film-cap');
      el.textContent = t || '';
      el.classList.toggle('on', !!t);
      document.getElementById('film-veil').classList.toggle('on', !!t);
    },
    setChrome(on) {
      document.getElementById('film-brand').classList.toggle('on', on);
      document.getElementById('film-sim').classList.toggle('on', on);
    },
    setOpen(on) {
      const el = document.getElementById('film-open');
      el.classList.toggle('off', !on);
    },
    setOpenText(t) { document.querySelector('#film-open .t').textContent = t; },
    moveCursor(x, y, on = true) {
      const el = document.getElementById('film-cursor');
      el.style.left = x + 'px'; el.style.top = y + 'px';
      el.classList.toggle('on', on);
    },
  };
  window.scrollTo(0, 0);
  document.getElementById('demo')?.scrollIntoView({ block: 'start' });
});

await sleep(500);

let capturing = true;
let frameIdx = 0;
const capturePromise = (async () => {
  while (capturing) {
    const t0 = Date.now();
    const buf = await page.screenshot({ type: 'jpeg', quality: 84, clip: { x: 0, y: 0, width: 1280, height: 720 } });
    fs.writeFileSync(path.join(FRAMES, `f${String(frameIdx++).padStart(5, '0')}.jpg`), buf);
    const spent = Date.now() - t0;
    await sleep(Math.max(0, Math.floor(1000 / TARGET_FPS) - spent));
  }
})();

const setCap = (t) => page.evaluate((x) => window.__film.setCap(x), t);
const setChrome = (on) => page.evaluate((o) => window.__film.setChrome(o), on);
const setOpen = (on) => page.evaluate((o) => window.__film.setOpen(o), on);
const setOpenText = (t) => page.evaluate((x) => window.__film.setOpenText(x), t);
const moveCursor = (x, y, on = true) => page.evaluate((a, b, o) => window.__film.moveCursor(a, b, o), x, y, on);

async function clickButton(re) {
  const box = await page.evaluate((pattern) => {
    const rx = new RegExp(pattern);
    const b = [...document.querySelectorAll('button')].find(el => rx.test((el.textContent || '').trim()) && !el.disabled);
    if (!b) return null;
    const r = b.getBoundingClientRect();
    return { x: r.x + r.width * 0.55, y: r.y + r.height * 0.5 };
  }, re);
  if (!box) { console.warn('missing', re); return; }
  // ease cursor in a few steps
  await moveCursor(box.x - 90, box.y - 50, true);
  await sleep(140);
  await moveCursor(box.x - 30, box.y - 10, true);
  await sleep(100);
  await moveCursor(box.x, box.y, true);
  await sleep(90);
  await page.mouse.click(box.x, box.y);
  await sleep(60);
}

console.log('capture+act');
const wallStart = Date.now();
// Beat map tuned so mute-15s outsider sees Issue→Mint clearly
await setOpen(true); await setChrome(false); await setCap(''); await moveCursor(0, 0, false);
await sleep(3000);
await setOpenText('Internet still trusts only people.');
await sleep(2500);

await setOpen(false); await setChrome(true);
await setCap('Verify once. Issue a credential.');
await sleep(400);
await clickButton('1 · Issue|Start verification');
await sleep(8000); // hold Issued Active density

await setCap('Passkey-mint. Per purchase.');
await clickButton('2 · Mint disposable');
await sleep(10000); // minting → minted card hold

await setCap('Card · Phone · One ledger.');
await clickButton('3 · Simulate call');
await sleep(12000); // connected + timer

await setCap('Revoke anytime. Full audit.');
await clickButton('4 · Revoke');
await sleep(7000);

await setCap('Agent Passport — early access.');
await moveCursor(640, 380, true);
await sleep(6000);

capturing = false;
await capturePromise;
await browser.close();

const n = frameIdx;
const wall = (Date.now() - wallStart) / 1000;
const actualFps = n / wall;
console.log('frames', n, 'wall_s', wall.toFixed(2), 'actual_fps', actualFps.toFixed(2));
if (n < 80) throw new Error('too few frames');
if (wall < 42) console.warn('WARNING short wall time', wall);

// Encode using actual capture rate so playback matches real timing
const dur = wall;
await run('ffmpeg', [
  '-y', '-hide_banner', '-loglevel', 'error',
  '-framerate', String(actualFps),
  '-i', path.join(FRAMES, 'f%05d.jpg'),
  '-vf', 'scale=1280:720:flags=lanczos,fps=24',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'medium',
  '-movflags', '+faststart', '-an',
  OUT_SILENT,
]);

await run('ffmpeg', [
  '-y', '-hide_banner', '-loglevel', 'error',
  '-i', OUT_SILENT,
  '-i', BGM,
  '-filter_complex', '[1:a]volume=0.11,afade=t=in:st=0:d=1.2,afade=t=out:st=' + Math.max(1, dur - 4).toFixed(1) + ':d=3[a]',
  '-map', '0:v', '-map', '[a]',
  '-c:v', 'copy', '-c:a', 'aac', '-b:a', '128k', '-shortest',
  OUT_BGM,
]);

console.log('duration_est', dur.toFixed(2), 'wrote', OUT_SILENT, OUT_BGM);
