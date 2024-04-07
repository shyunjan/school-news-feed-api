import { Module, Provider } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { Schema } from "mongoose";
import { SubscriberNewsController } from "./subscriber.controller";
import { AuthModule } from "src/auth/auth.module";
import { SubscriberInjectionToken } from "./Injection-token";
import {
  SubscriberEntity,
  SubscriberSchema,
  SubscriberRepositoryImplement,
  SubscriberNewsEntity,
  SubscriberNewsSchema,
} from "./infra";
import { AuthInjectionToken } from "src/auth/Injection-token";
import { AuthRepositoryImplement } from "src/auth/infra/auth.repository.implement";
import { CreateSubscriberCommandHandler } from "./application";

const application = [JwtService, CreateSubscriberCommandHandler];

const infrastructure: Provider[] = [
  {
    provide: AuthInjectionToken.AUTH_REPOSITORY,
    useClass: AuthRepositoryImplement,
  },
  {
    provide: SubscriberInjectionToken.SUBSCRIBER_REPOSITORY,
    useClass: SubscriberRepositoryImplement,
  },
];

@Module({
  imports: [
    CqrsModule,
    AuthModule,
    MongooseModule.forFeatureAsync([
      {
        name: SubscriberEntity.name,
        useFactory: (): Schema => SubscriberSchema,
      },
      {
        name: SubscriberNewsEntity.name,
        useFactory: (): Schema => SubscriberNewsSchema,
      },
    ]),
  ],
  controllers: [SubscriberNewsController],
  providers: [...application, ...infrastructure],
})
export class SubscriberModule {}
