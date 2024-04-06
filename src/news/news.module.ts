import {Module} from '@nestjs/common';
import { NewsController } from './news.controller';
import { JwtService } from '@nestjs/jwt';

const application = [
  JwtService,
];

@Module({
  imports: [],
  controllers: [NewsController],
  providers: [...application],
})
export class NewsModule {}
