import { YouTubeEmbed } from "@next/third-parties/google";
import { cn } from "@/lib/utils";

/**
 * Click-to-load YouTube facade (lite-youtube) — keeps the heavy iframe off the
 * initial load for performance/LCP. Wrapped in a 16:9 rounded container; `className`
 * extends the wrapper (e.g. a stronger shadow for a featured tile).
 */
export function YouTube({
  id,
  title,
  className,
}: {
  id: string;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "aspect-video w-full overflow-hidden rounded-lg bg-brand-900 shadow-md [&_lite-youtube]:max-w-none [&_lite-youtube]:rounded-lg",
        className,
      )}
    >
      <YouTubeEmbed videoid={id} playlabel={title} params="rel=0" />
    </div>
  );
}
