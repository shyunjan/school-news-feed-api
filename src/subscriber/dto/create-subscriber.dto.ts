import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Prop } from "@nestjs/mongoose";
import { SchemaTypes, ObjectId } from "mongoose";

export class CreateSubscriberDto {
  @ApiProperty({
    required: true,
    type: "string",
    description: "학교 번호",
    example: "66113ffd08aa75083058ce89",
  })
  @IsNotEmpty()
  @Prop({ type: SchemaTypes.ObjectId, index: true, required: true })
  school_id: ObjectId; // 학교 번호
}

export interface CreateSubscriberType extends CreateSubscriberDto {}
