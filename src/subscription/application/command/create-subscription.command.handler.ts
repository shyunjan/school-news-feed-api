import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SubscriptionRepositoryImplement } from "src/subscription/infra/subscription.repository.implement";
import { SubscriptionInjectionToken } from "src/subscription/Injection-token";
import { CreateSubscriptionCommand } from "..";

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionCommandHandler
  implements ICommandHandler<CreateSubscriptionCommand>
{
  constructor(
    @Inject(SubscriptionInjectionToken.SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository: SubscriptionRepositoryImplement
  ) {}

  async execute(command: CreateSubscriptionCommand) {
    const {
      schoolId: school_id,
      session: { id: subscriber_id },
    } = command;

    /* TODO: 해당 학교 존재 여부 체크 */

    /* TODO: 중복 구독 여부 체크 */

    return this.subscriptionRepository.createSubscription({
      school_id,
      subscriber_id,
    });
  }
}
