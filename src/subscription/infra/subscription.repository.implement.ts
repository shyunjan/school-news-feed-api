import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import {} from "./subscription.entity";
import {
  SubscriptionEntity,
  SubscriptionDocument,
  SubscriptionNewsEntity,
  SubscriptionNewsDocument,
} from ".";

export class SubscriptionRepositoryImplement {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectModel(SubscriptionEntity.name)
    private subscription: Model<SubscriptionDocument>,
    @InjectModel(SubscriptionNewsEntity.name)
    private subscriptionNews: Model<SubscriptionNewsDocument>
  ) {}

  async createSubscription(
    subscription: SubscriptionEntity
  ): Promise<ObjectId> {
    const doc: SubscriptionDocument = new this.subscription(subscription);
    const subscriptionDoc = (await doc.save()).toObject();
    this.logger.debug(`saved subscription ID = ${subscriptionDoc._id}`);
    return subscriptionDoc;
  }

  async createSubscriptionNews(
    entities: SubscriptionNewsEntity[]
  ): Promise<SubscriptionNewsDocument[]> {
    return (await this.subscriptionNews.insertMany(entities)).map((doc) =>
      doc.toObject()
    ) as SubscriptionNewsDocument[];
  }

  async updateSubscriptionNews(newsId: ObjectId) {
    return this.subscriptionNews.updateMany({ is_read: false });
  }
}
