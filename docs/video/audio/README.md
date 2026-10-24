# Launch video audio

| File | Use | License |
|------|-----|---------|
| `ambient-pad.mp3` | Soft documentary bed under captions (X / scored cut) | **Original** for Agent Passport — generated with ffmpeg (quiet layered sines + filtered pink noise). No third-party sample. Royalty-free for this product. |

## Regenerate (optional)

```bash
ffmpeg -y -f lavfi -i "anoisesrc=color=pink:amplitude=0.015:duration=70" \
  -f lavfi -i "sine=frequency=98:duration=70" \
  -f lavfi -i "sine=frequency=146.8:duration=70" \
  -f lavfi -i "sine=frequency=196:duration=70" \
  -filter_complex "[1]volume=0.03[a];[2]volume=0.02[b];[3]volume=0.015[c];[0]volume=0.4[n];[n][a][b][c]amix=inputs=4:duration=longest,lowpass=f=1200,highpass=f=60,afade=t=in:st=0:d=2,afade=t=out:st=65:d=5,volume=0.35[out]" \
  -map "[out]" -t 70 docs/video/audio/ambient-pad.wav
ffmpeg -y -i docs/video/audio/ambient-pad.wav -c:a libmp3lame -q:a 4 docs/video/audio/ambient-pad.mp3
```

## Mix notes (locked)

- Site `#video`: **silent** master (`agent-passport-60s-v2-silent.mp4`); muted autoplay + captions.
- X / social: `agent-passport-60s-v2.mp4` — same picture + this pad (`volume≈0.11`), fade in/out.
- No lyrics, no EDM, no neon pulse.
