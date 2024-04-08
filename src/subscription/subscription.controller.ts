import {
  Controller,
  ParseEnumPipe,
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
import { CreateSubscriptionCommand } from "./application";

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
    @Query("school_id") school_id: ObjectId,
    @User() session: SessionDto
  ) {
    console.debug(`school_id = ${JSON.stringify(school_id)}`);
    console.debug(`session = ${JSON.stringify(session)}`);
    return this.commandBus.execute(
      new CreateSubscriptionCommand(school_id, session)
    );
  }
}
