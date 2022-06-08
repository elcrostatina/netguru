import { Injectable } from '@nestjs/common';
import { CreateMovieDomainParams } from '../../types/movie.type';
import { MovieEntity } from '../../entities/movie.entity';

@Injectable()
export class MovieDomainService {
  public createMovie(params: CreateMovieDomainParams): MovieEntity {
    const movie = new MovieEntity();

    movie
      .changeCreatedBy(params.createdBy)
      .changeTitle(params.title)
      .changeDirector(params.director)
      .changeReleased(params.released)
      .changeGenre(params.genre);

    return movie;
  }
}
