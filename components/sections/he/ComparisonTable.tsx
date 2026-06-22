import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/schema";

/**
 * Israel-vs-Turkey comparison. The table inherits the document RTL direction, so
 * the label column sits on the right. Collapses to stacked cards on mobile so RTL
 * never breaks. Numbers/prices are wrapped in <bdi> to stay LTR.
 */
export function ComparisonTable({ data }: { data: NonNullable<HomeContent["comparison"]> }) {
  const [labelCol, israelCol, turkeyCol] = data.columns;

  return (
    <section id="comparison" className="scroll-mt-28">
      <h2 className="text-h2 text-brand-800">{data.heading}</h2>

      {/* Desktop / tablet table */}
      <Reveal className="mt-6 hidden overflow-hidden rounded-lg border border-sand-200 sm:block">
        <table className="w-full border-collapse text-start">
          <thead>
            <tr className="bg-sand-100 text-start">
              <th className="p-4 text-start text-sm font-semibold text-ink-700/70">{labelCol}</th>
              <th className="p-4 text-start text-sm font-semibold text-accent-700">{israelCol}</th>
              <th className="p-4 text-start text-sm font-semibold text-ink-700/70">{turkeyCol}</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i} className="border-t border-sand-200">
                <td className="p-4 text-body font-medium text-brand-800">{row[0]}</td>
                <td className="bg-accent-50/50 p-4 text-body text-ink-900">
                  <bdi>{row[1]}</bdi>
                </td>
                <td className="p-4 text-body text-ink-700">
                  <bdi>{row[2]}</bdi>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      {/* Mobile cards */}
      <div className="mt-6 space-y-4 sm:hidden">
        {data.rows.map((row, i) => (
          <div key={i} className="rounded-lg border border-sand-200 p-4">
            <p className="font-medium text-brand-800">{row[0]}</p>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-accent-700">
                {israelCol}: <bdi className="font-medium">{row[1]}</bdi>
              </span>
              <span className="text-ink-700">
                {turkeyCol}: <bdi>{row[2]}</bdi>
              </span>
            </div>
          </div>
        ))}
      </div>

      {data.note ? <p className="mt-3 text-sm text-ink-700/60">{data.note}</p> : null}
    </section>
  );
}
