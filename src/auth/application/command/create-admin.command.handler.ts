import { Inject, Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ObjectId } from "mongoose";
import { AuthInjectionToken } from "src/auth/Injection-token";
import { AuthRepositoryImplement } from "src/auth/infra/auth.repository.implement";
import {
  PasswordGenerator,
  PASSWORD_GENERATOR,
} from "src/libs/password.module";
import { CreateAdminCommand } from "./create-admin.command";
import { SchoolRepositoryImplement } from "src/school/infra/school.repository.implement";
import { SchoolInjectionToken } from "src/school/Injection-token";

@CommandHandler(CreateAdminCommand)
export class CreateAdminCommandHandler
  implements ICommandHandler<CreateAdminCommand>
{
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(PASSWORD_GENERATOR)
    private readonly passwordGenerator: PasswordGenerator,
    @Inject(AuthInjectionToken.AUTH_REPOSITORY)
    private readonly authRepository: AuthRepositoryImplement,
    @Inject(SchoolInjectionToken.SCHOOL_REPOSITORY)
    private readonly schoolRepository: SchoolRepositoryImplement
  ) {}

  async execute(command: CreateAdminCommand) {
    const { body } = command;
    const { password, school } = body;
    // this.logger.debug(`id = ${password}, password = ${password}; school = ${JSON.stringify(school)}`);
    const passwdHash = await this.passwordGenerator.generateHash(body.password);
    body.password = passwdHash;

    const school_id = school
      ? (await this.schoolRepository.createSchool(school))?._id
      : undefined;

    /**
     * TODO: 위의 학교 생성 프로세스(schoolRepository.createSchool)와 아래 유저 정보 생성
     *       프로세스(createAdmin)를 트랜잭션 처리할 것.
     */
    return this.authRepository.createAdmin({
      ...body,
      is_admin: true,
      school_id,
    });
  }
}
