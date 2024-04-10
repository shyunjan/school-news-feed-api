import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";
import { CreateNewsType } from "../dto";
import { BaseEntity } from "src/common/entity/base.entity";

@Schema({ collection: "news" })
export class NewsEntity extends BaseEntity implements CreateNewsType {
  @Prop({ type: SchemaTypes.String, required: true })
  title: string;

  @Prop({ type: SchemaTypes.String, required: true })
  contents: string;

  @Prop({ type: SchemaTypes.ObjectId, index: true, required: true })
  school_id: ObjectId; // 학교 번호. 관리자의 세션 정보로부터 입력받는다

  @Prop({ type: SchemaTypes.String, required: true })
  admin_id: string; // 관리자 아이디. 세션 정보로부터 입력받는다
}

export type NewsDocument = NewsEntity & Document;
export const NewsSchema = SchemaFactory.createForClass(NewsEntity);
// NewsSchema.index({'menu_list.group_id': 1}); // Nested Object의 필드에 인덱스를 거는 법
