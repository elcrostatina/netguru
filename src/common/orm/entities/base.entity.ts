import {
  Entity,
  PrimaryKey,
  Property,
  BaseEntity as BaseEntityORM,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ abstract: true })
export abstract class BaseEntity extends BaseEntityORM<BaseEntity, 'id'> {
  @PrimaryKey()
  id = v4();

  @Property({
    length: 3,
    onCreate: () => new Date(),
    lazy: true,
  })
  protected createdAt = new Date();

  @Property({
    length: 3,
    onUpdate: () => new Date(),
    lazy: true,
  })
  protected updatedAt = new Date();

  @Property({
    length: 3,
    nullable: true,
    lazy: true,
  })
  protected deletedAt?: Date;

  constructor() {
    super();
    this.id = v4();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public softRemove(): void {
    this.deletedAt = new Date();
  }
}
