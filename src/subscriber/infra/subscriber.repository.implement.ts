import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { SubscriberEntity, SubscriberDocument } from "./subscriber.entity";

export class SubscriberRepositoryImplement {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectModel(SubscriberEntity.name)
    private subscriber: Model<SubscriberDocument>
  ) {}

  async createSubscriber(subscriber: SubscriberEntity): Promise<ObjectId> {
    const doc: SubscriberDocument = new this.subscriber(subscriber);
    const result = await doc.save();
    this.logger.debug(`saved subscriber ID = ${result._id}`);
    return result._id as ObjectId;
  }
}
