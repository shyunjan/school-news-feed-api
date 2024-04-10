import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, ObjectId } from "mongoose";
import { UserEntity, UserDocument } from "./user.entity";
import CustomError from "src/common/error/custom-error";
import { RESULT_CODE } from "src/constant";
import { UserEntityWithId } from "src/types";

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
    return (await this.user.findOne({ id })) as UserDocument;
  }

  async updateAdminWithSchool(param: Partial<UserEntityWithId>) {
    const filter: FilterQuery<UserEntityWithId> = { is_admin: true };
    if (param._id) filter._id = param._id;
    else if (param.id) filter.id = param.id;
    else throw new CustomError(RESULT_CODE.INVALID_PARAMETER);

    const updateResult = await this.user.updateOne(filter, {
      school_id: param.school_id,
    });
    if (!updateResult.modifiedCount)
      throw new CustomError(RESULT_CODE.FAIL_TO_UPDATE_AUTH);

    const updatedUserId = param._id ?? param.id;
    this.logger.debug(`saved admin user ID = ${updatedUserId}`);
    return param;
  }
}
