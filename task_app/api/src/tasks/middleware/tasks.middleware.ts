import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TasksMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('run MDware for tasks route');
    next();
  }
}
