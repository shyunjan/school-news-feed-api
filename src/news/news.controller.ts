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
import { CreateNewsDto } from "./dto";
import { User } from "src/common/decorators/user.decorator";
import { SessionDto } from "src/auth/dto";
import { CreateNewsCommand } from "./application";

@ApiTags("NEWS")
@Controller("news")
export class NewsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({ summary: "[관리자 로그인 필요] 뉴스 등록" })
  @UseGuards(JwtAuthGuard)
  @Post("/register-news")
  async createNews(@User() session: SessionDto, @Body() body: CreateNewsDto) {
    console.debug(`body = ${JSON.stringify(body)}`);
    console.debug(`session = ${JSON.stringify(session)}`);
    return this.commandBus.execute(new CreateNewsCommand(body, session));
  }
}
