import { Inject, Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthInjectionToken } from "src/auth/Injection-token";
import { AuthRepositoryImplement } from "src/auth/infra/auth.repository.implement";
import {
  PasswordGenerator,
  PASSWORD_GENERATOR,
} from "src/libs/password.module";
import { CreateUserCommand } from "./create-user.command";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(AuthInjectionToken.AUTH_REPOSITORY)
    private readonly authRepository: AuthRepositoryImplement,
    @Inject(PASSWORD_GENERATOR)
    private readonly passwordGenerator: PasswordGenerator
  ) {}

  async execute(command: CreateUserCommand) {
    const { body } = command;
    const { password } = body;
    const passwdHash = await this.passwordGenerator.generateHash(password);
    body.password = passwdHash;

    return this.authRepository.createUser({ ...body, is_admin: false });
  }
}
