import { Inject } from "@nestjs/common";
import { AggregateRoot, EventPublisher } from "@nestjs/cqrs";
import { ObjectId } from "mongoose";
import { CreateSubscriptionNewsEvent, UpdateSubscriptionNewsEvent } from ".";

export type NewsEssentialProperties = Readonly<
  Required<{
    title: string;
    contents: string;
    school_id: ObjectId; // 학교 번호. 관리자의 세션 정보로부터 입력받는다
    admin_id: string;
  }>
>;

export type NewsOptionalProperties = Readonly<
  Partial<{
    create_at: Date;
    update_at: Date;
    delete_at: Date | undefined | null;
  }>
>;

export type NewsProperties = NewsEssentialProperties & NewsOptionalProperties;

export interface News {
  createSubscriptionNews: () => void;
  updateSubscriptionNews: () => void;
  getSchoolId: () => ObjectId;
}

export class NewsImplement extends AggregateRoot implements News {
  private readonly _id: ObjectId;
  private readonly title: string;
  private readonly contents: string;
  private readonly school_id: ObjectId;
  private readonly admin_id: string;

  constructor(properties: NewsProperties) {
    super();
    this.autoCommit = true;
    Object.assign(this, properties);
  }

  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  createSubscriptionNews() {
    this.apply(new CreateSubscriptionNewsEvent(this._id));
  }

  updateSubscriptionNews() {
    this.apply(new UpdateSubscriptionNewsEvent(this._id));
  }

  getSchoolId() {
    return this.school_id;
  }
}
