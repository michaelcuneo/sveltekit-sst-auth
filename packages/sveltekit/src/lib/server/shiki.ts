import { getHighlighter } from "shiki";

export type exportType = { default: string };

export async function compute_codes() {
  const highlighter = await getHighlighter({
    themes: ["dark-plus"],
    langs: ["html", "js", "css", "svelte", "sh"],
  });

  const snippets: Record<string, exportType> = import.meta.glob("$lib/snippets/*", {
    query: "raw",
    eager: true,
  });

  const codes = Object.fromEntries(Object.entries(snippets).map(transform));

  function transform([path, file_content]: [string, exportType]): [string, string] {
    let fileCode = (file_content as exportType).default;
    const file_name = path.split("/").at(-1)!;
    const lang = file_name.split(".").pop()!;
    const code = highlighter.codeToHtml(fileCode, { lang, theme: "dark-plus" });

    return [file_name, code];
  }

  return codes;
}