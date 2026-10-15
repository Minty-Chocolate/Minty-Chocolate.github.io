import { withBasePath } from "@/lib/paths";
import Link from "next/link";
import Image from "next/image";
import { type Entry, formatDate } from "@/lib/content";
export function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="tags" aria-label="Topics">
      {tags.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
export function Card({ entry: e }: { entry: Entry }) {
  return (
    <article
      className={e.category === "projects" ? "project-card" : "text-card"}
    >
      <Link href={`/${e.category}/${e.slug}`} className="card-link">
        {e.cover && (
          <div className={e.category === "writing" ? "cover writing-cover" : "cover"}>
            <Image
              src={withBasePath(e.cover)}
              alt={e.coverAlt ?? `Cover image for ${e.title}`}
              fill
              sizes="(max-width: 640px) calc(100vw - 44px), (max-width: 1000px) calc((100vw - 102px) / 2), 449px"
            />
          </div>
        )}
        <div className="card-body">
          {e.category === "papers" && (
            <p className="eyebrow">
              {e.authors} · {e.year}
            </p>
          )}
          {e.category === "writing" && (
            <time className="eyebrow" dateTime={e.date}>
              {formatDate(e.date)}
            </time>
          )}
          <h3>
            {e.title}
            <span aria-hidden="true">↗</span>
          </h3>
          <p>{e.description}</p>
          <Tags tags={e.tags} />
        </div>
      </Link>
    </article>
  );
}
