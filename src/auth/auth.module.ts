import { Module, Provider } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";
import { PasswordModule } from "src/libs/password.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Schema } from "mongoose";
import { UserEntity, UserSchema } from "./infra/user.entity";
import { config } from "src/config/config";
import { AuthController } from "./auth.controller";
import { AuthInjectionToken } from "./Injection-token";
import { AuthRepositoryImplement } from "./infra/auth.repository.implement";
import {
  CreateAdminCommandHandler,
  CreateUserCommandHandler,
  LoginQueryHandler,
} from "./application";
import { SchoolModule } from "src/school/school.module";
import { JwtStrategy } from "./jwt.strategy";

const application = [
  JwtStrategy,
  JwtService,
  CreateAdminCommandHandler,
  CreateUserCommandHandler,
  LoginQueryHandler,
];

const infrastructure: Provider[] = [
  {
    provide: AuthInjectionToken.AUTH_REPOSITORY,
    useClass: AuthRepositoryImplement,
  },
];

@Module({
  imports: [
    CqrsModule,
    JwtModule.register({
      secret: config.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: config.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      },
    }),
    MongooseModule.forFeatureAsync([
      {
        name: UserEntity.name,
        useFactory: (): Schema => UserSchema,
      },
    ]),
    PasswordModule,
    SchoolModule,
  ],
  controllers: [AuthController],
  providers: [...application, ...infrastructure],
  exports: [JwtStrategy, JwtService, MongooseModule, ...infrastructure],
})
export class AuthModule {}
