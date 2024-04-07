import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types, ObjectId, PipelineStage } from "mongoose";
import { NewsEntity, NewsDocument } from "./news.entity";

export class NewsRepositoryImplement {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectModel(NewsEntity.name) private news: Model<NewsDocument>
  ) {}

  async createNews(news: NewsEntity): Promise<ObjectId> {
    const newsDoc: NewsDocument = new this.news(news);
    const result = await newsDoc.save();
    this.logger.debug(`saved news ID = ${result._id}`);
    return result._id as ObjectId;
  }

  async findNews() {
    const schoolId = new Types.ObjectId("66113ffd08aa75083058ce89"); // string to ObjectId 예제
    const filter_stages: PipelineStage[] = [
      {
        $match: {
          $and: [{ school_id: schoolId }],
        },
      },
    ];
    const lookup_stages: PipelineStage[] = [
      {
        $lookup: {
          from: "subscriber",
          localField: "school_id",
          foreignField: "school_id",
          as: "subscription",
        },
      },
    ];
    const search_stages: PipelineStage[] = [
      ...filter_stages,
      ...lookup_stages,
      // {$project: {_id: 0, rank: 1, menu_id: '$_id', count: 1}},
    ];
    return await this.news.aggregate(search_stages);
  }
}
