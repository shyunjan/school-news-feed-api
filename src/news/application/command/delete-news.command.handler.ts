import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NewsInjectionToken } from "src/news/Injection-token";
import { NewsRepositoryImplement } from "src/news/infra/news.repository.implement";
import CustomError from "src/common/error/custom-error";
import { RESULT_CODE } from "src/constant";
import { DeleteNewsCommand } from "..";

@CommandHandler(DeleteNewsCommand)
export class DeleteNewsCommandHandler
  implements ICommandHandler<DeleteNewsCommand>
{
  constructor(
    @Inject(NewsInjectionToken.NEWS_REPOSITORY)
    private readonly newsRepository: NewsRepositoryImplement
  ) {}

  async execute(command: DeleteNewsCommand) {
    const {
      newsId,
      session: { is_admin, school_id },
    } = command;
    if (!is_admin || !school_id)
      throw new CustomError(RESULT_CODE.AUTH_NEED_ADMIN);
    const existNews = await this.newsRepository.findNewsOne(newsId);
    if (!existNews) throw new CustomError(RESULT_CODE.NOT_FOUND_NEWS);
    if (String(existNews.getSchoolId()) !== String(school_id))
      throw new CustomError(RESULT_CODE.UNAUTHORIZED_NEWS);
    if (existNews.getDeleteAt())
      throw new CustomError(RESULT_CODE.ALEADY_DELETED_NEWS);

    return this.newsRepository.deleteNews(newsId);
  }
}
