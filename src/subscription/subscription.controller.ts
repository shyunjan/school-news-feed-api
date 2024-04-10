import {
  Controller,
  Delete,
  Get,
  Post,
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
import { ObjectId } from "mongoose";
import { ResponseDto } from "src/common/responseDto/response.dto";
import { JwtAuthGuard } from "src/auth/guard";
import { User } from "src/common/decorators/user.decorator";
import { SessionDto } from "src/auth/dto";
import {
  CreateSubscriptionCommand,
  DeleteSubscriptionCommand,
  SubscriptionNewsQuery,
} from "./application";
import { ParseObjectIdPipe } from "src/utils/pipe/parse-object-id.pipe";

@ApiTags("SUBSCRIPTION")
@Controller("subscription")
export class SubscriptionNewsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({ summary: "[로그인 필요] 구독 정보(학교) 등록" })
  @ApiQuery({
    name: "school_id",
    required: true,
    type: "string",
    description: "학교 번호",
  })
  @UseGuards(JwtAuthGuard)
  @Post("/register")
  async createSubscription(
    @Query("school_id", new ParseObjectIdPipe()) schoolId: ObjectId,
    @User() session: SessionDto
  ) {
    return this.commandBus.execute(
      new CreateSubscriptionCommand(schoolId, session)
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({ summary: "[로그인 필요] 구독 취소" })
  @ApiQuery({
    name: "school_id",
    required: true,
    type: "string",
    description: "학교 번호",
  })
  @UseGuards(JwtAuthGuard)
  @Delete("/cancel")
  async deleteSubscription(
    @Query("school_id", new ParseObjectIdPipe()) schoolId: ObjectId,
    @User() session: SessionDto
  ) {
    return this.commandBus.execute(
      new DeleteSubscriptionCommand(schoolId, session)
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({ summary: "[로그인 필요] 학교별 구독 뉴스 리스트 조회" })
  @ApiQuery({
    name: "school_id",
    required: true,
    type: "string",
    description: "학교 번호",
  })
  @UseGuards(JwtAuthGuard)
  @Get("/news/query")
  async findSubscriptionNews(
    @Query("school_id", new ParseObjectIdPipe()) schoolId: ObjectId,
    @User() session: SessionDto
  ) {
    return this.queryBus.execute(new SubscriptionNewsQuery(schoolId, session));
  }
}
