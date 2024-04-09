import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { NewsQuery } from "./news.query";
import { NewsInjectionToken } from "src/news/Injection-token";
import { NewsRepositoryImplement } from "src/news/infra/news.repository.implement";

@QueryHandler(NewsQuery)
export class NewsQueryHandler implements IQueryHandler<NewsQuery> {
  constructor(
    @Inject(NewsInjectionToken.NEWS_REPOSITORY)
    private readonly newsRepository: NewsRepositoryImplement
  ) {}

  async execute(query: NewsQuery) {}
}
