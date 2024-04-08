import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import {} from "./subscription.entity";
import {
  SubscriptionEntity,
  SubscriptionDocument,
  SubscriptionNewsEntity,
} from ".";

export class SubscriptionRepositoryImplement {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectModel(SubscriptionEntity.name)
    private subscription: Model<SubscriptionDocument>
  ) {}

  async createSubscription(
    subscription: SubscriptionEntity
  ): Promise<ObjectId> {
    const doc: SubscriptionDocument = new this.subscription(subscription);
    const subscriptionDoc = (await doc.save()).toObject();
    this.logger.debug(`saved subscription ID = ${subscriptionDoc._id}`);
    return subscriptionDoc;
  }

  async createSubscriptionNews(entities: SubscriptionNewsEntity[]) {
    this.logger.debug(`entities = ${JSON.stringify(entities)}`);
  }
}
