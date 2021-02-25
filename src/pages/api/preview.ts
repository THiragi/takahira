import { NextApiRequest, NextApiResponse } from 'next';
import toStringId from '../../lib/toStringId';
import client from '../../lib/api';

const preview = async (
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line consistent-return
): Promise<void> => {
  if (req.query.secret !== process.env.MICRO_CMS_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const id = toStringId(req.query.id);
  const draftKey = toStringId(req.query.draftKey);
  const post = await client.v1.blog._id(id).$get({
    query: {
      fields: 'id,title,body,publishedAt,tags',
      draftKey,
    },
  });

  if (!post) {
    return res.status(401).json({ message: 'Invalid contentId' });
  }

  res.setPreviewData({ ...post, draftKey });
  res.writeHead(307, { Location: `/blog/${post.id}` });
  res.end();
};

export default preview;
