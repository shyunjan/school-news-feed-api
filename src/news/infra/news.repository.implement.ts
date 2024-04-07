import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
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
}
