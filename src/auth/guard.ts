import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AuthGuard} from '@nestjs/passport';
// import {CacheService} from 'src/cache/service/cache.service';
import {PayloadType} from './jwt.strategy';
import { AuthInjectionToken } from './Injection-token';
import { AuthRepositoryImplement } from './infra/auth.repository.implement';
import { User } from './infra/user.entity';
import CustomError from 'src/common/error/custom-error';
import {RESULT_CODE} from 'src/constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    // private readonly cacheService: CacheService,
    private readonly jwtService: JwtService,
    @Inject(AuthInjectionToken.AUTH_REPOSITORY)
    private readonly authRepository: AuthRepositoryImplement, 
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = request.headers['authorization'];
    if (token && token.startsWith('Bearer ')) token = token.slice(7);
    if (!token) throw new UnauthorizedException();

    const payload = this.jwtService.decode(token) as PayloadType;
    delete payload['iat']; delete payload['exp']; // 토큰 관련 메타정보를 삭제
    const session: Omit<User, "password"> = { ...payload };

    if (session.isAdmin) {
      const existUser: Partial<User> = await this.authRepository.findUserById(session.id);
      if (!existUser) throw new CustomError(RESULT_CODE.NOT_FOUND_USER);
      session.school_id = existUser.school_id;
    }

    request.body.session = session;
    
    // const token_in_redis = await this.cacheService.getCache(
    //   `${payload.type.toUpperCase()}:${payload.id}`
    // );

    // if (token !== token_in_redis)
    //   throw new CustomError(RESULT_CODE.AUTH_OTHER_LOGGED_IN);
    
    return super.canActivate(context) as Promise<boolean>;
  }
}
