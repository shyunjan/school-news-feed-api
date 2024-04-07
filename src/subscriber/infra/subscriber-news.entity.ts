import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";

@Schema({ collection: "subscriber-news" })
export class SubscriberNewsEntity {
  @Prop({ type: SchemaTypes.ObjectId, index: true, required: true })
  subscription_id: ObjectId; // 구독 번호

  @Prop({ type: SchemaTypes.ObjectId, index: true, required: true })
  news_id: ObjectId; // 뉴스 번호

  @Prop({ type: SchemaTypes.Boolean, index: false, required: false })
  read: boolean = false; // 열람 여부
}

export type SubscriberNewsDocument = SubscriberNewsEntity & Document;
export const SubscriberNewsSchema =
  SchemaFactory.createForClass(SubscriberNewsEntity);
