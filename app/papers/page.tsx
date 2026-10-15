import { ContentSection } from "@/components/section";
import { categories } from "@/lib/site";
export const metadata = {
  title: categories.papers.title,
  description: categories.papers.description,
  alternates: { canonical: "/papers" },
};
export default function Page() {
  return (
    <div className="listing">
      <ContentSection category="papers" all />
    </div>
  );
}
