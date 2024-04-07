import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SubscriberRepositoryImplement } from "src/subscriber/infra/subscriber.repository.implement";
import { SubscriberInjectionToken } from "src/subscriber/Injection-token";
import { CreateSubscriberCommand } from "..";

@CommandHandler(CreateSubscriberCommand)
export class CreateSubscriberCommandHandler
  implements ICommandHandler<CreateSubscriberCommand>
{
  constructor(
    @Inject(SubscriberInjectionToken.SUBSCRIBER_REPOSITORY)
    private readonly subscriberRepository: SubscriberRepositoryImplement
  ) {}

  async execute(command: CreateSubscriberCommand) {
    const {
      schoolId: school_id,
      session: { id: subscriber_id },
    } = command;

    /* TODO: 중복 구독 여부를 체크할 것 */

    return this.subscriberRepository.createSubscriber({
      school_id,
      subscriber_id,
      date: new Date(),
    });
  }
}
