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
    return 'This action adds a new character';
  }

  async findAll() {
    return await this.characterRepository.find()
  }

  async findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  async remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
