import {PipeTransform, Injectable} from '@nestjs/common';
import {Types} from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  transform(value: unknown): Types.ObjectId | undefined {
    if (!value) return undefined;
    return new Types.ObjectId(value as string);
  }
}
