import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharactersService {

  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>
  ) { }

  async create(createCharacterDto: CreateCharacterDto) {
    // creatre makes dto validations to entity
    const character = this.characterRepository.create(createCharacterDto)
    return await this.characterRepository.save(character)
  }

  async findAll() {
    return await this.characterRepository.find()
  }

  async findOne(id: number) {
    return this.characterRepository.findOneBy({ id })
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return this.characterRepository.update(id, updateCharacterDto)
  }

  async remove(id: number) {
    await this.characterRepository.findOneBy({ id })
    return this.characterRepository.delete({ id })
  }
}
