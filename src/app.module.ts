import { Module } from '@nestjs/common';
import { CommonHelpersModule } from './common/helpers/common-helpers.module';
import { CommonServiceModule } from './common/services/common-service.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntityCaseNamingStrategy, MikroORM } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import configuration from './config/configurations';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './common/guards/authentication/authentication.guard';
import { MovieModule } from './modules/movies/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule.forRootAsync({
      providers: [ConfigService],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.get('logger.level'),
          prettyPrint: {
            levelFirst: true,
            colorize: true,
            translateTime: true,
            singleLine: true,
          },
        },
        exclude: configService.get('logger.log.requests') ? [] : ['/(.*)'],
      }),
    }),
    MikroOrmModule.forRootAsync({
      providers: [ConfigService],
      inject: [ConfigService, PinoLogger],
      useFactory: (configService: ConfigService, logger: PinoLogger) => {
        logger.setContext('MikroORM');

        return {
          metadataProvider: TsMorphMetadataProvider,
          namingStrategy: EntityCaseNamingStrategy,
          entities: ['./dist/**/entities/*.entity.js'],
          entitiesTs: ['./src/**/entities/*.entity.ts'],
          debug: configService.get('logger.log.queries'),
          migrations: {
            path: './src/migrations',
            pattern: /^[\w-]+\d+\.js$/,
            emit: 'js',
          },
          type: 'mysql',
          dbName: configService.get('database.name'),
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          user: configService.get('database.user'),
          password: configService.get('database.password'),
          logger: (msg): unknown => logger.debug(msg),
        };
      },
    }),
    CommonHelpersModule,
    CommonServiceModule,
    MovieModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
