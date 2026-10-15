import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
export type Category = "projects" | "papers" | "writing";
export type Entry = {
  slug: string;
  category: Category;
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured: boolean;
  cover?: string;
  coverAlt?: string;
  authors?: string;
  year?: number;
  source?: string;
  body: string;
};
export const getEntries = cache((category: Category): Entry[] => {
  const dir = path.join(process.cwd(), "content", category);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(dir, file), "utf8"),
      );
      for (const key of ["title", "description", "date"])
        if (typeof data[key] !== "string" || !data[key])
          throw new Error(`${file}: missing ${key}`);
      if (
        !Array.isArray(data.tags) ||
        data.tags.some((t) => typeof t !== "string")
      )
        throw new Error(`${file}: tags must be strings`);
      if (Number.isNaN(Date.parse(data.date)))
        throw new Error(`${file}: invalid date`);
      if (
        category === "papers" &&
        (typeof data.authors !== "string" || typeof data.year !== "number")
      )
        throw new Error(`${file}: authors and year required`);
      for (const key of ["cover", "coverAlt"])
        if (data[key] !== undefined && typeof data[key] !== "string")
          throw new Error(`${file}: ${key} must be a string`);
      // An omitted or blank cover keeps the original text-only card layout.
      const cover = data.cover?.trim() || undefined;
      return {
        ...data,
        cover,
        slug: file.slice(0, -4),
        category,
        body: content,
      } as Entry;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
});
export function getEntry(category: Category, slug: string) {
  return getEntries(category).find((e) => e.slug === slug);
}
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
