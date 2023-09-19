import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Post(':id/board/:starshipId')
  boardToStarship(@Param('id') id: number, @Param('starshipId') starshipId: number) {
    return this.charactersService.boardToStarship(id, starshipId);
  }

  @Post(':id/disembark/:starshipId')
  disembarkFromStarship(@Param('id') id: number, @Param('starshipId') starshipId: number) {
    return this.charactersService.disembarkFromStarship(id, starshipId);
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.charactersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Patch(':id/relocate/:planetId')
  relocateCharacter(
    @Param('id') id: number,
    @Param('planetId') planetId: number,
  ) {
    return this.charactersService.relocateCharacter(id, planetId);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.charactersService.remove(id);
  }
}
