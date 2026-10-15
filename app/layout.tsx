import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { site } from "@/lib/site";
import "katex/dist/katex.min.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Research & Writing`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    title: site.name,
    description: site.description,
  },
  twitter: { card: "summary" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="shell">
          <Navigation />
          <main id="main">{children}</main>
          <footer>
            <p>© {new Date().getFullYear()} {site.name}</p>
            <div>
              <span>Built with curiosity.</span>
              <Link href={`mailto:${site.email}`}>
                Say hello <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
