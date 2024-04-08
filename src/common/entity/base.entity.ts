import { Prop } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

export class BaseEntity {
  @Prop({
    type: SchemaTypes.Date,
    index: false,
    required: false,
    default: new Date(),
  })
  create_at?: Date;

  @Prop({
    type: SchemaTypes.Date,
    index: false,
    required: false,
    default: new Date(),
  })
  update_at?: Date;

  @Prop({ type: SchemaTypes.Date, index: false, required: false })
  delete_at?: Date;
}
