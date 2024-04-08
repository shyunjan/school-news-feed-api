import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import {
  News,
  NewsEssentialProperties,
  NewsImplement,
  NewsProperties,
} from "./";

export class NewsFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: NewsEssentialProperties): News {
    return this.eventPublisher.mergeObjectContext(
      new NewsImplement({
        ...options,
        create_at: new Date(),
        update_at: new Date(),
        delete_at: null,
      })
    );
  }

  reconstitute(properties: NewsProperties): News {
    return this.eventPublisher.mergeObjectContext(
      new NewsImplement(properties)
    );
  }
}
