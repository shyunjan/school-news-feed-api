import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AllSchoolQuery } from "./all-school.query";
import { SchoolInjectionToken } from "src/school/Injection-token";
import { SchoolRepositoryImplement } from "src/school/infra/school.repository.implement";

@QueryHandler(AllSchoolQuery)
export class AllSchoolQueryHandler implements IQueryHandler<AllSchoolQuery> {
  constructor(
    @Inject(SchoolInjectionToken.SCHOOL_REPOSITORY)
    private readonly schoolRepository: SchoolRepositoryImplement
  ) {}

  async execute() {
    return this.schoolRepository.findAllSchool();
  }
}
