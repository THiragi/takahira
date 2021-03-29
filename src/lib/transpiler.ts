/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@leafac/rehype-shiki';
import * as shiki from 'shiki';

const markdownToHtml = async (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({ theme: 'nord' }),
    })
    .use(rehypeStringify)
    .processSync(markdown);

export default markdownToHtml;
