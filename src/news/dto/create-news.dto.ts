import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Prop } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

export class CreateNewsDto {
  @ApiProperty({
    required: true,
    type: "string",
    description: "뉴스 제목",
    example: "2024 하반기 학사 일정",
  })
  @IsNotEmpty()
  @Prop({ type: SchemaTypes.String, required: true })
  title: string;

  @ApiProperty({
    required: true,
    type: "string",
    description: "뉴스 제목",
    example: "2024 하반기 학사 일정",
  })
  @IsNotEmpty()
  @Prop({ type: SchemaTypes.String, required: true })
  contents: string;
}
