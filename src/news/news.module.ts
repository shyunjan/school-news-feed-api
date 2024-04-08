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
import {
  CreateNewsCommandHandler,
  NewsQueryHandler,
  UpdateNewsCommandHandler,
  UpdateSubscriptionNewsEventHandler,
} from "./application";
import { SubscriptionModule } from "src/subscription/subscription.module";
import { NewsFactory } from "./domain";
import { CreateSubscriptionNewsEventHandler } from "./application";
import { SubscriptionInjectionToken } from "src/subscription/Injection-token";
import { SubscriptionRepositoryImplement } from "src/subscription/infra";

const application = [
  JwtService,
  CreateNewsCommandHandler,
  UpdateNewsCommandHandler,
  NewsQueryHandler,
  CreateSubscriptionNewsEventHandler,
  UpdateSubscriptionNewsEventHandler,
];

const infrastructure: Provider[] = [
  {
    provide: AuthInjectionToken.AUTH_REPOSITORY,
    useClass: AuthRepositoryImplement,
  },
  {
    provide: NewsInjectionToken.NEWS_REPOSITORY,
    useClass: NewsRepositoryImplement,
  },
  {
    provide: SubscriptionInjectionToken.SUBSCRIPTION_REPOSITORY,
    useClass: SubscriptionRepositoryImplement,
  },
];

const domain: Provider[] = [NewsFactory];

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
    SubscriptionModule,
  ],
  controllers: [NewsController],
  providers: [...application, ...infrastructure, ...domain],
})
export class NewsModule {}
