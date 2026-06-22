/**
 * Transcodes the large master videos in collections/Videos/ into web-ready clips
 * + posters in public/media/video/. Uses the bundled ffmpeg-static binary (no
 * system ffmpeg needed). collections/ is git-ignored; only these optimized
 * derivatives are committed/served.
 *
 * Run: npm run transcode
 */
import ffmpegPath from "ffmpeg-static";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const SRC = join(process.cwd(), "collections", "Videos");
const OUT = join(process.cwd(), "public", "media", "video");
mkdirSync(OUT, { recursive: true });

// Curated "preparations & expertise" showcase clips (input -> output basename).
const CLIPS = [
  { in: "C0340.MP4", out: "clip-1", start: "3" }, // hairline design
  { in: "C1718.MP4", out: "clip-2", start: "3" }, // sterile preparation
  { in: "C0631.MP4", out: "clip-3", start: "2" }, // graft preparation
  { in: "C0655.MP4", out: "clip-4", start: "3" }, // surgical precision
  { in: "C0361.MP4", out: "clip-5", start: "3" }, // FUE extraction
  { in: "C0368.MP4", out: "clip-6", start: "3" }, // doctor-performed surgery
];

const DUR = "11";

function run(args) {
  const r = spawnSync(ffmpegPath, args, { stdio: "ignore" });
  if (r.status !== 0) console.warn("  ffmpeg returned", r.status);
}

for (const c of CLIPS) {
  const input = join(SRC, c.in);
  if (!existsSync(input)) {
    console.warn("skip (missing):", c.in);
    continue;
  }
  const mp4 = join(OUT, `${c.out}.mp4`);
  const poster = join(OUT, `${c.out}.jpg`);
  // Trimmed, 720p H.264 (broad-compat) + AAC audio, faststart for streaming.
  // Audio is kept so the player's mute toggle is functional; the clip still
  // starts muted in the UI and unmutes on demand.
  run([
    "-y", "-ss", c.start, "-i", input, "-t", DUR,
    "-vf", "scale=-2:720", "-c:v", "libx264", "-crf", "26",
    "-preset", "veryfast", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "128k", "-ac", "2",
    "-movflags", "+faststart", mp4,
  ]);
  // Poster (first frame of the trimmed segment).
  run(["-y", "-ss", c.start, "-i", input, "-frames:v", "1", "-vf", "scale=-2:720", poster]);
  console.log("transcoded:", c.out, "<-", c.in);
}
console.log("\nDone -> public/media/video/");
