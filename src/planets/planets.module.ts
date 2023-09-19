import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { Planet } from './entities/planet.entity';
import { Services } from 'src/common/services/services';
import { Coordinates } from 'src/common/coordinates/coordinates';

@Module({
  imports: [TypeOrmModule.forFeature([Planet])],
  controllers: [PlanetsController],
  providers: [PlanetsService, Services, Coordinates],
})
export class PlanetsModule {}
