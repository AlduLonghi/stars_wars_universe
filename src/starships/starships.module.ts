import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Coordinates } from 'src/common/coordinates/coordinates';
import { Services } from 'src/common/services/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Starship]),
    TypeOrmModule.forFeature([Planet]),
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService, Coordinates, Services],
})
export class StarshipsModule {}
