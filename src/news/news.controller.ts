import {
  Body,
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ResponseDto } from "src/common/responseDto/response.dto";
import { JwtAuthGuard } from "src/auth/guard";
import { CreateNewsDto } from "./dto";
import { User } from "src/common/decorators/user.decorator";
import { SessionDto } from "src/auth/dto";
import {
  CreateNewsCommand,
  DeleteNewsCommand,
  UpdateNewsCommand,
} from "./application";
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

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({ summary: "[관리자 로그인 필요] 뉴스 수정" })
  @ApiQuery({
    name: "news_id",
    required: true,
    type: "string",
    description: "뉴스번호",
  })
  @UseGuards(JwtAuthGuard)
  @Put("/modify")
  async updateNews(
    @Query("news_id") newsId: ObjectId,
    @User() session: SessionDto,
    @Body() body: CreateNewsDto
  ) {
    return this.commandBus.execute(
      new UpdateNewsCommand(newsId, body, session)
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({ summary: "[관리자 로그인 필요] 뉴스 삭제" })
  @ApiQuery({
    name: "news_id",
    required: true,
    type: "string",
    description: "뉴스번호",
  })
  @UseGuards(JwtAuthGuard)
  @Delete("/delete")
  async deleteNews(
    @Query("news_id") newsId: ObjectId,
    @User() session: SessionDto
  ) {
    return this.commandBus.execute(new DeleteNewsCommand(newsId, session));
  }

  // @ApiOkResponse({
  //   type: ResponseDto,
  //   description: "성공",
  // })
  // @ApiOperation({
  //   summary: "(테스트용)[관리자 로그인 필요] 뉴스 구독정보 리스트 조회",
  // })
  // @Get("/")
  // async findNews(@Query("news_id") news_id: ObjectId) {
  //   return this.queryBus.execute(new NewsQuery(news_id));
  // }
}
