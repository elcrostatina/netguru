import { DateType, Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/orm/entities/base.entity';
import { isInt } from '../../../common/utils/number.util';
import { InternalServerErrorException } from '@nestjs/common';
import { isString } from '../../../common/utils/string.util';
import { isDate } from '../../../common/utils/date.util';

@Entity({ tableName: 'movies' })
export class MovieEntity extends BaseEntity {
  @Property()
  createdBy: number;

  @Property()
  title: string;

  @Property({ type: DateType })
  released: Date;

  @Property()
  genre: string;

  @Property()
  director: string;

  changeCreatedBy(createdBy: number): MovieEntity {
    if (!isInt(createdBy)) {
      throw new InternalServerErrorException(
        'ERROR.CREATED_BY_SHOULD_BE_INTEGER',
      );
    }

    this.createdBy = createdBy;

    return this;
  }

  changeTitle(title: string): MovieEntity {
    if (!isString(title)) {
      throw new InternalServerErrorException('ERROR.TITLE_SHOULD_BE_STRING');
    }

    this.title = title;

    return this;
  }

  changeReleased(released: Date): MovieEntity {
    if (!isDate(released)) {
      throw new InternalServerErrorException('ERROR.RELEASED_SHOULD_BE_DATE');
    }

    this.released = released;

    return this;
  }

  changeGenre(genre: string): MovieEntity {
    if (!isString(genre)) {
      throw new InternalServerErrorException('ERROR.GENRE_SHOULD_BE_STRING');
    }

    this.genre = genre;

    return this;
  }

  changeDirector(director: string): MovieEntity {
    if (!isString(director)) {
      throw new InternalServerErrorException('ERROR.DIRECTOR_SHOULD_BE_STRING');
    }

    this.director = director;

    return this;
  }
}
