import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, ObjectId } from "mongoose";
import { CreateSubscriberDto, CreateSubscriberType } from "../dto";
import { BaseEntity } from "src/common/entity/base.entity";

@Schema({ collection: "subscriber" })
export class SubscriberEntity
  extends BaseEntity
  implements CreateSubscriberType
{
  @Prop({ type: SchemaTypes.ObjectId, index: true, required: true })
  school_id: ObjectId; // 학교 번호

  @Prop({ type: SchemaTypes.String, index: true, required: true })
  subscriber_id: string; // 구독자 아이디. 세션 정보로부터 입력받는다
}

export type SubscriberDocument = SubscriberEntity & Document;
export const SubscriberSchema = SchemaFactory.createForClass(SubscriberEntity);
// SubscriberSchema.index({'menu_list.group_id': 1}); // Nested Object의 필드에 인덱스를 거는 법
