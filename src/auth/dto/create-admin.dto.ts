import { IsOptional, ValidateNested } from "class-validator";
import { SchoolEntity } from "src/school/infra/school.entity";
import { CreateUserDto } from "./create-user.dto";
import { Type } from "class-transformer";

export class CreateAdminDto extends CreateUserDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => SchoolEntity)
  school?: SchoolEntity; // 학교관리자 담당 학교 정보
}
