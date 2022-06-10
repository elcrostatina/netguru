import { EntityRepository } from '@mikro-orm/mysql';
import { FilterQuery, Loaded, QueryOrderMap } from '@mikro-orm/core';
import {
  FindOneOptions,
  FindOptions,
} from '@mikro-orm/core/drivers/IDatabaseDriver';
import { AnyEntity } from '@mikro-orm/core/typings';

export type WhereFilter<T> = FilterQuery<T>;
type CreateWhereReturnType<T> = FilterQuery<T>;

const createWhereFilter = <T>(
  where?: WhereFilter<T>,
): CreateWhereReturnType<T> => {
  // @ts-ignore
  return { ...where, deletedAt: null };
};

export abstract class BaseRepository<
  T extends AnyEntity<T>,
> extends EntityRepository<T> {
  public findOne<P extends string = never>(
    where: FilterQuery<T>,
    options?: FindOneOptions<T, P>,
    // @ts-ignore
    orderBy?: QueryOrderMap,
  ): Promise<Loaded<T, P> | null> {
    return super.findOne(createWhereFilter(where), {
      populate: options.populate,
      orderBy,
    });
  }

  public find<P extends string = never>(
    where: WhereFilter<T>,
    options?: FindOptions<T, P>,
  ): Promise<Loaded<T, P>[]> {
    return super.find(createWhereFilter(where), options);
  }

  public findAll<P extends string = never>(
    options?: FindOptions<T, P>,
  ): Promise<Loaded<T, P>[]> {
    return super.find(createWhereFilter(), options);
  }

  public findOneOrFail<P extends string = never>(
    where: WhereFilter<T>,
    options?: FindOneOptions<T, P>,
  ): Promise<Loaded<T, P>> {
    return super.findOneOrFail(createWhereFilter(where), options);
  }
}
