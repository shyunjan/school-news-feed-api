import {IQuery} from '@nestjs/cqrs';
import {ObjectId} from 'mongoose';
import {SessionDto} from 'src/auth/dto';

export class SubscriptionNewsListQuery implements IQuery {
  constructor(readonly session: SessionDto, readonly schoolId?: ObjectId) {}
}
