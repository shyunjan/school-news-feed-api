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
      session: { id: admin_id, is_admin, school_id },
    } = command;
    if (!is_admin || !school_id)
      throw new CustomError(RESULT_CODE.AUTH_NEED_ADMIN);

    const news = await this.newsRepository.createNews({
      ...body,
      school_id,
      admin_id,
    });
    if (!news) throw new CustomError(RESULT_CODE.FAIL_TO_CREATE_NEWS);

    /* 뉴스가 생성되면 해당 뉴스 학교의 구독자들에게 생성된 뉴스번호를 전달하여 subscription-news 생성한다 */
    news.createSubscriptionNews();
  }
}
