/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fs from 'fs';
import path from 'path';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@leafac/rehype-shiki';
import * as shiki from 'shiki';

const shikiTheme = path.join(process.cwd(), 'src/lib/shiki/themes/nord.json');
const languages = path.join(
  process.cwd(),
  'src/lib/shiki/languages/abap.tmLanguage.json',
);

export const markdownToHtml = async (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({
        theme: JSON.parse(fs.readFileSync(shikiTheme, 'utf-8')),
        langs: JSON.parse(fs.readFileSync(languages, 'utf-8')),
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
