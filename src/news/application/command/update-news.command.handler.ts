import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NewsInjectionToken } from "src/news/Injection-token";
import { NewsRepositoryImplement } from "src/news/infra/news.repository.implement";
import CustomError from "src/common/error/custom-error";
import { RESULT_CODE } from "src/constant";
import { UpdateNewsCommand } from "../";

@CommandHandler(UpdateNewsCommand)
export class UpdateNewsCommandHandler
  implements ICommandHandler<UpdateNewsCommand>
{
  constructor(
    @Inject(NewsInjectionToken.NEWS_REPOSITORY)
    private readonly newsRepository: NewsRepositoryImplement
  ) {}

  async execute(command: UpdateNewsCommand) {
    const {
      newsId,
      body,
      session: { is_admin, school_id },
    } = command;
    if (!is_admin) throw new CustomError(RESULT_CODE.AUTH_NEED_ADMIN);
    if (!school_id)
      throw new CustomError(RESULT_CODE.NOT_FOUND_SCHOOL_IN_SESSION);

    const existNews = await this.newsRepository.findNewsOne(newsId);
    if (!existNews) throw new CustomError(RESULT_CODE.NOT_FOUND_NEWS);
    if (String(existNews.getSchoolId()) !== String(school_id))
      throw new CustomError(RESULT_CODE.UNAUTHORIZED_NEWS);

    const news = await this.newsRepository.updateNews(newsId, body);
    /* 뉴스가 수정되면 해당 구독정보-뉴스(subscription-news)의 읽음여부(is_read)를 전부 false로 업데이트한다 */
    news!.updateSubscriptionNews();
    return news;
  }
}
