import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { HttpHelper } from '../src/common/helpers/http/http.helper';
import { EntityManager } from '@mikro-orm/core';
import { MovieEntity } from '../src/modules/movies/entities/movie.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { createJWT, getUserByRole, Role } from './utils/utils';

const retrievedMovie = {
  Title: 'Godzilla',
  Year: '2014',
  Rated: 'PG-13',
  Released: '16 May 2014',
  Runtime: '123 min',
  Genre: 'Action, Adventure, Sci-Fi',
  Director: 'Gareth Edwards',
  Writer: 'Ishirô Honda, Takeo Murata, Shigeru Kayama',
  Actors: 'Aaron Taylor-Johnson, Elizabeth Olsen, Bryan Cranston',
  Language: 'English, Japanese',
  Country: 'United States, Japan',
  Awards: '7 wins & 31 nominations',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BZDFmYTM4NzAtNWM0ZC00MGJlLWEyYzQtYzA3ZTFiNzc1YjllXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '6.4/10' },
    {
      Source: 'Rotten Tomatoes',
      Value: '76%',
    },
    { Source: 'Metacritic', Value: '62/100' },
  ],
  Metascore: '62',
  imdbRating: '6.4',
  imdbVotes: '407,925',
  imdbID: 'tt0831387',
  Type: 'movie',
  DVD: '16 Sep 2014',
  BoxOffice: '$200,676,069',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
};

class FakeRequestHelper {
  public async fetchJson(): Promise<any> {
    return retrievedMovie;
  }
}

describe('Movies e2e test', () => {
  let app: INestApplication;
  let movieRepository: EntityRepository<MovieEntity>;
  jest.setTimeout(9999999);

  const insertMovie = async (jwt: string, title: string): Promise<void> => {
    await request(app.getHttpServer())
      .post('/movie/create')
      .send({ title: title })
      .set({ authorization: `Bearer ${jwt}` })
      .expect(201);
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HttpHelper)
      .useClass(FakeRequestHelper)
      .compile();

    app = module.createNestApplication();
    await app.init();

    const entityManager = await app.get(EntityManager);
    movieRepository = entityManager.getRepository(MovieEntity);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    console.log('Movie table cleaning');
    // await movieRepository.createQueryBuilder().delete().execute();
  });

  describe('Insert Movies', () => {
    it('successful insert one movie', async () => {
      const jwt = createJWT(Role.Basic);

      await insertMovie(jwt, 'godzilla');

      const movies = await movieRepository.findAll();
      const user = getUserByRole(Role.Basic);

      expect(movies.length).toEqual(1);
      expect(movies[0].title === 'godzilla');
      expect(movies[0].createdBy === user.id);
    });

    it('successful insert 3 movies', async () => {
      const jwt = createJWT(Role.Basic);

      await insertMovie(jwt, 'godzilla');
      await insertMovie(jwt, 'godzilla');
      await insertMovie(jwt, 'godzilla');

      const movies = await movieRepository.findAll();
      const user = getUserByRole(Role.Basic);

      expect(movies.length).toEqual(3);

      movies.forEach((movie) => {
        expect(movie.title === 'godzilla');
        expect(movie.createdBy === user.id);
      });
    });

    it('Basic user should insert max 5 movies per month', async () => {
      const jwt = createJWT(Role.Basic);

      await insertMovie(jwt, 'godzilla');
      await insertMovie(jwt, 'godzilla');
      await insertMovie(jwt, 'godzilla');
      await insertMovie(jwt, 'godzilla');
      await insertMovie(jwt, 'godzilla');

      await request(app.getHttpServer())
        .post('/movie/create')
        .send({ title: 'godzilla' })
        .set({ authorization: `Bearer ${jwt}` })
        .expect(403);
    });

    it('No limit for the premium user', async () => {
      const jwt = createJWT(Role.Premium);

      await insertMovie(jwt, 'godzilla');
      await insertMovie(jwt, 'godzilla');
      await insertMovie(jwt, 'godzilla');
      await insertMovie(jwt, 'godzilla');
      await insertMovie(jwt, 'godzilla');
      await insertMovie(jwt, 'godzilla');
      await insertMovie(jwt, 'godzilla');

      const movies = await movieRepository.findAll();
      const user = getUserByRole(Role.Premium);

      expect(movies.length).toEqual(7);

      movies.forEach((movie) => {
        expect(movie.title === 'godzilla');
        expect(movie.createdBy === user.id);
      });
    });

    it('Not authenticated user can not create a movie', async () => {
      await request(app.getHttpServer())
        .post('/movie/create')
        .send({ title: 'godzilla' })
        .set({ authorization: `Bearer foo` })
        .expect(401);
    });

    it('Retrieved wrong formatted movie 500', async () => {
      const jwt = createJWT(Role.Premium);
      const tempTitle = retrievedMovie.Title;
      retrievedMovie.Title = null;

      await request(app.getHttpServer())
        .post('/movie/create')
        .send({ title: 'godzilla' })
        .set({ authorization: `Bearer ${jwt}` })
        .expect(500);

      retrievedMovie.Title = tempTitle;
    });
  });
});
