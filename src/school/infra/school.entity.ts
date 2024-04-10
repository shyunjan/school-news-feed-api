import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CreateSchoolDto } from "../interface/dto/create-school.dto";

@Schema({ collection: "school" })
export class SchoolEntity extends CreateSchoolDto {}

export type SchoolDocument = SchoolEntity & Document;
export const SchoolSchema = SchemaFactory.createForClass(SchoolEntity);
