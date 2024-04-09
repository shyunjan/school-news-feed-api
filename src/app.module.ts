import {
  Global,
  MiddlewareConsumer,
  Module,
  OnApplicationBootstrap,
} from "@nestjs/common";
import { Server } from "node:http";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { PasswordModule } from "./libs/password.module";
import { config } from "src/config/config";
import { AuthModule } from "./auth/auth.module";
import { NewsModule } from "./news/news.module";
import { SubscriptionModule } from "./subscription/subscription.module";
import { SchoolModule } from "./school/school.module";

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_DB_URL as string),
    PasswordModule,
    AuthModule,
    SchoolModule,
    NewsModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly refHost: HttpAdapterHost<AbstractHttpAdapter>) {}

  onApplicationBootstrap() {
    const server: Server = this.refHost.httpAdapter.getHttpServer();
    server.keepAliveTimeout = 61 * 1000;
    server.headersTimeout = 65 * 1000;
  }
}
