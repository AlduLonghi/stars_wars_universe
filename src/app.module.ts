import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsModule } from './planets/planets.module';
import { StarshipsModule } from './starships/starships.module';

@Module({
  imports: [
    CharactersModule,
    PlanetsModule,
    StarshipsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
