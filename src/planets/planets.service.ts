import { Injectable, Inject } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Services } from '../common/services/services';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,

    @Inject(Services)
    private readonly services: Services,
  ) {}

  async create(createPlanetDto: CreatePlanetDto) {
    const planet = this.planetRepository.create(createPlanetDto);
    return await this.planetRepository.save(planet);
  }

  async findAll() {
    const list = await this.planetRepository
      .createQueryBuilder('planet')
      .leftJoinAndSelect('planet.population', 'characters')
      .loadRelationCountAndMap('planet.population', 'planet.population')
      .getMany();
    this.services.validateEntity(list, 'Planet');

    return list;
  }

  async findOne(id: number) {
    const planet = await this.planetRepository
      .createQueryBuilder('planet')
      .where('planet.id=:id', { id })
      .leftJoinAndSelect('planet.population', 'characters')
      .loadRelationCountAndMap('planet.population', 'planet.population')
      .getOne();

    this.services.validateEntity(planet, 'Planet', id);

    return planet;
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto) {
    const planet = await this.planetRepository.findOneBy({ id });
    this.services.validateEntity(planet, 'Planet');

    await this.planetRepository.update(id, updatePlanetDto);
    return this.services.message(`Planet ${id} successfully updated`);
  }

  async remove(id: number) {
    const planet = await this.planetRepository.findOneBy({ id });
    this.services.validateEntity(planet, 'Planet', id);

    await this.planetRepository.delete({ id });
    return this.services.message(`Planet ${id} successfully deleted`);
  }
}
