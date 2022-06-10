import { EntityRepository } from '@mikro-orm/mysql';
import { BaseEntity } from '../entities/base.entity';
import { FilterQuery, Loaded, Populate, QueryOrderMap } from '@mikro-orm/core';
import { FindOptions } from '@mikro-orm/core/drivers/IDatabaseDriver';

export type WhereFilter<T> = FilterQuery<T>;

const createWhereFilter = <T>(where?: WhereFilter<T>): unknown => {
  // @ts-ignore
  return { ...where, deletedAt: null };
};

export abstract class BaseRepository<
  T extends BaseEntity,
> extends EntityRepository<T> {
  public findOne<P>(
    where: WhereFilter<T>,
    populate?: P,
    orderBy?: QueryOrderMap,
  ): Promise<Loaded<T, P> | null> {
    return super.findOne(createWhereFilter(where), populate, orderBy);
  }

  public find<P extends Populate<T> = any>(
    where: WhereFilter<T>,
    options?: FindOptions<T, P>,
  ): Promise<Loaded<T, P>[]> {
    return super.find(createWhereFilter(where), options);
  }

  public findAll<P extends Populate<T> = any>(
    options?: FindOptions<T, P>,
  ): Promise<Loaded<T, P>[]> {
    return super.find(createWhereFilter(), options);
  }

  public findOneOrFail<P extends Populate<T> = any>(
    where: WhereFilter<T>,
    populate?: P,
    orderBy?: QueryOrderMap,
  ): Promise<Loaded<T, P>> {
    return super.findOneOrFail(createWhereFilter(where), populate, orderBy);
  }
}
