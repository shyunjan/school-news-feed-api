import {
  Body,
  Controller,
  Delete,
  Get,
  ParseEnumPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {ResponseDto} from 'src/common/responseDto/response.dto';
import {CreateAdminDto} from './dto/create-admin.dto';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import { CreateAdminCommand } from './application/command/create-admin.command';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  // @ApiOkResponse({
  //   type: ResponseDto,
  //   description: '성공',
  // })
  // @ApiOperation({summary: '회원가입'})
  // @Post('/user-register')
  // async createUser(@Body() body: CreateUserDto) {
  //   return this.commandBus.execute(new CreateUserCommand(body));
  // }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ResponseDto,
    description: '성공',
  })
  @ApiOperation({summary: '관리자 가입'})
  @Post('/admin-register')
  async createAdmin(@Body() body: CreateAdminDto) {
    return this.commandBus.execute(new CreateAdminCommand(body));
  }
}
