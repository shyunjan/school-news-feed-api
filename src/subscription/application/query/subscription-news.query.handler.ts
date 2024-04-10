import {Inject} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {SubscriptionNewsQuery} from '..';
import {SubscriptionInjectionToken} from 'src/subscription/Injection-token';
import {SubscriptionRepositoryImplement} from 'src/subscription/infra';
import CustomError from 'src/common/error/custom-error';
import {RESULT_CODE} from 'src/constant';

@QueryHandler(SubscriptionNewsQuery)
export class SubscriptionNewsQueryHandler implements IQueryHandler<SubscriptionNewsQuery> {
  constructor(
    @Inject(SubscriptionInjectionToken.SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository: SubscriptionRepositoryImplement
  ) {}

  async execute(query: SubscriptionNewsQuery) {
    const {
      session: {id: subscriberId},
      subscriptionNewsId,
    } = query;

    const news = await this.subscriptionRepository.findSubscriptionNews(subscriptionNewsId);
    if (!news) throw new CustomError(RESULT_CODE.NOT_FOUND_NEWS);
    if (String(news.subscriber_id) !== String(subscriberId))
      throw new CustomError(RESULT_CODE.UNAUTHORIZED_NEWS);

    // 열람한 구독함-뉴스는 열람여부(is_read)를 true로 설정한다.
    const updateResult = await this.subscriptionRepository.updateSubscriptionNewsRead(
      {_id: news._id},
      true
    );
    if (updateResult?.modifiedCount) news.is_read = true;

    return news;
  }
}
