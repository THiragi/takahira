import { NextApiRequest, NextApiResponse } from 'next';
import toStringId from '../../lib/toStringId';
import client from '../../lib/api';

const preview = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiResponse<any> | void> => {
  if (
    req.query.secret !== process.env.MICRO_CMS_PREVIEW_SECRET ||
    !req.query.id
  ) {
    return res.status(404).end();
  }

  const id = toStringId(req.query.id);
  const draftKey = toStringId(req.query.draftKey);
  const post = await client.v1.blog._id(id).$get({
    query: {
      fields: 'id',
      draftKey,
    },
  });

  if (!post) {
    return res.status(401).json({ message: 'Invalid contentId' });
  }

  return res
    .setPreviewData({ id: post.id, draftKey })
    .writeHead(307, { Location: `/blog/${post.id}` })
    .end('Preview mode enabled');
};

export default preview;
