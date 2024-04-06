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
import {CommandBus} from '@nestjs/cqrs';
import {ResponseDto} from 'src/common/responseDto/response.dto';
import {CreateAdminDto} from './dto/create-admin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAdminCommand } from './application/command/create-admin.command';
import { CreateUserCommand } from './application/command/create-user.command';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
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
}
