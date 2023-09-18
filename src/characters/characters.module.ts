import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Character } from './entities/character.entity';
import { Planet } from 'src/planets/entities/planet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character]), TypeOrmModule.forFeature([Planet]),],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {};
