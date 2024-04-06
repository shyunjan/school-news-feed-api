import {Module, Provider} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {CqrsModule} from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { PasswordModule } from 'src/libs/password.module';
import {MongooseModule} from '@nestjs/mongoose';
import {Schema} from 'mongoose';
import { User, UserSchema } from './infra/user.entity';
import { School, SchoolSchema } from 'src/school/infra/school.entity';
import {config} from 'src/config/config';
import { AuthController } from './auth.controller';
import { AuthInjectionToken } from './Injection-token';
import { AuthRepositoryImplement } from './infra/auth.repository.implement';
import { CreateAdminCommandHandler, CreateUserCommandHandler, LoginQueryHandler } from './application';
import { SchoolModule } from 'src/school/school.module';

const application = [
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
    // PassportModule.register({defaultStrategy: 'jwt', session: false}),
    JwtModule.register({
      secret: config.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: config.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      },
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: (): Schema => UserSchema,
      },
      {
        name: School.name,
        useFactory: (): Schema => SchoolSchema,
      },
    ]),
    PasswordModule,
    SchoolModule,
  ],
  controllers: [AuthController],
  providers: [ ...application, ...infrastructure ],
  // exports: [AuthService, AuthRepository, JwtService],
  exports: [],
})
export class AuthModule {}
