import { type ComponentProps, useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { cnMerge } from "tailwind-variants";

interface CodeBlockProps extends ComponentProps<"div"> {
  code: string;
  language?: string;
}

export function CodeBlock({
  code,
  language = "json",
  className,
  ...props
}: CodeBlockProps) {
  const [parsedCode, setParsedCode] = useState<string | null>(null);

  useEffect(() => {
    if (code) {
      codeToHtml(code, {
        lang: language,
        theme: "vesper",
      }).then((code) => setParsedCode(code));
    }
  }, [code, language]);

  return (
    <div
      className={cnMerge(
        "relative overflow-x-auto rounded-lg border border-zinc-700",
        className
      )({ twMerge: true })}
      {...props}
    >
      <div
        className="[&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: It's a code fragment
        dangerouslySetInnerHTML={{ __html: parsedCode ?? "" }}
      />
    </div>
  );
}
