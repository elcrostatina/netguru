import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ResponseMessage } from '../../../../common/interfaces/http.interface';
import { MovieApplicationService } from '../../application-services/movie/movie.application-service';
import { MovieDto } from '../../dto/movie.dto';
import { AuthService } from '../../../../common/services/auth/auth.service';
import { MovieEntity } from '../../entities/movie.entity';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieApplicationService: MovieApplicationService,
    private readonly authService: AuthService,
  ) {}

  @Post('create')
  public async create(
    @Body(new ValidationPipe()) { title }: MovieDto,
  ): Promise<ResponseMessage> {
    await this.movieApplicationService.creationMovieHandler({
      title,
      userJwt: this.authService.getSessionToken(),
    });

    return { message: 'RESPONSE.MOVIE_CREATED' };
  }

  @Get()
  public async getAll(): Promise<MovieEntity[]> {
    return this.movieApplicationService.getAllByUser(
      this.authService.getSessionToken(),
    );
  }
}
