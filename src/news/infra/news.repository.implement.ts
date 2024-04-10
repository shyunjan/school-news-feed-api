import {Inject, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, ObjectId, PipelineStage} from 'mongoose';
import {NewsEntity, NewsDocument} from './news.entity';
import {News, NewsFactory} from '../domain';
import {SubscriptionNewsEntity} from 'src/subscription/infra';
import {CreateNewsDto} from '../dto';
import CustomError from 'src/common/error/custom-error';
import {RESULT_CODE} from 'src/constant';

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

  async makeSubscriptionNewsEntities(newsId: ObjectId): Promise<SubscriptionNewsEntity[]> {
    const filterStages: PipelineStage[] = [
      {
        $match: {_id: newsId},
      },
    ];
    const lookupStages: PipelineStage[] = [
      {
        $lookup: {
          from: 'subscription',
          let: {news_school_id: '$school_id'},
          pipeline: [
            {
              $match: {
                $and: [
                  {
                    $expr: {
                      $and: [{$eq: ['$school_id', '$$news_school_id']}],
                    },
                  },
                  {delete_at: {$exists: false}},
                ],
              },
            },
            {$project: {_id: 1}},
          ],
          as: 'subscription',
        },
      },
      {
        $unwind: {path: '$subscription'},
      },
    ];
    const searchStages: PipelineStage[] = [
      ...filterStages,
      ...lookupStages,
      {
        $project: {
          _id: 0,
          subscription_id: '$subscription._id',
          news_id: '$_id',
          create_at: new Date(),
          update_at: new Date(),
        },
      },
    ];
    return (await this.news.aggregate(searchStages)) as SubscriptionNewsEntity[];
  }

  async updateNews(newsId: ObjectId, news: CreateNewsDto): Promise<News | null> {
    const updateResult = await this.news.updateOne({_id: newsId}, {...news, update_at: new Date()});
    if (!updateResult.modifiedCount) throw new CustomError(RESULT_CODE.FAIL_TO_UPDATE_NEWS);
    this.logger.debug(`saved news ID = ${newsId}`);
    return this.findNewsOne(newsId);
  }

  async deleteNews(newsId: ObjectId): Promise<News | null> {
    type DeleteResult = {deletedCount: number};
    const updateResult = await this.news.updateOne({_id: newsId}, {delete_at: new Date()});
    if (!updateResult.modifiedCount) throw new CustomError(RESULT_CODE.FAIL_TO_DELETE_NEWS);
    this.logger.debug(`deleted news ID = ${newsId}`);
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
