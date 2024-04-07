import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateNewsCommand } from "./create-news.command";
import { NewsInjectionToken } from "src/news/Injection-token";
import { NewsRepositoryImplement } from "src/news/infra/news.repository.implement";
import CustomError from "src/common/error/custom-error";
import { RESULT_CODE } from "src/constant";

@CommandHandler(CreateNewsCommand)
export class CreateNewsCommandHandler
  implements ICommandHandler<CreateNewsCommand>
{
  constructor(
    @Inject(NewsInjectionToken.NEWS_REPOSITORY)
    private readonly newsRepository: NewsRepositoryImplement
  ) {}

  async execute(command: CreateNewsCommand) {
    const {
      body,
      session: { id: admin_id, isAdmin, school_id },
    } = command;
    if (!isAdmin) throw new CustomError(RESULT_CODE.AUTH_NEED_ADMIN);
    return this.newsRepository.createNews({ ...body, school_id, admin_id });
  }
}
