import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Starship } from './entities/starship.entity';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>
  ){}

  async findStarshipById(id:number) {
    const starshipExists = await this.starshipRepository.findOneBy({ id })

    if (!starshipExists) {
      throw new NotFoundException(`starship with ID ${id} not found`)
    }
  }
  async create(createStarshipDto: CreateStarshipDto) {
    const starship = await this.starshipRepository.create(createStarshipDto)
    return await this.starshipRepository.save(starship);
  }

  async findAll() {
    return await this.findAll();
  }

  async findOne(id: number) {
    return await this.findStarshipById(id);
  }

  async update(id: number, updateStarshipDto: UpdateStarshipDto) {
    await this.findStarshipById(id)
    return await this.starshipRepository.update(id, updateStarshipDto)
  }

  async remove(id: number) {
    await this.findStarshipById(id)
    return await this.starshipRepository.delete(id);
  }
}
