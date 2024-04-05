import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({description: '어드민 아이디', required: true})
  @IsNotEmpty()
  admin_id: string;
  
  @ApiProperty({description: '패스워드', required: true})
  @IsNotEmpty()
  password: string;
  
  @ApiProperty({description: '학교명', required: true})
  @IsNotEmpty()
  school_name: string;
}
