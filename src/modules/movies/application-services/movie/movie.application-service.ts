import { ForbiddenException, Injectable } from '@nestjs/common';
import { MovieEntity } from '../../entities/movie.entity';
import {
  CreationMovieHandlerParams,
  RetrievedMovie,
} from '../../interfaces/movie.interface';
import { HttpHelper } from '../../../../common/helpers/http/http.helper';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../../../common/interfaces/authorization.interface';
import { UserRole } from '../../enums/user-role.enum';
import { MovieRepository } from '../../repositories/movie/movie.repository';
import { MovieDomainService } from '../../domain-services/movie/movie.domain-service';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class MovieApplicationService {
  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly configService: ConfigService,
    private readonly movieRepository: MovieRepository,
    private readonly movieDomainService: MovieDomainService,
    private readonly em: EntityManager,
  ) {}

  public async creationMovieHandler(
    params: CreationMovieHandlerParams,
  ): Promise<MovieEntity> {
    await this.checkUserPermission(params.userJwt);

    const movieObject = await this.retrieveMovie(params.title);
    const movie = this.movieDomainService.createMovie({
      createdBy: params.userJwt.userId,
      title: movieObject.Title,
      released: new Date(movieObject.Released),
      director: movieObject.Director,
      genre: movieObject.Genre,
    });

    await this.em.persistAndFlush(movie);

    return movie;
  }

  private retrieveMovie(title: string): Promise<RetrievedMovie> {
    // http://www.omdbapi.com/?t=zorro&apikey=7aa9208c
    const url = `${this.configService.get(
      'omdbapi.api',
    )}${title}&apikey=${this.configService.get('omdbapi.key')}`;

    return this.httpHelper.fetchJson<RetrievedMovie>(url);
  }

  private async checkUserPermission(userJwt: JwtPayload): Promise<void> {
    if (userJwt.role === UserRole.Premium) {
      return;
    }

    const createdMovies = await this.movieRepository.getUserMovieOfMonth({
      userId: userJwt.userId,
      month: new Date(),
    });

    if (createdMovies.length >= 5) {
      throw new ForbiddenException('ERROR.CREATION_MOVIES_LIMIT_EXCEEDED');
    }
  }
}
