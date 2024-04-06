import {Inject, Logger} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { User, UserDocument } from 'src/auth/infra/user.entity';
import { School, SchoolDocument } from 'src/school/infra/school.entity';
import { AuthInjectionToken } from 'src/auth/Injection-token';
import { AuthRepositoryImplement } from 'src/auth/infra/auth.repository.implement';
import {PasswordGenerator, PASSWORD_GENERATOR} from 'src/libs/password.module';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectModel(User.name) private user: Model<UserDocument>,
    @InjectModel(School.name) private school: Model<SchoolDocument>,
    @Inject(AuthInjectionToken.AUTH_REPOSITORY)
    private readonly userRepository: AuthRepositoryImplement, 
    @Inject(PASSWORD_GENERATOR)
    private readonly passwordGenerator: PasswordGenerator,
  ) {}

  async execute(command: CreateUserCommand) {
    const {body} = command;
    const {id, password, school} = body;
    // if (!admin_id) throw new CustomError(RESULT_CODE.AUTH_NEED_ADMIN);
    const passwdHash = await this.passwordGenerator.generateHash(password);

    this.logger.debug(`password = ${password}; passwdHash = ${passwdHash}`);
    
    // const admin_model = this.adminFactory.create({
    //   admin_id,
    //   type: AdminType.EMPLOYEE,
    //   password: passwdHash,
    //   nickname,
    // });
    // const admin = await this.adminRepository.save(admin_model);
    // if (!admin) throw new CustomError(RESULT_CODE.NOT_FOUND_ADMIN);
    return true;
  }
}
