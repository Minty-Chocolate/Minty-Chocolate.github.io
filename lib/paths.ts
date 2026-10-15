export const basePath = "";

// Next.js prefixes Link URLs automatically; public asset URLs need this explicitly.
export function withBasePath(url: string): string {
  if (!url.startsWith("/") || url.startsWith("//")) return url;
  if (url === basePath || url.startsWith(`${basePath}/`)) return url;
  return `${basePath}${url}`;
}
