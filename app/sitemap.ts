export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getEntries, type Category } from "@/lib/content";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const categories: Category[] = ["projects", "papers", "writing"];
  return [
    { url: site.url },
    ...categories.flatMap((c) => [
      { url: `${site.url}/${c}` },
      ...getEntries(c).map((e) => ({
        url: `${site.url}/${c}/${e.slug}`,
        lastModified: e.date,
      })),
    ]),
    { url: `${site.url}/resume` },
  ];
}
