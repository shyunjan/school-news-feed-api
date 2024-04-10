import {Inject} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {SubscriptionNewsListQuery} from '..';
import {SubscriptionInjectionToken} from 'src/subscription/Injection-token';
import {SubscriptionRepositoryImplement} from 'src/subscription/infra';

@QueryHandler(SubscriptionNewsListQuery)
export class SubscriptionNewsListQueryHandler implements IQueryHandler<SubscriptionNewsListQuery> {
  constructor(
    @Inject(SubscriptionInjectionToken.SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository: SubscriptionRepositoryImplement
  ) {}

  async execute(query: SubscriptionNewsListQuery) {
    const {
      session: {id: subscriberId},
      schoolId,
    } = query;

    return this.subscriptionRepository.findSubscriptionNewsList(subscriberId, schoolId);
  }
}
