import {ValidateNested} from 'class-validator';
import { School } from 'src/school/infra/school.entity';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';

export class CreateAdminDto extends CreateUserDto {
  @ValidateNested()
  @Type(() => School)
  school: School; // 학교관리자 담당 학교 정보
}
