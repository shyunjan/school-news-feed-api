import { ObjectId } from "mongoose";
import { SchoolEntity } from "src/school/infra/school.entity";

export type SchoolEntityWithId = SchoolEntity & { _id: ObjectId };
