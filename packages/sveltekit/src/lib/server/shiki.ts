import { getHighlighter } from 'shiki';

export type exportType = { default: string };

/**
 * Asynchronously computes code snippets with highlighted code using Shiki.
 *
 * @returns {Promise<Record<string, string>>} A Promise that resolves to a Record, where the keys are file names and the values are the highlighted code.
 */
export async function computeCodeSnippets() {
	// Initialize Shiki highlighter with 'dark-plus' theme and supported languages
	const highlighter = await getHighlighter({
		themes: ['dark-plus'],
		langs: ['html', 'js', 'css', 'svelte', 'sh']
	});

	// Import all code snippets from '$lib/snippets/' directory with 'raw' query and eager loading
	const codeSnippets = import.meta.glob('$lib/snippets/*', {
		query: 'raw',
		eager: true
	}) as Record<string, { default: string }>;

	// Map each code snippet to a tuple with the file name and highlighted code
	const codeSnippetsWithHighlightedCode = Object.entries(codeSnippets).map(
		([path, { default: fileCode }]) => {
			// Extract file name and language from the path
			const fileName = path.split('/').at(-1)!;
			const lang = fileName.split('.').pop()!;
			// Highlight the code using the highlighter
			const highlightedCode = highlighter.codeToHtml(fileCode, { lang, theme: 'dark-plus' });
			return [fileName, highlightedCode];
		}
	);

	// Return the computed code snippets as a Record, where the keys are file names and the values are the highlighted code
	return Object.fromEntries(codeSnippetsWithHighlightedCode);
}
