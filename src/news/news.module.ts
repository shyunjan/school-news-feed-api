import {Module, Provider} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsController } from './news.controller';
import { AuthInjectionToken } from 'src/auth/Injection-token';
import { AuthRepositoryImplement } from 'src/auth/infra/auth.repository.implement';
import { AuthModule } from 'src/auth/auth.module';

const application = [
  JwtService,
];

const infrastructure: Provider[] = [
  {
    provide: AuthInjectionToken.AUTH_REPOSITORY,
    useClass: AuthRepositoryImplement,
  },
];

@Module({
  imports: [
    AuthModule
  ],
  controllers: [NewsController],
  providers: [...application, ...infrastructure],
})
export class NewsModule {}
