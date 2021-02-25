import { NextApiRequest, NextApiResponse } from 'next';

import client from '../../lib/api';
import toStringId from '../../lib/toStringId';

const exitPreview = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const id = toStringId(req.query.id);
  const post = await client.v1.blog._id(id).$get({
    query: { fields: 'id' },
  });

  res.clearPreviewData();
  res.writeHead(307, { Location: post ? `/blog/${post.id}` : '/' });
  res.end();
};

export default exitPreview;
