import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {ResponseDto} from 'src/common/responseDto/response.dto';
import { JwtAuthGuard } from 'src/auth/guard';

@ApiTags('NEWS')
@Controller('news')
export class NewsController {
  constructor(
    // private readonly commandBus: CommandBus,
    // private readonly queryBus: QueryBus,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ResponseDto,
    description: '성공',
  })
  @ApiOperation({summary: '[관리자 로그인 필요] 뉴스 등록'})
  @UseGuards(JwtAuthGuard)
  @Post('/register-news')
  async createNews(@Body() body: any) {
    console.debug(`body = ${JSON.stringify(body)}`);
    return 'Your session is verfied.';
  }

}
