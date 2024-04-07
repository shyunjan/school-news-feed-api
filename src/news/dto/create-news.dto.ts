import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateNewsDto {
  @ApiProperty({
    required: true,
    type: "string",
    description: "뉴스 제목",
    example: "2024 하반기 학사 일정",
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
    type: "string",
    description: "뉴스 제목",
    example: "2024 하반기 학사 일정",
  })
  @IsNotEmpty()
  contents: string;
}

export interface CreateNewsType extends CreateNewsDto {}
