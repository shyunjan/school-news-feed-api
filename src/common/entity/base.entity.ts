import { Prop } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

export class BaseEntity {
  @Prop({
    type: SchemaTypes.Date,
    index: false,
    required: false,
    default: new Date(),
  })
  create_date?: Date;

  @Prop({
    type: SchemaTypes.Date,
    index: false,
    required: false,
    default: new Date(),
  })
  update_date?: Date;

  @Prop({ type: SchemaTypes.Date, index: false, required: false })
  delete_date?: Date;
}
