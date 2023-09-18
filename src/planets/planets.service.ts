import { Injectable } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
  ) {}

  create(createPlanetDto: CreatePlanetDto) {
    const planet = this.planetRepository.create(createPlanetDto);
    return this.planetRepository.save(planet);
  }

  findAll() {
    return this.planetRepository.find();
  }

  findOne(id: number) {
    const planet = this.planetRepository
      .createQueryBuilder('planet')
      .where('planet.id=:id', { id })
      .leftJoinAndSelect('planet.population', 'characters')
      .loadRelationCountAndMap('planet.population', 'planet.population')
      .getOne();

    return planet;
  }

  update(id: number, updatePlanetDto: UpdatePlanetDto) {
    // const planet = this.planetRepository.create(updatePlanetDto);
    return this.planetRepository.update(id, updatePlanetDto);
  }

  remove(id: number) {
    this.planetRepository.findOneBy({ id });
    return this.planetRepository.delete({ id });
  }
}
