import { JwtPayload } from '../../../common/interfaces/authorization.interface';
import { DateType, Property } from '@mikro-orm/core';
import { MovieEntity } from '../entities/movie.entity';

export interface CreationMovieHandlerParams {
  userJwt: JwtPayload;
  title: string;
}

export interface RetrievedMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}
