import { YouTubeEmbed } from "@next/third-parties/google";

/**
 * Click-to-load YouTube facade (lite-youtube) — keeps the heavy iframe off the
 * initial load for performance/LCP. Wrapped in a 16:9 rounded container.
 */
export function YouTube({ id, title }: { id: string; title: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-brand-900 shadow-md [&_lite-youtube]:max-w-none [&_lite-youtube]:rounded-lg">
      <YouTubeEmbed videoid={id} playlabel={title} params="rel=0" />
    </div>
  );
}
