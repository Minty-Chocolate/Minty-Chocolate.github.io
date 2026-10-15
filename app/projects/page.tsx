import { ContentSection } from "@/components/section";
import { categories } from "@/lib/site";
export const metadata = {
  title: categories.projects.title,
  description: categories.projects.description,
  alternates: { canonical: "/projects" },
};
export default function Page() {
  return (
    <div className="listing">
      <ContentSection category="projects" all />
    </div>
  );
}
