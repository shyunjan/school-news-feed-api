import { Inject, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, PipelineStage } from "mongoose";
import { NewsEntity, NewsDocument } from "./news.entity";
import { News, NewsFactory } from "../domain";
import { SubscriptionNewsEntity } from "src/subscription/infra";
import { CreateNewsDto } from "../dto";
import CustomError from "src/common/error/custom-error";
import { RESULT_CODE } from "src/constant";

export class NewsRepositoryImplement {
  private readonly logger = new Logger(this.constructor.name);
  @InjectModel(NewsEntity.name) private news: Model<NewsDocument>;
  @Inject() private readonly newsFactory: NewsFactory;

  async findNewsOne(newsId: ObjectId): Promise<News | null> {
    const newsDoc = (await this.news.findById(newsId))?.toObject();
    return newsDoc ? this.entityToModel(newsDoc) : null;
  }

  async createNews(news: NewsEntity): Promise<News | null> {
    const newsDoc: NewsDocument = new this.news(news);
    const savedDoc = (await newsDoc.save()).toObject();
    this.logger.debug(`saved news ID = ${savedDoc._id}`);
    return savedDoc ? this.entityToModel(savedDoc) : null;
  }

  async makeSubscriptionNewsEntities(
    newsId: ObjectId
  ): Promise<SubscriptionNewsEntity[]> {
    const filter_stages: PipelineStage[] = [
      {
        $match: { _id: newsId },
      },
    ];
    const lookup_stages: PipelineStage[] = [
      {
        $lookup: {
          from: "subscription",
          localField: "school_id",
          foreignField: "school_id",
          as: "subscription",
        },
      },
      {
        $unwind: { path: "$subscription" },
      },
    ];
    const search_stages: PipelineStage[] = [
      ...filter_stages,
      ...lookup_stages,
      {
        $project: {
          _id: 0,
          subscription_id: "$subscription._id",
          news_id: "$_id",
        },
      },
    ];
    return (await this.news.aggregate(
      search_stages
    )) as SubscriptionNewsEntity[];
  }

  async updateNews(newsId: ObjectId, news: CreateNewsDto) {
    const updateResult = await this.news.updateOne(
      { _id: newsId },
      { ...news, update_at: new Date() }
    );
    if (!updateResult.modifiedCount)
      throw new CustomError(RESULT_CODE.FAIL_TO_UPDATE_NEWS);
    this.logger.debug(`saved news ID = ${newsId}`);
    return this.findNewsOne(newsId);
  }

  private entityToModel(entity: NewsEntity): News {
    return this.newsFactory.reconstitute({
      ...entity,
      create_at: entity.create_at,
      delete_at: entity.delete_at,
    });
  }
}
