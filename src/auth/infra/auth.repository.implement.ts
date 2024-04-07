import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { UserEntity, UserDocument } from "./user.entity";

export class AuthRepositoryImplement {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectModel(UserEntity.name) private user: Model<UserDocument>
  ) {}

  async createAdmin(user: UserEntity): Promise<ObjectId> {
    const userDoc: UserDocument = new this.user(user);
    const result = await userDoc.save();
    this.logger.debug(`saved admin user ID = ${result._id}`);
    return result._id as ObjectId;
  }

  async createUser(user: UserEntity): Promise<ObjectId> {
    const userDoc: UserDocument = new this.user(user);
    const result = await userDoc.save();
    this.logger.debug(`saved user ID = ${result._id}`);
    return result._id as ObjectId;
  }

  async findUserById(id: string): Promise<UserDocument> {
    return (await this.user.findOne({ id: id })) as UserDocument;
  }
}
