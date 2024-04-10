import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Schema } from "mongoose";
import { SchoolEntity, SchoolSchema } from "./infra/school.entity";
import { SchoolRepositoryImplement } from "./infra/school.repository.implement";
import { SchoolInjectionToken } from "./Injection-token";
import {
  AllSchoolQueryHandler,
  CreateSchoolCommandHandler,
} from "./application";
import { AuthInjectionToken } from "src/auth/Injection-token";
import { AuthRepositoryImplement } from "src/auth/infra/auth.repository.implement";
import { UserEntity, UserSchema } from "src/auth/infra/user.entity";
import { SchoolController } from "./interface/school.controller";

const application = [
  JwtService,
  CreateSchoolCommandHandler,
  AllSchoolQueryHandler,
];

const infrastructure: Provider[] = [
  {
    provide: SchoolInjectionToken.SCHOOL_REPOSITORY,
    useClass: SchoolRepositoryImplement,
  },
  {
    provide: AuthInjectionToken.AUTH_REPOSITORY,
    useClass: AuthRepositoryImplement,
  },
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeatureAsync([
      {
        name: UserEntity.name,
        useFactory: (): Schema => UserSchema,
      },
      {
        name: SchoolEntity.name,
        useFactory: (): Schema => SchoolSchema,
      },
    ]),
  ],
  controllers: [SchoolController],
  providers: [...application, ...infrastructure],
  exports: [MongooseModule, ...infrastructure],
})
export class SchoolModule {}
