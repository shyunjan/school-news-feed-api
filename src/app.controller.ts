import {Controller, Get} from '@nestjs/common';
@Controller()
export class AppController {
  @Get('/')
  healthCheck(): string {
    return 'School News Feed Service API Server Is Running!';
  }

  @Get('/welcome')
  welcome(): string {
    return 'Welcome to School News Feed Service API Server';
  }
}
