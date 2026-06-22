# public/media

Web-ready media served by the app. **Committed.** Do not place master files here.

- **Masters** (large source video/photos) live in `/collections/` (git-ignored).
- Run `npm run transcode` (requires ffmpeg) to produce optimized hero loops +
  posters from the masters into this folder.
- Run `npm run placeholders` to (re)generate branded placeholder images (used
  until real assets land). Safe to overwrite.

Referenced paths (see `content/en/home.ts`, `content/he/home.ts`):

```
hero/hero-poster.jpg   hero/hero-loop.mp4 (+.webm)   hero/he-hero.jpg
og/dr-asi-dr-eric.jpg
team/dr-asi.jpg        team/dr-eric.jpg
results/{luke,costa,dean,aidan,fede,peter}.jpg
```

To drop in the **AI-generated hero video** later: produce `hero/hero-loop.mp4`
(+ optional `.webm`) and `hero/hero-poster.jpg`, then in `content/en/home.ts` set
`hero.media.kind` to `"video"`. No component changes needed.
