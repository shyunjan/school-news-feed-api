import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import CustomError from "src/common/error/custom-error";
import { RESULT_CODE } from "src/constant";
import { config } from "src/config/config";
import { AuthRepositoryImplement } from "./infra/auth.repository.implement";
import { AuthInjectionToken } from "./Injection-token";
import { SessionType, UserEntity } from "./infra/user.entity";

export type PayloadType = {
  id: string;
  isAdmin: boolean;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthInjectionToken.AUTH_REPOSITORY)
    private readonly authRepository: AuthRepositoryImplement
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: ExtractJwt.fromHeader('authorization'), // 이 경우는 'Bearer '를 토큰 앞에 붙이면 안된다
      ignoreExpiration: false,
      secretOrKey: config.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: PayloadType) {
    const { id } = payload;
    const existUser: Partial<UserEntity> =
      await this.authRepository.findUserById(id);
    if (!existUser) throw new CustomError(RESULT_CODE.NOT_FOUND_USER);

    delete payload["iat"]; // 토큰 관련 메타정보를 삭제
    delete payload["exp"];
    const session: SessionType = { ...payload, school_id: existUser.school_id };
    return session;
  }
}
