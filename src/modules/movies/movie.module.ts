import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MovieEntity } from './entities/movie.entity';
import { MovieController } from './controllers/movie/movie.controller';
import { MovieApplicationService } from './application-services/movie/movie.application-service';
import { MovieDomainService } from './domain-services/movie/movie.domain-service';

@Module({
  imports: [MikroOrmModule.forFeature([MovieEntity])],
  providers: [MovieApplicationService, MovieDomainService],
  controllers: [MovieController],
})
export class MovieModule {}
