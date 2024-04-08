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
    this.logger.debug(`password = ${password}; passwdHash = ${passwdHash}`);
    body.password = passwdHash;

    const schoolId: ObjectId = await this.schoolRepository.createSchool(school);

    return this.authRepository.createAdmin({
      ...body,
      is_admin: true,
      school_id: schoolId,
    });
  }
}
