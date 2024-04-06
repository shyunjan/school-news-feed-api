import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, SchemaTypes} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

@Schema({collection: 'school'})
export class School {
  // @Prop({type: SchemaTypes.String, _id: true, required: true})
  // _id?: string; // 학교번호

  @ApiProperty({
    required: true,
    type: 'string',
    description: '지역이름',
    example: '부산',
  })
  @IsNotEmpty()
  @Prop({type: SchemaTypes.String, required: true})
  region: string; // 지역명. TODO: 나중에 enum 타입으로 바꿀 것

  @ApiProperty({
    required: true,
    type: 'string',
    description: '학교이름',
    example: '부경대학교',
  })
  @IsNotEmpty()
  @Prop({type: SchemaTypes.String, required: true})
  name: string; // 학교명
}

export type SchoolDocument = School & Document;
export const SchoolSchema = SchemaFactory.createForClass(School);
// SchoolSchema.index({'menu_list.group_id': 1});
