import { Module, Provider } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { Schema } from "mongoose";
import { NewsController } from "./news.controller";
import { AuthModule } from "src/auth/auth.module";
import { NewsInjectionToken } from "./Injection-token";
import { NewsRepositoryImplement } from "./infra/news.repository.implement";
import { NewsEntity, NewsSchema } from "./infra/news.entity";
import { AuthInjectionToken } from "src/auth/Injection-token";
import { AuthRepositoryImplement } from "src/auth/infra/auth.repository.implement";
import { CreateNewsCommandHandler } from "./application";

const application = [JwtService, CreateNewsCommandHandler];

const infrastructure: Provider[] = [
  {
    provide: AuthInjectionToken.AUTH_REPOSITORY,
    useClass: AuthRepositoryImplement,
  },
  {
    provide: NewsInjectionToken.NEWS_REPOSITORY,
    useClass: NewsRepositoryImplement,
  },
];

@Module({
  imports: [
    CqrsModule,
    AuthModule,
    MongooseModule.forFeatureAsync([
      {
        name: NewsEntity.name,
        useFactory: (): Schema => NewsSchema,
      },
    ]),
  ],
  controllers: [NewsController],
  providers: [...application, ...infrastructure],
})
export class NewsModule {}
