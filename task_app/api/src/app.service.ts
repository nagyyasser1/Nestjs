import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'welcome nagy ! , i hope you doing well ? lets learn nest together.';
  }
}
