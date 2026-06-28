import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/schema";

/**
 * Blog teaser — "Explore Hair Restoration Tips & Insights": a 3-up card grid of
 * latest posts that deep-link to the legacy /post/<slug>/ URLs (internal-link
 * SEO). Each card: a clinical image with a category pill, a linked title, a
 * by-line (author · date), and a clamped excerpt. The image and title link to
 * the post; the category pill links to its category index — kept as sibling
 * anchors (never nested) so the markup stays valid. Last content section
 * before the footer.
 *
 * Layout note: an editorial blog-index header — a confident left-aligned
 * `text-h2` title with the "explore" link pulled onto the same baseline row
 * (right on desktop), divided from the grid by a hairline rule. No eyebrow.
 * Cards stay compact (narrow 1080px column, reduced rhythm) so the grid reads
 * as a teaser even though the heading sits at full section scale. `data.eyebrow`
 * is intentionally unused here.
 */
export function BlogTeaser({ data }: { data: NonNullable<HomeContent["blog"]> }) {
  return (
    <Section id="blog" tone="muted" className="py-16 lg:py-20">
      <Container width="text" className="max-w-[1080px]">
        <Reveal className="flex flex-col gap-5 border-b border-brand-900/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-2xl text-h2 font-semibold tracking-tight text-brand-900">
            {data.heading}
          </h2>
          {data.cta ? (
            <a
              href={data.cta.href}
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-600"
            >
              {data.cta.label}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          ) : null}
        </Reveal>

        <div className="mt-10 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {data.posts.map((post, i) => (
            <Reveal key={post.href} as="article" delay={i * 0.08} className="flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-sand-200">
                <a href={post.href} aria-label={post.title} className="group block h-full w-full">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.alt ?? post.title}
                      fill
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  ) : null}
                </a>
                {post.category ? (
                  <a
                    href={post.categoryHref ?? post.href}
                    className="absolute bottom-2.5 start-2.5 z-10 rounded bg-sky-300 px-2 py-0.5 text-eyebrow font-semibold uppercase tracking-[0.08em] text-brand-900 shadow-sm transition-colors hover:bg-sky-200"
                  >
                    {post.category}
                  </a>
                ) : null}
              </div>

              <a href={post.href} className="group mt-4 block">
                <h3 className="text-lg font-semibold leading-snug text-brand-800 transition-colors group-hover:text-accent-700">
                  {post.title}
                </h3>
              </a>

              {post.author || post.date ? (
                <p className="mt-1.5 text-sm text-ink-500">
                  {post.author ? (
                    <>
                      By <span className="font-medium text-ink-700">{post.author}</span>
                    </>
                  ) : null}
                  {post.author && post.date ? <span aria-hidden> · </span> : null}
                  {post.date}
                </p>
              ) : null}

              {post.excerpt ? (
                <p className="mt-2 line-clamp-3 text-sm text-ink-700">{post.excerpt}</p>
              ) : null}
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
