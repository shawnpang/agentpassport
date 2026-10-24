# Launch video audio

| File | Use | License |
|------|-----|---------|
| `ambient-pad.mp3` | Soft documentary bed under captions (X / scored cut) | **Original** for Agent Passport — generated with ffmpeg (quiet layered sines + filtered pink noise). No third-party sample. Royalty-free for this product. |

## Regenerate (optional)

```bash
ffmpeg -y \
  -f lavfi -i "anoisesrc=color=pink:amplitude=0.04:duration=55" \
  -f lavfi -i "sine=frequency=98:duration=55" \
  -f lavfi -i "sine=frequency=146.8:duration=55" \
  -f lavfi -i "sine=frequency=196:duration=55" \
  -f lavfi -i "sine=frequency=293.7:duration=55" \
  -filter_complex "[1]volume=0.08[a];[2]volume=0.055[b];[3]volume=0.04[c];[4]volume=0.025[d];[0]volume=0.55[n];[n][a][b][c][d]amix=inputs=5:duration=longest:normalize=0,lowpass=f=1400,highpass=f=55,afade=t=in:st=0:d=1.5,afade=t=out:st=48:d=2.5,loudnorm=I=-22:TP=-3:LRA=8[out]" \
  -map "[out]" -t 55 /tmp/ambient-pad.wav
ffmpeg -y -i /tmp/ambient-pad.wav -c:a libmp3lame -q:a 3 docs/video/audio/ambient-pad.mp3
```

## Mix notes (locked)

- Site `#video`: **silent** master (`agent-passport-60s-v2-silent.mp4`); muted autoplay + captions.
- X / social: `agent-passport-60s-v2.mp4` — same picture + this pad, fade in/out.
- Target loudness after mix: **mean ≈ −22 dB · max ≈ −11 dB** (audible on phone, still under captions). Prior −90 dB bed was a bug — do not ship quiet pads.
- No lyrics, no EDM, no neon pulse.

## V3 — upbeat bed (locked for X / scored)

| File | Use | License |
|------|-----|---------|
| `upbeat-bed-v3.mp3` | Cheerful electronic bed under captions (X punch + full scored) | **Original** for Agent Passport — generated with procedural kick/hat/snare + major chord stabs in Python→WAV→ffmpeg mp3. No third-party sample. Royalty-free for this product. |

- Tempo: **128 BPM** · duration ≈ **45s** · no lyrics  
- Raw pad after loudnorm: mean ≈ **−19.5 dB** · max ≈ **−1 dB** (before mix volume trim)  
- After mix into `agent-passport-60s-v3.mp4` / punch: mean ≈ **−20 dB** · max ≈ **−2.3 dB** (drum transients; still under captions)  
- Do **not** reuse `ambient-pad.mp3` for v3 — that class was rejected (too quiet / not upbeat).

Regenerate sketch (procedural source of truth is `/workspace/ap-video-v3` gen script history; pad file in-repo is the master):

```bash
# See commit that added upbeat-bed-v3.mp3 — Python drum/chord renderer → ffmpeg libmp3lame
```
