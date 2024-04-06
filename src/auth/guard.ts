import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AuthGuard} from '@nestjs/passport';
// import {CacheService} from 'src/cache/service/cache.service';
import {LoginType} from 'src/types/login.type';
import {PayloadType} from './jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    // private readonly cacheService: CacheService,
    private readonly jwtService: JwtService
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = request.headers['authorization'];
    /* 아래 코드는 제일 마지막의 super.canActivate(context) ... 부분과 상충되기 때문에 사용하면 안된다.*/
    // if (token && token.startsWith('Bearer ')) token = token.slice(7);
    if (!token) throw new UnauthorizedException();

    const test = this.jwtService.decode(token);
    const payload = test as PayloadType;
    
    // const token_in_redis = await this.cacheService.getCache(
    //   `${payload.type.toUpperCase()}:${payload.id}`
    // );

    // if (token !== token_in_redis)
    //   throw new CustomError(RESULT_CODE.AUTH_OTHER_LOGGED_IN);
    
    /* 추출한 토큰값(위에서 token 변수)과 실제 request받은 context를 비교하는 부분이다 */
    return super.canActivate(context) as Promise<boolean>;
  }
}
