import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ResponseDto } from "src/common/responseDto/response.dto";
import { JwtAuthGuard } from "src/auth/guard";
import { CreateSchoolDto } from "./dto/create-school.dto";
import { User } from "src/common/decorators/user.decorator";
import { SessionDto } from "src/auth/dto";
import { CreateSchoolCommand } from "../application/command/create-school.command";

@ApiTags("SCHOOL")
@Controller("school")
export class SchoolController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({ summary: "[관리자 로그인 필요] 학교 등록" })
  @UseGuards(JwtAuthGuard)
  @Post("/register")
  async createNews(@User() session: SessionDto, @Body() body: CreateSchoolDto) {
    return this.commandBus.execute(new CreateSchoolCommand(body, session));
  }
}
