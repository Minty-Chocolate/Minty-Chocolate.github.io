import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEntries, getEntry, formatDate } from "@/lib/content";
import { categories } from "@/lib/site";
import { Tags } from "@/components/cards";
import { Mdx } from "@/components/mdx";
export const dynamicParams = false;
export function generateStaticParams() {
  return getEntries("writing").map((e) => ({ slug: e.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getEntry("writing", slug);
  if (!e) return { title: "Not found" };
  return {
    title: e.title,
    description: e.description,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      type: "article",
      title: e.title,
      description: e.description,
      publishedTime: e.date,
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = getEntry("writing", slug);
  if (!e) notFound();
  return (
    <article className="detail">
      <Link className="back-link" href="/writing">
        ← {categories.writing.title}
      </Link>
      <header className="article-header">
        <p className="eyebrow">
          {e.authors ? `${e.authors} · ${e.year}` : formatDate(e.date)}
        </p>
        <h1>{e.title}</h1>
        <p className="article-deck">{e.description}</p>
        <Tags tags={e.tags} />
      </header>
      {e.source && (
        <p className="source-link">
          <a href={e.source}>Read the original paper ↗</a>
        </p>
      )}
      <Mdx source={e.body} />
      <div className="article-end">
        <Link href="/writing">
          ← All {categories.writing.title.toLowerCase()}
        </Link>
      </div>
    </article>
  );
}
