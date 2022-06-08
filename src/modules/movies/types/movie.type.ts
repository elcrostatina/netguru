import { NonFunctionProperties } from '../../../common/types/utility.type';
import { MovieEntity } from '../entities/movie.entity';
import { BaseEntity } from '../../../common/orm/entities/base.entity';

export type CreateMovieDomainParams = Omit<
  NonFunctionProperties<MovieEntity>,
  keyof BaseEntity
>;
