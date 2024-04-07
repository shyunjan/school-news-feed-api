import { PickType } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";
import { Schema } from "mongoose";
import { SessionType } from "../infra/user.entity";
import { CreateUserDto } from ".";

export class SessionDto
  extends PickType(CreateUserDto, ["id"] as const)
  implements SessionType
{
  @IsBoolean()
  isAdmin: boolean;

  school_id?: Schema.Types.ObjectId | undefined;
}
