import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSchoolCommand } from "../";
import CustomError from "src/common/error/custom-error";
import { RESULT_CODE } from "src/constant";
import { SchoolInjectionToken } from "src/school/Injection-token";
import { SchoolRepositoryImplement } from "src/school/infra/school.repository.implement";
import { AuthInjectionToken } from "src/auth/Injection-token";
import { AuthRepositoryImplement } from "src/auth/infra/auth.repository.implement";

@CommandHandler(CreateSchoolCommand)
export class CreateSchoolCommandHandler
  implements ICommandHandler<CreateSchoolCommand>
{
  constructor(
    @Inject(SchoolInjectionToken.SCHOOL_REPOSITORY)
    private readonly schoolRepository: SchoolRepositoryImplement,
    @Inject(AuthInjectionToken.AUTH_REPOSITORY)
    private readonly authRepository: AuthRepositoryImplement
  ) {}

  async execute(command: CreateSchoolCommand) {
    const {
      body,
      session: { id, is_admin, school_id },
    } = command;
    if (!is_admin) throw new CustomError(RESULT_CODE.AUTH_NEED_ADMIN);
    if (is_admin && school_id)
      throw new CustomError(RESULT_CODE.ALEADY_SCHOOL_EXISTS_IN_SESSION);

    const schoolEntityWithId = await this.schoolRepository.createSchool({
      ...body,
    });

    /**
     * 방금 생성된 학교의 _id를 현재 관리자의 유저 정보에 저장한다
     * TODO: 위의 학교 생성 프로세스(schoolRepository.createSchool)와 아래 유저 정보 업데이트
     *       프로세스(updateAdminWithSchool)를 트랜잭션 처리할 것.
     */
    await this.authRepository.updateAdminWithSchool({
      id,
      school_id: schoolEntityWithId._id,
    });

    return schoolEntityWithId;
  }
}
