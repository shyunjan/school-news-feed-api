import {Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, ObjectId, PipelineStage} from 'mongoose';
import {} from './subscription.entity';
import {
  SubscriptionEntity,
  SubscriptionDocument,
  SubscriptionNewsEntity,
  SubscriptionNewsDocument,
} from '.';
import CustomError from 'src/common/error/custom-error';
import {RESULT_CODE} from 'src/constant';
import {NewsEntityWithId} from 'src/types';

export class SubscriptionRepositoryImplement {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectModel(SubscriptionEntity.name)
    private subscription: Model<SubscriptionDocument>,
    @InjectModel(SubscriptionNewsEntity.name)
    private subscriptionNews: Model<SubscriptionNewsDocument>
  ) {}

  async findSubscription(param: SubscriptionEntity) {
    return this.subscription.findOne({
      subscriber_id: param.subscriber_id,
      school_id: param.school_id,
    });
  }

  async createSubscription(subscription: SubscriptionEntity): Promise<ObjectId> {
    const doc: SubscriptionDocument = new this.subscription(subscription);
    const subscriptionDoc = (await doc.save()).toObject();
    this.logger.debug(`saved subscription ID = ${subscriptionDoc._id}`);
    return subscriptionDoc;
  }

  async createSubscriptionNews(
    entities: SubscriptionNewsEntity[]
  ): Promise<SubscriptionNewsDocument[]> {
    return (await this.subscriptionNews.insertMany(entities)).map(doc =>
      doc.toObject()
    ) as SubscriptionNewsDocument[];
  }

  async updateSubscriptionNews(newsId: ObjectId) {
    return this.subscriptionNews.updateMany({is_read: false});
  }

  async deleteSubscription(param: SubscriptionEntity): Promise<SubscriptionEntity> {
    const result = await this.subscription.updateOne(
      {subscriber_id: param.subscriber_id, school_id: param.school_id},
      {delete_at: new Date()}
    );
    if (!result.modifiedCount) throw new CustomError(RESULT_CODE.FAIL_TO_DELETE_SUBSCRIPTION);

    const subscription = await this.findSubscription(param);
    this.logger.debug(`deleted subscription ID = ${subscription?._id}`);
    return subscription?.toObject() as SubscriptionEntity;
  }

  async findSubscriptionNews(
    subscriberId: string,
    schoolId: ObjectId
  ): Promise<NewsEntityWithId[]> {
    const filterStages: PipelineStage[] = [
      {
        $match: {
          $and: [
            {
              subscriber_id: subscriberId,
            },
            {
              school_id: schoolId,
            },
          ],
        },
      },
    ];
    const lookupSubscriptionNewsStages: PipelineStage[] = [
      {
        $lookup: {
          from: 'subscription-news',
          localField: '_id',
          foreignField: 'subscription_id',
          as: 'subscription-news',
        },
      },
      {
        $unwind: '$subscription-news',
      },
      {
        $project: {
          _id: 0,
          news_id: '$subscription-news.news_id',
        },
      },
    ];
    const lookupNewsStages: PipelineStage[] = [
      {
        $lookup: {
          from: 'news',
          localField: 'news_id',
          foreignField: '_id',
          as: 'news',
        },
      },
      {
        $match: {'news.delete_at': {$exists: false}},
      },
      {
        $unwind: '$news',
      },
    ];
    const searchStages: PipelineStage[] = [
      ...filterStages,
      ...lookupSubscriptionNewsStages,
      ...lookupNewsStages,
      {
        $project: {
          _id: '$news_id',
          title: '$news.title',
          admin_id: '$news.admin_id',
          create_at: '$news.create_at',
          update_at: '$news.update_at',
        },
      },
      {
        $sort: {_id: -1},
      },
    ];
    return (await this.subscription.aggregate(searchStages)) as NewsEntityWithId[];
  }
}
