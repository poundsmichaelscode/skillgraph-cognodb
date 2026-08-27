import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

export function createApp(): express.Express {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.WEB_ORIGIN ?? 'http://localhost:3000',
      methods: ['GET'],
    }),
  );
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/v1/health', (_request, response) => {
    response.status(200).json({
      data: {
        status: 'ok',
        service: 'skillgraph-api',
      },
    });
  });

  return app;
}
