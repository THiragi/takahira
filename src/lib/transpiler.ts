import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@leafac/rehype-shiki';
import { getHighlighter } from 'shiki';
import fs from 'fs';

// FIXME: Allows shiki to access production theme/language files.
const path = process.cwd();
fs.readdirSync(`${path}/node_modules/shiki/languages`);
fs.readdirSync(`${path}/node_modules/shiki/themes`);
fs.readdirSync(`${path}/node_modules/vscode-textmate`);

export const markdownToHtml = async (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, {
      highlighter: await getHighlighter({
        theme: 'slack-dark',
      }),
    })
    .use(rehypeStringify)
    .processSync(markdown);

export const markdownToText = (markdown: string): string =>
  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString()
    .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
