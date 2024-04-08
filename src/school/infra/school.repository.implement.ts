import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { SchoolEntity, SchoolDocument } from "./school.entity";

export class SchoolRepositoryImplement {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectModel(SchoolEntity.name) private school: Model<SchoolDocument>
  ) {}

  async createSchool(school: SchoolEntity): Promise<ObjectId> {
    const schoolDoc: SchoolDocument = new this.school(school);

    /* TODO: 이미 존재하는 지역과 학교명이면 저장하는 과정은 생략하고 기존 학교번호를 그냥 리턴하는 로직 추가 */
    const result = await schoolDoc.save();
    this.logger.debug(`saved school ID = ${result._id}`);

    return result._id as ObjectId;
  }
}
