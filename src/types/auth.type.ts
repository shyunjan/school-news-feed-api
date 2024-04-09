import { ObjectId } from "mongoose";
import { UserEntity } from "src/auth/infra/user.entity";

export type UserEntityWithId = UserEntity & { _id: ObjectId };
