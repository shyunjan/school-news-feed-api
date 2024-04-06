import {Inject} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {JwtService} from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import CustomError from 'src/common/error/custom-error';
import {RESULT_CODE} from 'src/constant';
import {LoginQuery} from './login.query';
import {config} from 'src/config/config';
import { AuthInjectionToken } from 'src/auth/Injection-token';
import { AuthRepositoryImplement } from 'src/auth/infra/auth.repository.implement';

@QueryHandler(LoginQuery)
export class LoginQueryHandler implements IQueryHandler<LoginQuery> {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly cacheService: CacheService
    @Inject(AuthInjectionToken.AUTH_REPOSITORY)
    private readonly authRepository: AuthRepositoryImplement, 
  ) {}

  async execute(query: LoginQuery) {
    const {body: {id, password}, reply} = query;
    const user = await this.authRepository.findUserById(id);
    if (!user) throw new CustomError(RESULT_CODE.NOT_FOUND_USER);
    const bcrypt_password = await bcrypt.compare(password, user.password);
    if (!bcrypt_password) throw new CustomError(RESULT_CODE.AUTH_INVALID_USER_PASSWORD);

    const access_token = await this.jwtService.signAsync(
      {
        id: user.id,
        isAdmin: user.isAdmin,
        schoolId: user.school_id,
      },
      // {
      //   secret: config.JWT_ACCESS_TOKEN_SECRET,
      //   expiresIn: config.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      // }
    );
    // await this.cacheService.setCache(`USER:${user.id}`, access_token, 0);

    const expTime = config.JWT_ACCESS_TOKEN_EXPIRATION_TIME ?? '0';
    const expireDate = new Date(Date.now() + Number(expTime.replace('h', '')) * 60 * 60 * 1000);
    reply.setCookie('authorization', access_token, {
      path: '/',
      httpOnly: true,
      secure: config.MODE !== 'local' ? true : false,
      sameSite: 'none',
      expires: expireDate
    });
    
    return access_token;
  }
}
