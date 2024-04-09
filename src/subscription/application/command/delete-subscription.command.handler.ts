import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SubscriptionRepositoryImplement } from "src/subscription/infra/subscription.repository.implement";
import { SubscriptionInjectionToken } from "src/subscription/Injection-token";
import { DeleteSubscriptionCommand } from "..";
import CustomError from "src/common/error/custom-error";
import { RESULT_CODE } from "src/constant";

@CommandHandler(DeleteSubscriptionCommand)
export class DeleteSubscriptionCommandHandler
  implements ICommandHandler<DeleteSubscriptionCommand>
{
  constructor(
    @Inject(SubscriptionInjectionToken.SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository: SubscriptionRepositoryImplement
  ) {}

  async execute(command: DeleteSubscriptionCommand) {
    const {
      schoolId: school_id,
      session: { id: subscriber_id },
    } = command;
    const existData = await this.subscriptionRepository.findSubscription({
      school_id,
      subscriber_id,
    });
    if (!existData) throw new CustomError(RESULT_CODE.NOT_FOUND_SUBSCRIPTION);
    if (existData.delete_at)
      throw new CustomError(RESULT_CODE.ALEADY_DELETED_SUBSCRIPTION);

    return this.subscriptionRepository.deleteSubscription({
      school_id,
      subscriber_id,
    });
  }
}
