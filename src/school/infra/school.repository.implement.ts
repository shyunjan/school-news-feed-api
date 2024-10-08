import {Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {SchoolEntity, SchoolDocument} from './school.entity';
import {SchoolEntityWithId} from 'src/types';

export class SchoolRepositoryImplement {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectModel(SchoolEntity.name) private school: Model<SchoolDocument>
  ) {}

  async createSchool(school: SchoolEntity): Promise<SchoolEntityWithId> {
    const schoolDoc: SchoolDocument = new this.school(school);

    /* TODO: 이미 존재하는 지역과 학교명이면 저장하는 과정은 생략하고 기존 학교정보를 그냥 리턴하는 로직 추가 */

    const result = await schoolDoc.save();
    this.logger.debug(`saved school ID = ${result._id}`);

    return result.toObject() as SchoolEntityWithId;
  }

  async findAllSchool() {
    return this.school
      .find({}, {_id: 1, region: 1, name: 1})
      .sort({region: 'asc', name: 'asc'})
      .lean();
  }
}
