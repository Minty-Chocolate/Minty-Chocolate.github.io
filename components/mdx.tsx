import Link from "next/link";
import { withBasePath } from "@/lib/paths";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
function ContentImage({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string") return null;
  return (
    <Image
      src={withBasePath(src)}
      alt={alt || ""}
      width={960}
      height={540}
      className="article-image"
      unoptimized
      {...(props.title ? { title: props.title } : {})}
    />
  );
}
export async function Mdx({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      [rehypePrettyCode, { theme: "github-light", keepBackground: false }],
    ],
  });
  return (
    <div className="prose">
      <Content
        components={{
          img: ContentImage,
          a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) =>
            href?.startsWith("/") && !href.startsWith("//") ? (
              <Link href={href} {...props}>{children}</Link>
            ) : (
              <a href={href} {...props}>{children}</a>
            ),
          Callout: ({ children }: { children: React.ReactNode }) => (
            <aside className="callout">{children}</aside>
          ),
        }}
      />
    </div>
  );
}
