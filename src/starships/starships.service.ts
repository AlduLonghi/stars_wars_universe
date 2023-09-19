import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Starship } from './entities/starship.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Coordinates } from '../common/coordinates/coordinates';
import { Services } from '../common/services/services';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,

    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,

    @Inject(Coordinates)
    private readonly coordinates: Coordinates,

    @Inject(Services)
    private readonly services: Services, 
  ) {}

  async create(createStarshipDto: CreateStarshipDto) {
    const starship = this.starshipRepository.create(createStarshipDto);
    return await this.starshipRepository.save(starship);
  }

  async findAll() {
    const starships = await this.starshipRepository.find();
    this.services.validateEntity(starships, 'Starship');

    return starships;
  }

  async findOne(id: number) {
    const starship = await this.starshipRepository.findOneBy({ id });
    this.services.validateEntity(starship, 'Starship', id);

    return starship;
  }

  async update(id: number, updateStarshipDto: UpdateStarshipDto) {
    const starship = this.starshipRepository.findOneBy({ id });
    this.services.validateEntity(starship, 'Starship', id);

    await this.starshipRepository.update(id, updateStarshipDto);

    return this.services.message(`Starship ${id} successfully updated.`);
  }

  async travelTo(id: number, planetId: number) {
    const starship = await this.starshipRepository.findOneBy({ id });
    this.services.validateEntity(starship, 'Starship', id);

    const planet = await this.planetRepository.findOneBy({ id })
    this.services.validateEntity(planet, 'Planet', planetId);

    await this.starshipRepository.update(id, { current_location: planet.coordinates});

    return this.services.message(`Starship ${id} successfully relocated to Planet: ${planetId}`);
  }

  async calculateDistance(id: number, planetId: number) {
    type distanceResponse = {
      distance_in_kilometers:string,
    }

    const starship = await this.starshipRepository.findOneBy({ id });
    this.services.validateEntity(starship, 'Starship', id);

    const planet = await this.planetRepository.findOneBy({ id: planetId })
    this.services.validateEntity(planet, 'Planet', planetId);

    const getDistance = this.coordinates.calculateGalacticDistance(starship.current_location, planet.coordinates);

    let res: distanceResponse = {
      distance_in_kilometers: `${getDistance}`,
    }
   
    return res;
  }

  async remove(id: number) {
    const starship = await this.starshipRepository.findOneBy({ id });
    this.services.validateEntity(starship, 'Starship', id);

    await this.starshipRepository.delete(id);

    return this.services.message(`Starship ${id} successfull deleted`);
  }
}
