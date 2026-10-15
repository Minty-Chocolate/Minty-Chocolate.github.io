import { site } from "@/lib/site";
export const metadata = { title: "Resume" };
export default function Resume() {
  return (
    <article className="detail">
      <p className="eyebrow">Placeholder profile</p>
      <h1>{site.name}</h1>
      <p className="article-deck">
        {site.resumeHeadline}
      </p>
      <div className="prose">
        <h2>About</h2>
        <p>
          Replace this page with your professional summary, experience,
          education, and a link to your own PDF resume before sharing the site.
        </p>
        <h2>Interests</h2>
        <p>
          {site.interests}
        </p>
        <h2>Contact</h2>
        <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
      </div>
    </article>
  );
}
