import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Character } from './entities/character.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Services } from 'src/common/services/services';
import { Starship } from 'src/starships/entities/starship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character]),
    TypeOrmModule.forFeature([Planet]),
    TypeOrmModule.forFeature([Starship]),
    Services,
  ],
  controllers: [CharactersController],
  providers: [CharactersService, Services],
})
export class CharactersModule {}
