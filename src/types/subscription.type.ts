import {ObjectId} from 'mongoose';
import {NewsEntity} from 'src/news/infra/news.entity';
import {SubscriptionEntity, SubscriptionNewsEntity} from 'src/subscription/infra';

export type SubscriptionEntityWithId = Readonly<Partial<SubscriptionEntity & {_id: ObjectId}>>;

export interface SubscriptionNewsList {
  _id: ObjectId; // subscription_news_id
  news_id: ObjectId;
  title: string;
  admin_id: string;
  create_at: Date;
  update_at: Date;
  is_read: boolean;
}

export type SubscriptionNewsEntityWithId = Readonly<
  Partial<SubscriptionNewsEntity & {_id: ObjectId}>
>;

export type AggregatedNewsType = NewsEntity &
  SubscriptionEntity &
  SubscriptionNewsEntity & {_id: ObjectId};
