import Link from "next/link";
export default function NotFound() {
  return (
    <section className="intro">
      <p className="eyebrow">404</p>
      <h1>Page not found.</h1>
      <p>This page may have moved, or the address may be incomplete.</p>
      <Link className="back-link" href="/">
        ← Back home
      </Link>
    </section>
  );
}
