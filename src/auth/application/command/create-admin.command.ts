import {ICommand} from '@nestjs/cqrs';
import {CreateAdminDto} from '../../dto/create-admin.dto';

export class CreateAdminCommand implements ICommand {
  constructor(readonly body: CreateAdminDto) {}
}
