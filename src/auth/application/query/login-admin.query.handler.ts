import {Inject} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {JwtService} from '@nestjs/jwt';
import {InjectionToken} from 'src/auth/application/Injection-token';
import {CacheService} from 'src/cache/service/cache.service';
import CustomError from 'src/common/error/custom-error';
import {RESULT_CODE} from 'src/constant';
import {AdminType, LoginType} from 'src/types/login.type';
import {AdminQuery} from './admin.query';
import {LoginAdminQuery} from './login-admin.query';
import bcrypt from 'bcrypt';
import {config} from 'src/config/config';

@QueryHandler(LoginAdminQuery)
export class LoginAdminQueryHandler implements IQueryHandler<LoginAdminQuery> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService
  ) {}

  @Inject(InjectionToken.ADMIN_QUERY) readonly adminQuery: AdminQuery;
  async execute(query: LoginAdminQuery) {
    const {type, body} = query;
    const {access_id, admin_id} = body;
    if (type === AdminType.EMPLOYEE && !access_id)
      throw new CustomError(RESULT_CODE.AUTH_NEED_ACCESS_ID);
    if (!admin_id) throw new CustomError(RESULT_CODE.AUTH_NEED_ADMIN_ID);
    const admin = await this.adminQuery.login(type, access_id, admin_id);
    if (!admin) throw new CustomError(RESULT_CODE.NOT_FOUND_USER);
    const bcryptPassWord = await bcrypt.compare(body.password, admin.password);
    if (!bcryptPassWord)
      throw new CustomError(RESULT_CODE.AUTH_INVALID_USER_PASSWORD);
    const access_token = await this.jwtService.signAsync(
      {
        type: admin.type === 'MASTER' ? LoginType.MASTER : LoginType.EMPLOYEE,
        id: admin.id,
        signname: admin.admin_id,
      },
      {
        secret: config.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: config.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      }
    );
    await this.cacheService.setCache(
      `${admin.type === 'MASTER' ? LoginType.MASTER : LoginType.EMPLOYEE}:${
        admin.id
      }`,
      access_token,
      0
    );
    return access_token;
  }
}
