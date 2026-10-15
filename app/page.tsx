import Link from "next/link";
import { ContentSection } from "@/components/section";
import { site } from "@/lib/site";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="intro">
        <p className="eyebrow intro-label">
          <span className="tiny-dot" /> {site.tagline}
        </p>
        <h1>
          {site.name}<span className="accent">.</span>
        </h1>
        <p className="intro-lead">{site.description}</p>
        <p className="intro-copy">{site.bio}</p>
        <div className="social-links">
          <a href={site.github}>GitHub ↗</a>
          <a href={site.linkedin}>LinkedIn ↗</a>
          <Link href={site.resume}>Resume ↗</Link>
          <a href={`mailto:${site.email}`}>Email ↗</a>
        </div>
      </section>
      <ContentSection category="projects" />
      <ContentSection category="papers" />
      <ContentSection category="writing" />
    </>
  );
}
