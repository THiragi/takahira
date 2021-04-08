/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import fs from 'fs';
import path from 'path';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@leafac/rehype-shiki';
import * as shiki from 'shiki';

const t = shiki.loadTheme(
  path.join(process.cwd(), 'src/lib/shiki/themes/nord.json'),
);

export const markdownToHtml = async (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({
        theme: await t,
        langs: [
          {
            id: 'typescript',
            scopeName: 'source.ts',
            path: path.join(
              process.cwd(),
              'src/lib/shiki/languages/typescript.tmLanguage.json',
            ),
            aliases: ['ts'],
          },
          {
            id: 'tsx',
            scopeName: 'source.tsx',
            path: path.join(
              process.cwd(),
              'src/lib/shiki/languages/tsx.tmLanguage.json',
            ),
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
