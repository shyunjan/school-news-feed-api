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
import CustomError from "src/common/error/custom-error";
import { RESULT_CODE } from "src/constant";

export class SubscriptionRepositoryImplement {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectModel(SubscriptionEntity.name)
    private subscription: Model<SubscriptionDocument>,
    @InjectModel(SubscriptionNewsEntity.name)
    private subscriptionNews: Model<SubscriptionNewsDocument>
  ) {}

  async findSubscription(param: SubscriptionEntity) {
    return this.subscription.findOne({
      subscriber_id: param.subscriber_id,
      school_id: param.school_id,
    });
  }

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

  async deleteSubscription(
    param: SubscriptionEntity
  ): Promise<SubscriptionEntity> {
    const result = await this.subscription.updateOne(
      { subscriber_id: param.subscriber_id, school_id: param.school_id },
      { delete_at: new Date() }
    );
    if (!result.modifiedCount)
      throw new CustomError(RESULT_CODE.FAIL_TO_DELETE_SUBSCRIPTION);

    const subscription = await this.findSubscription(param);
    this.logger.debug(`deleted subscription ID = ${subscription?._id}`);
    return subscription?.toObject() as SubscriptionEntity;
  }
}
