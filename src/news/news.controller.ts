import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
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
import { CreateNewsCommand, NewsQuery } from "./application";
import { ObjectId } from "mongoose";

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
  @Post("/register")
  async createNews(@User() session: SessionDto, @Body() body: CreateNewsDto) {
    return this.commandBus.execute(new CreateNewsCommand(body, session));
  }

  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({
    summary: "(테스트용)[관리자 로그인 필요] 뉴스 구독정보 리스트 조회",
  })
  @Get("/")
  async findNews(@Query("news_id") news_id: ObjectId) {
    return this.queryBus.execute(new NewsQuery(news_id));
  }
}
