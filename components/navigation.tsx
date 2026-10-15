"use client";
import Link from "next/link";
import { site, siteInitials } from "@/lib/site";
import { usePathname } from "next/navigation";
export function Navigation() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label={`${site.name} — home`}>
        {siteInitials}<span>.</span>
      </Link>
      <nav aria-label="Main navigation">
        {[
          ["/", "Home"],
          ["/projects", "Projects"],
          ["/papers", "Paper Reviews"],
          ["/writing", "Writing"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              (href === "/" ? pathname === "/" : pathname.startsWith(href))
                ? "page"
                : undefined
            }
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
