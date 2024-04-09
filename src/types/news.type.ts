import { ObjectId } from "mongoose";
import { NewsEntity } from "src/news/infra/news.entity";

export type NewsWithId = NewsEntity & { _id: ObjectId };
