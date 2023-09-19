import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { GetEnemiesDto } from './dto/get-enemies.dto';

@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto) {
    return this.starshipsService.create(createStarshipDto);
  }

  @Get(':id/calculate-distance/:planetId')
  calculateDistance(
    @Param('id') id: number,
    @Param('planetId') planetId: number,
  ) {
    return this.starshipsService.calculateDistance(id, planetId);
  }

  @Get(':id/enemies-within-range')
  getEnemiesWithinRange(
    @Param('id') id: number,
    @Body() getEnemiesDto: GetEnemiesDto,
  ) {
    return this.starshipsService.getEnemiesWithinRange(id, getEnemiesDto);
  }

  @Get()
  findAll() {
    return this.starshipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.starshipsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateStarshipDto: UpdateStarshipDto,
  ) {
    return this.starshipsService.update(id, updateStarshipDto);
  }

  @Post(':id/travel-to/:planetId')
  travelTo(@Param('id') id: number, @Param('planetId') planetId: number) {
    return this.starshipsService.travelTo(id, planetId);
  }

  @Post(':id/set-enemy/:enemyId')
  setEnemy(@Param('id') id: number, @Param('enemyId') enemyId: number) {
    return this.starshipsService.setEnemy(id, enemyId);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.starshipsService.remove(+id);
  }
}
