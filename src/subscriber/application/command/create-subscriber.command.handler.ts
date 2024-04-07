import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NewsInjectionToken } from "src/news/Injection-token";
import CustomError from "src/common/error/custom-error";
import { RESULT_CODE } from "src/constant";
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

    return this.subscriberRepository.createSubscriber({
      school_id,
      subscriber_id,
      date: new Date(),
    });
  }
}
