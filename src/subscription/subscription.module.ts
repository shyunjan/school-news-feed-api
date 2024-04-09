import { Module, Provider } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { Schema } from "mongoose";
import { SubscriptionNewsController } from "./subscription.controller";
import { AuthModule } from "src/auth/auth.module";
import { SubscriptionInjectionToken } from "./Injection-token";
import {
  SubscriptionEntity,
  SubscriptionSchema,
  SubscriptionRepositoryImplement,
  SubscriptionNewsEntity,
  SubscriptionNewsSchema,
} from "./infra";
import { AuthInjectionToken } from "src/auth/Injection-token";
import { AuthRepositoryImplement } from "src/auth/infra/auth.repository.implement";
import {
  CreateSubscriptionCommandHandler,
  DeleteSubscriptionCommandHandler,
} from "./application";

const application = [
  JwtService,
  CreateSubscriptionCommandHandler,
  DeleteSubscriptionCommandHandler,
];

const infrastructure: Provider[] = [
  {
    provide: AuthInjectionToken.AUTH_REPOSITORY,
    useClass: AuthRepositoryImplement,
  },
  {
    provide: SubscriptionInjectionToken.SUBSCRIPTION_REPOSITORY,
    useClass: SubscriptionRepositoryImplement,
  },
];

@Module({
  imports: [
    CqrsModule,
    AuthModule,
    MongooseModule.forFeatureAsync([
      {
        name: SubscriptionEntity.name,
        useFactory: (): Schema => SubscriptionSchema,
      },
      {
        name: SubscriptionNewsEntity.name,
        useFactory: (): Schema => SubscriptionNewsSchema,
      },
    ]),
  ],
  controllers: [SubscriptionNewsController],
  providers: [...application, ...infrastructure],
  exports: [MongooseModule],
})
export class SubscriptionModule {}
