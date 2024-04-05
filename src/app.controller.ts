import {Controller, Get} from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  healthCheck(): string {
    return 'Order Planet Core Server Is Running!';
  }
}
