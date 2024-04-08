import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
// import {CacheService} from 'src/cache/service/cache.service';
import { PayloadType } from "./jwt.strategy";
import { AuthInjectionToken } from "./Injection-token";
import { AuthRepositoryImplement } from "./infra/auth.repository.implement";
import { SessionType, UserEntity } from "./infra/user.entity";
import CustomError from "src/common/error/custom-error";
import { RESULT_CODE } from "src/constant";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(
    // private readonly cacheService: CacheService,
    private readonly jwtService: JwtService,
    @Inject(AuthInjectionToken.AUTH_REPOSITORY)
    private readonly authRepository: AuthRepositoryImplement
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = request.headers["authorization"];
    if (token && token.startsWith("Bearer ")) token = token.slice(7);
    if (!token) throw new UnauthorizedException();

    const payload = this.jwtService.decode(token) as PayloadType;
    const session: SessionType = { ...payload };

    const existUser: Partial<UserEntity> =
      await this.authRepository.findUserById(session.id);
    if (!existUser) throw new CustomError(RESULT_CODE.NOT_FOUND_USER);

    // const token_in_redis = await this.cacheService.getCache(
    //   `${payload.type.toUpperCase()}:${payload.id}`
    // );

    // if (token !== token_in_redis)
    //   throw new CustomError(RESULT_CODE.AUTH_OTHER_LOGGED_IN);

    return super.canActivate(context) as Promise<boolean>;
  }
}
