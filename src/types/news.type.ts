import {ObjectId} from 'mongoose';
import {NewsEntity} from 'src/news/infra/news.entity';

export type NewsEntityWithId = NewsEntity & {_id: ObjectId};
