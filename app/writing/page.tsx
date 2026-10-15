import { ContentSection } from "@/components/section";
import { categories } from "@/lib/site";
export const metadata = {
  title: categories.writing.title,
  description: categories.writing.description,
  alternates: { canonical: "/writing" },
};
export default function Page() {
  return (
    <div className="listing">
      <ContentSection category="writing" all />
    </div>
  );
}
