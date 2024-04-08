import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Schema } from "mongoose";
import { SchoolEntity, SchoolSchema } from "./infra/school.entity";
import { SchoolRepositoryImplement } from "./infra/school.repository.implement";
import { SchoolInjectionToken } from "./Injection-token";

const infrastructure: Provider[] = [
  {
    provide: SchoolInjectionToken.SCHOOL_REPOSITORY,
    useClass: SchoolRepositoryImplement,
  },
];

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: SchoolEntity.name,
        useFactory: (): Schema => SchoolSchema,
      },
    ]),
  ],
  providers: [...infrastructure],
  exports: [...infrastructure],
})
export class SchoolModule {}
