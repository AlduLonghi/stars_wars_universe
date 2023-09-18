import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { Planet } from 'src/planets/entities/planet.entity';

@Injectable()
export class CharactersService {

  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,

    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>
  ){}

  async findCharacterById(id: number) {
    const characterExists = await this.characterRepository.findOneBy({ id })

    if (!characterExists) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }
  }

  async create(createCharacterDto: CreateCharacterDto) {
    const character = this.characterRepository.create(createCharacterDto)
    return await this.characterRepository.save(character)
  }

  async findAll() {
    return await this.characterRepository.find()
  }

  async findOne(id: number) {
    return this.findCharacterById(id)
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return this.characterRepository.update(id, updateCharacterDto)
  }

  async relocateCharacter(id: number, planetId:number) {
    await this.findCharacterById(id)
    const newPlanet = await this.planetRepository.findOneBy({ id: planetId })
    return this.characterRepository.update(id, { current_location: newPlanet })
  }

  async remove(id: number) {
    await this.findCharacterById(id)
    return this.characterRepository.delete({ id })
  }
}
