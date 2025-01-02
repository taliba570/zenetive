import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, HEAD, OPTIONS',
    );
    res.header('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }

    next();
  }
}
