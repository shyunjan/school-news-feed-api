import {ObjectId} from 'mongoose';

export interface SubscriptionNewsList {
  subscription_news_id: ObjectId;
  news_id: ObjectId;
  title: string;
  admin_id: string;
  create_at: Date;
  update_at: Date;
}
