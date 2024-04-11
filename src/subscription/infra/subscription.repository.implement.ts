import {Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {FilterQuery, Model, ObjectId, PipelineStage} from 'mongoose';
import {} from './subscription.entity';
import {
  SubscriptionEntity,
  SubscriptionDocument,
  SubscriptionNewsEntity,
  SubscriptionNewsDocument,
} from '.';
import CustomError from 'src/common/error/custom-error';
import {RESULT_CODE} from 'src/constant';
import {SubscriptionNewsList, AggregatedNewsType, SubscriptionNewsEntityWithId} from 'src/types';

export class SubscriptionRepositoryImplement {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectModel(SubscriptionEntity.name)
    private subscription: Model<SubscriptionDocument>,
    @InjectModel(SubscriptionNewsEntity.name)
    private subscriptionNews: Model<SubscriptionNewsDocument>
  ) {}

  async findSubscription(param: SubscriptionEntity) {
    return this.subscription
      .findOne({
        subscriber_id: param.subscriber_id,
        school_id: param.school_id,
      })
      .lean();
  }

  async findSubscriptionById(subscriptionId: ObjectId) {
    return this.subscription.findById(subscriptionId).lean();
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

  async updateSubscriptionNewsRead(param: SubscriptionNewsEntityWithId, IsRead: boolean) {
    let filter: FilterQuery<SubscriptionNewsEntityWithId>;
    if (param.news_id) filter = {news_id: {$eq: param.news_id}};
    else if (param._id) filter = {_id: {$eq: param._id}};
    else return null;
    return this.subscriptionNews.updateMany(filter, {is_read: IsRead});
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

  async findSubscriptionNewsList(
    subscriberId: string,
    schoolId?: ObjectId
  ): Promise<SubscriptionNewsList[]> {
    const filter: FilterQuery<SubscriptionNewsEntityWithId>[] = [
      {
        subscriber_id: subscriberId,
      },
    ];
    if (schoolId) filter.push({school_id: schoolId});
    const filterStages: PipelineStage[] = [
      {
        $match: {
          $and: [...filter],
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
          _id: '$subscription-news._id',
          news_id: '$subscription-news.news_id',
          is_read: '$subscription-news.is_read',
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
          news_id: 1,
          title: '$news.title',
          admin_id: '$news.admin_id',
          create_at: '$news.create_at',
          update_at: '$news.update_at',
          is_read: 1,
        },
      },
      {
        $sort: {update_at: -1},
      },
    ];
    return (await this.subscription.aggregate(searchStages)) as SubscriptionNewsList[];
  }

  async findSubscriptionNews(subscriptionNewsId: ObjectId): Promise<AggregatedNewsType> {
    const filterStages: PipelineStage[] = [
      {
        $match: {
          _id: subscriptionNewsId,
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
        $unwind: {
          path: '$news',
        },
      },
      {
        $match: {'news.delete_at': {$exists: false}},
      },
    ];
    const lookupSubscriptionStages: PipelineStage[] = [
      {
        $lookup: {
          from: 'subscription',
          localField: 'subscription_id',
          foreignField: '_id',
          as: 'subscription',
        },
      },
      {
        $unwind: {
          path: '$subscription',
        },
      },
    ];
    const searchStages: PipelineStage[] = [
      ...filterStages,
      ...lookupNewsStages,
      ...lookupSubscriptionStages,
      {
        $project: {
          subscription_id: 1,
          subscriber_id: '$subscription.subscriber_id',
          news_id: 1,
          title: '$news.title',
          contents: '$news.contents',
          is_read: 1,
          create_at: '$news.create_at',
          update_at: '$news.update_at',
          admin_id: '$news.admin_id',
        },
      },
    ];
    return (await this.subscriptionNews.aggregate(searchStages))[0] as AggregatedNewsType;
  }
}
