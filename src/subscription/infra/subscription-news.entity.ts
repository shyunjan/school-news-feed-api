import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";
import { BaseEntity } from "src/common/entity/base.entity";

@Schema({ collection: "subscription-news" })
export class SubscriptionNewsEntity extends BaseEntity {
  @Prop({ type: SchemaTypes.ObjectId, index: true, required: true })
  subscription_id: ObjectId; // 구독 번호

  @Prop({ type: SchemaTypes.ObjectId, index: true, required: true })
  news_id: ObjectId; // 뉴스 번호

  @Prop({ type: SchemaTypes.Boolean, required: false, default: false })
  is_read: boolean = false; // 열람 여부
}

export type SubscriptionNewsDocument = SubscriptionNewsEntity & Document;
export const SubscriptionNewsSchema = SchemaFactory.createForClass(
  SubscriptionNewsEntity
);
