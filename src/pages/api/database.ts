import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let method = req.method;

  if (method === 'GET') {
    // TODO: return list of database

    let page = Number(req.query.page) || 1;

    res.status(200).json({ page, databases: [] });
  }

  if (method === 'POST') {
    // TODO: create a database & return data

    let body = req.body;

    res.status(200).json(body);
  }

  if (method === 'PUT' || method === 'PATCH') {
    // TODO: update database & return data

    let id = req.query.id;

    if (!id) {
      res.status(404).json({
        message: 'Please specify an ID',
      });

      return;
    }

    let body = req.body;

    res.status(200).json(body);
  }

  if (method === 'DELETE') {
    // TODO: delete database & return data

    let id = req.query.id;

    if (!id) {
      res.status(404).json({
        message: 'Please specify an ID',
      });

      return;
    }

    res.status(200).json({
      database: {},
    });
  }
}
