import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import { FastifyReply } from 'fastify';
import {ResponseDto} from 'src/common/responseDto/response.dto';
import {CreateAdminDto, CreateUserDto, LoginUserDto} from './dto';
import { CreateUserCommand, CreateAdminCommand, LoginQuery } from './application';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOkResponse({
    type: ResponseDto,
    description: '성공',
  })
  @ApiOperation({summary: '학교관리자 가입 - 동시에 관리할 학교 정보도 받는다'})
  @Post('/register-admin')
  async createAdmin(@Body() body: CreateAdminDto) {
    return this.commandBus.execute(new CreateAdminCommand(body));
  }

  @ApiOkResponse({
    type: ResponseDto,
    description: '성공',
  })
  @ApiOperation({summary: '유저(학생) 가입'})
  @Post('/register-user')
  async createUser(@Body() body: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(body));
  }

  @ApiOkResponse({
    type: ResponseDto,
    description: '성공',
  })
  @ApiOperation({summary: '로그인'})
  @Post('/login')
  async loginUser(@Body() body: LoginUserDto, @Res({passthrough: true}) reply: FastifyReply) {
    return this.queryBus.execute(new LoginQuery(body, reply));
  }
}
