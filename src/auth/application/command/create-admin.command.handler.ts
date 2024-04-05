import {Inject, Logger} from '@nestjs/common';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import { AuthInjectionToken } from 'src/auth/Injection-token';
import { UserRepositoryImplement } from 'src/auth/user.repository.implement';
import {PasswordGenerator, PASSWORD_GENERATOR} from 'src/libs/password.module';
import {CreateAdminCommand} from './create-admin.command';
import CustomError from 'src/common/error/custom-error';
import {RESULT_CODE} from 'src/constant';

@CommandHandler(CreateAdminCommand)
export class CreateAdminCommandHandler
  implements ICommandHandler<CreateAdminCommand>
{
  private readonly logger = new Logger(this.constructor.name);

  @Inject(AuthInjectionToken.USER_REPOSITORY)
  private readonly adminRepository: UserRepositoryImplement;

  @Inject(PASSWORD_GENERATOR)
  private readonly passwordGenerator: PasswordGenerator;

  async execute(command: CreateAdminCommand) {
    const {body} = command;
    const {password, admin_id, school_name} = body;
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
