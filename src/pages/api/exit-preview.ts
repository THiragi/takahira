import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../lib/api';
import toStringId from '../../lib/toStringId';

const exitPreview = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const id = toStringId(req.query.id);

  await client.v1.blog
    ._id(id)
    .$get({
      query: { fields: 'id' },
    })
    .then((post) => {
      res.clearPreviewData();
      res.writeHead(307, { Location: `/blog/${post.id}` });
      res.end();
    })
    .catch(() => {
      res.clearPreviewData();
      res.writeHead(307, { Location: '/' });
      res.end();
    });
};

export default exitPreview;
