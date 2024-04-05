import {PipeTransform, Injectable} from '@nestjs/common';

interface ParsedPagination {
  page?: number;
  limit: number;
  cursor?: number | string;
}

interface PaginationInput {
  page?: string;
  limit: string;
  cursor?: string;
}

@Injectable()
export class PaginateParsePipe
  implements PipeTransform<PaginationInput, ParsedPagination>
{
  transform(value: PaginationInput): ParsedPagination {
    const page = parseInt(value?.page, 10) || undefined;
    const limit = parseInt(value.limit, 10);
    // const cursor = value?.cursor ? parseInt(value.cursor, 10) : undefined;
    const cursor = value?.cursor || undefined;
    return {page, limit, cursor};
  }
}
