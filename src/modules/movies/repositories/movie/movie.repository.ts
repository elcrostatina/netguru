import { BaseRepository } from '../../../../common/orm/repositories/base.repository';
import { MovieEntity } from '../../entities/movie.entity';
import { addMonths, setTime } from '../../../../common/utils/date.util';

export class MovieRepository extends BaseRepository<MovieEntity> {
  public async getUserMovieOfMonth(params: {
    userId: number;
    month: Date;
  }): Promise<MovieEntity[]> {
    const greaterThanDate = setTime({
      date: new Date(),
      hours: 0,
      minutes: 0,
    });

    const lowerThanDate = setTime({
      date: new Date(),
      hours: 23,
      minutes: 59,
    });

    return this.find({
      createdBy: params.userId,
      createdAt: {
        // @ts-ignore
        $gte: greaterThanDate,
        $lte: addMonths(lowerThanDate, 1),
      },
    });
  }
}
