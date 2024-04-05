import {Module, Provider} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {CqrsModule} from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { PasswordModule } from 'src/libs/password.module';
import {config} from 'src/config/config';
import { AuthController } from './auth.controller';
import { AuthInjectionToken } from './Injection-token';
import { UserRepositoryImplement } from './user.repository.implement';
import { CreateAdminCommandHandler, CreateUserCommandHandler } from './application';

const application = [
  // JwtStrategy,
  // JwtService,
  CreateAdminCommandHandler,
  CreateUserCommandHandler,
  // LoginQueryHandler,
  // LoginAdminQueryHandler,
  // CheckDuplicatedIdQueryHandler,
];

const infrastructure: Provider[] = [
  {
    provide: AuthInjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
];

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({defaultStrategy: 'jwt', session: false}),
    JwtModule.register({
      secret: config.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: config.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      },
    }),
    PasswordModule,
  ],
  controllers: [AuthController],
  providers: [ ...application, ...infrastructure ],
  // exports: [AuthService, AuthRepository, JwtService],
  exports: [],
})
export class AuthModule {}
