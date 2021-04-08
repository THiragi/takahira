/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import fs from 'fs';
import path from 'path';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@leafac/rehype-shiki';
import { loadTheme, getHighlighter } from 'shiki';

const shikiDirectory = path.join(process.cwd(), 'src/lib/shiki');

const theme = loadTheme(path.join(shikiDirectory, '/themes/nord.json'));

const tsPath = path.join(
  shikiDirectory,
  '/languages/typescript.tmLanguage.json',
);
const tsxPath = path.join(shikiDirectory, '/languages/tsx.tmLanguage.json');

export const markdownToHtml = async (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, {
      highlighter: await getHighlighter({
        theme: await theme,
        langs: [
          {
            id: 'typescript',
            scopeName: 'source.ts',
            path: tsPath,
            aliases: ['ts'],
          },
          {
            id: 'tsx',
            scopeName: 'source.tsx',
            path: tsxPath,
          },
        ],
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
