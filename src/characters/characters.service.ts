import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { Planet } from '../planets/entities/planet.entity';
import { Services } from '../common/services/services';
import { Starship } from '../starships/entities/starship.entity';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,

    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,

    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,

    @Inject(Services)
    private readonly services: Services,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const character = this.characterRepository.create(createCharacterDto);
    return await this.characterRepository.save(character);
  }

  async findAll() {
    const list = await this.characterRepository.find();
    this.services.validateEntity(list, 'Character');

    return list;
  }

  async findOne(id: number) {
    const character = await this.characterRepository.findOneBy({ id });
    this.services.validateEntity(character, 'Character', id);

    return character;
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    const character = await this.characterRepository.findOneBy({ id });
    this.services.validateEntity(character, 'Character', id);

    await this.characterRepository.update(id, updateCharacterDto);
    return this.services.message(`Character ${id} succesfully updated`);
  }

  async relocateCharacter(id: number, planetId: number) {
    const character = await this.characterRepository.findOneBy({ id });
    this.services.validateEntity(character, 'Character', id);

    const planet = await this.planetRepository.findOneBy({ id: planetId });
    this.services.validateEntity(planet, 'Planet', planetId);
    await this.characterRepository.update(id, { current_location: planet });

    return this.services.message(
      `Character ${id} succesfully relocated to planet ${planetId}`,
    );
  }

  async boardToStarship(id: number, starshipId: number) {
    const character = await this.characterRepository.findOneBy({ id });
    this.services.validateEntity(character, 'Character', id);

    const starship = await this.starshipRepository.findOneBy({
      id: starshipId,
    });
    this.services.validateEntity(starship, 'Starship', starshipId);

    await this.characterRepository.update(id, { starship: starship });
    return this.services.message(
      `Character ${id} succesfully embarked on starship ${starshipId}`,
    );
  }

  async disembarkFromStarship(id: number, starshipId: number) {
    const character = await this.characterRepository
      .createQueryBuilder('character')
      .where('character.id=:id', { id })
      .leftJoinAndSelect('character.starship', 'starship')
      .getOne();

    this.services.validateEntity(character, 'Character', id);

    const starship = await this.starshipRepository.findOneBy({
      id: starshipId,
    });
    this.services.validateEntity(starship, 'Starship', starshipId);

    if (character.starship.id !== starshipId) {
      throw new BadRequestException(
        `Character ${id} is not boarded on starship ${starshipId}`,
      );
    }

    await this.characterRepository.update(id, { starship: null });
    return this.services.message(
      `Character ${id} succesfully disembarked from starship ${starshipId}`,
    );
  }

  async remove(id: number) {
    const character = await this.characterRepository.findOneBy({ id });
    this.services.validateEntity(character, 'Character', id);

    await this.characterRepository.remove(character);
    return this.services.message(`Character ${id} succesfully deleted`);
  }
}
