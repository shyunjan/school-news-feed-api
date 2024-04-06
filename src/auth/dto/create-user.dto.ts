import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {Prop} from '@nestjs/mongoose';
import {SchemaTypes} from 'mongoose';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: '관리자/학생 아이디',
    example: 'michael',
  })
  @Prop({type: SchemaTypes.String, unique: true, index: true, required: true})
  @IsNotEmpty()
  id: string;
  
  @ApiProperty({
    required: true,
    type: 'string',
    description: '패스워드',
    example: '^michael2024!',
  })
  @IsNotEmpty()
  @Prop({type: SchemaTypes.String, required: true})
  password: string;
}
