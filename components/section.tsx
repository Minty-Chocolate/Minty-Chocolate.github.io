import Link from "next/link";
import { categories, disclaimer } from "@/lib/site";
import { getEntries, type Category } from "@/lib/content";
import { Card } from "./cards";
export function ContentSection({
  category,
  all = false,
}: {
  category: Category;
  all?: boolean;
}) {
  const info = categories[category];
  const entries = getEntries(category);
  const selected = all
    ? entries
    : entries
        .filter((e) => e.featured)
        .slice(0, category === "projects" ? 2 : 2);
  return (
    <section className="content-section" aria-labelledby={`${category}-title`}>
      <div className="section-heading">
        {all ? (
          <h1 id={`${category}-title`}>{info.title}</h1>
        ) : (
          <h2 id={`${category}-title`}>{info.title}</h2>
        )}
        {!all && (
          <Link
            className="view-all"
            aria-label={`View all ${info.title.toLowerCase()}`}
            href={`/${category}`}
          >
            View all <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
      <p className="section-description">{info.description}</p>
      {category === "projects" && <p className="disclaimer">{disclaimer}</p>}
      <div className={category === "projects" ? "project-grid" : "text-list"}>
        {selected.map((e) => (
          <Card key={e.slug} entry={e} />
        ))}
      </div>
    </section>
  );
}
