import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import { CreateSubscriberDto } from "../dto";

@Schema({ collection: "subscriber" })
export class SubscriberEntity extends CreateSubscriberDto {
  @Prop({ type: SchemaTypes.String, required: true })
  subscriber_id: string; // 구독자 아이디. 세션 정보로부터 입력받는다

  @Prop({ type: SchemaTypes.Date, required: true })
  date: Date; // 구독일자
}

export type SubscriberDocument = SubscriberEntity & Document;
export const SubscriberSchema = SchemaFactory.createForClass(SubscriberEntity);
// SubscriberSchema.index({'menu_list.group_id': 1}); // Nested Object의 필드에 인덱스를 거는 법
