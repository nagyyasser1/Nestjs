import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('RequestLoggerMiddleware');

  use(req: Request, res: Response, next: NextFunction) {
    // Log request information
    this.logger.log(`Request ${req.method} ${req.originalUrl}`);

    this.logger.debug(`Headers: ${JSON.stringify(req.headers)}`);
    this.logger.debug(`Query Parameters: ${JSON.stringify(req.query)}`);

    next();
  }
}
