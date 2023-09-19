import { Inject, Injectable } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Starship } from './entities/starship.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Coordinates } from '../common/coordinates/coordinates';
import { Services } from '../common/services/services';
import { GetEnemiesDto } from './dto/get-enemies.dto';

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
    const starship = await this.starshipRepository.findOne({
      where: { id: id },
      relations: {
        enemies: true,
        passengers: true,
      },
    });
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

    const planet = await this.planetRepository.findOneBy({ id });
    this.services.validateEntity(planet, 'Planet', planetId);

    await this.starshipRepository.update(id, {
      current_location: planet.coordinates,
    });

    return this.services.message(
      `Starship ${id} successfully relocated to Planet: ${planetId}`,
    );
  }

  async calculateDistance(id: number, planetId: number) {
    type distanceResponse = {
      distance_in_kilometers: string;
    };

    const starship = await this.starshipRepository.findOneBy({ id });
    this.services.validateEntity(starship, 'Starship', id);

    const planet = await this.planetRepository.findOneBy({ id: planetId });
    this.services.validateEntity(planet, 'Planet', planetId);

    const getDistance = this.coordinates.calculateGalacticDistance(
      starship.current_location,
      planet.coordinates,
    );

    const res: distanceResponse = {
      distance_in_kilometers: `${getDistance}`,
    };

    return res;
  }

  async setEnemy(id: number, enemyId: number) {
    const starship = await this.starshipRepository.findOne({
      where: { id: id },
      relations: {
        enemies: true,
      },
    });
    this.services.validateEntity(starship, 'Starship', id);

    const enemy = await this.starshipRepository.findOne({
      where: { id: id },
      relations: {
        enemies: true,
      },
    });
    this.services.validateEntity(enemy, 'Enemy', enemyId);

    starship.enemies = [...starship.enemies, enemy];
    enemy.enemies = [...enemy.enemies, starship];

    await this.starshipRepository.save(starship);
    await this.starshipRepository.save(enemy);

    return this.services.message(
      `Starship ${enemyId} successfully added as enemy of starship ${id}`,
    );
  }

  async getEnemiesWithinRange(id: number, getEnemiesDto: GetEnemiesDto) {
    const starship = await this.starshipRepository.findOneBy({ id });
    this.services.validateEntity(starship, 'Starship', id);

    const { latitude, longitude } = this.coordinates.toLatitudeAndLongitude(
      starship.current_location,
    );

    const enemiesList = await this.starshipRepository
      .createQueryBuilder('starship')
      .innerJoinAndSelect('starship.enemies', 'enemy')
      .addSelect(
        `10000 * ACOS(
        COS(RADIANS(${latitude})) * COS(RADIANS(SUBSTRING_INDEX(starship.current_location, ',', 1))) *
        COS(RADIANS(${longitude} - SUBSTRING_INDEX(starship.current_location, ',', -1))) +
        SIN(RADIANS(${latitude})) * SIN(RADIANS(SUBSTRING_INDEX(starship.current_location, ',', 1)))
      )`,
        'distance',
      )
      .where('starship.id != :id', { id })
      .having('distance <= :range', { range: getEnemiesDto.range })
      .getMany();

    this.services.validateEntity(enemiesList, 'Enemies');

    return enemiesList;
  }

  async remove(id: number) {
    const starship = await this.starshipRepository.findOneBy({ id });
    this.services.validateEntity(starship, 'Starship', id);

    await this.starshipRepository.delete(id);

    return this.services.message(`Starship ${id} successfull deleted`);
  }
}
