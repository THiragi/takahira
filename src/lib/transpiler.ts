/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@leafac/rehype-shiki';
import { getHighlighter } from 'shiki';
import { shikiTheme, shikiLangs } from './highlighter';

console.log(shikiLangs);

export const markdownToHtml = async (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, {
      highlighter: await getHighlighter({
        theme: await shikiTheme,
        langs: shikiLangs,
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
