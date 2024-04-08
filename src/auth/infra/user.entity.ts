import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";

@Schema({ collection: "user" })
export class UserEntity extends CreateUserDto {
  // @Prop({type: SchemaTypes.String, _id: true, required: true})
  // _id!: string; // 사용자번호

  @Prop({ type: SchemaTypes.Boolean, required: true })
  is_admin: boolean = false; // 관리자 / 일반유저(학생) 여부

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  school_id?: ObjectId; // 관리자일 경우 관리 학교 번호
}

export type UserDocument = UserEntity & Document;
export const UserSchema = SchemaFactory.createForClass(UserEntity);
export interface SessionType extends Omit<UserEntity, "password"> {}
