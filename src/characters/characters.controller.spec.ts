import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { Character } from './entities/character.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Services } from '../common/services/services';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

describe('CharactersController', () => {
  const mockService = {
    create: jest.fn(),
    boardToStarship: jest.fn(),
    disembarkFromStarship: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    relocateCharacter: jest.fn(),
    remove: jest.fn(),
  };

  let controller: CharactersController;
  let service: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        Services,
        {
          provide: CharactersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
    service = module.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create character', async () => {
      const character: CreateCharacterDto = {
        name: 'name',
        species: 'mandalorian',
        sensitivity_to_the_force: 'high',
      };

      await controller.create(character);
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('boardToStarship controller', () => {
    it('should board character', async () => {
      const id = 12;
      const starshipId = 13;

      jest.spyOn(service, 'boardToStarship').mockResolvedValueOnce({
        message: 'Character 12 succesfully embarked on starship 13',
      });

      const response = await controller.boardToStarship(id, starshipId);
      expect(response).toStrictEqual({
        message: 'Character 12 succesfully embarked on starship 13',
      });
    });
  });

  describe('disembarFromStarship controller', () => {
    it('should disembark character', async () => {
      const id = 12;
      const starshipId = 13;

      jest.spyOn(service, 'disembarkFromStarship').mockResolvedValueOnce({
        message: 'Character 12 succesfully disembarked from starship 13',
      });

      const response = await controller.disembarkFromStarship(id, starshipId);
      expect(response).toStrictEqual({
        message: 'Character 12 succesfully disembarked from starship 13',
      });
    });
  });

  describe('findOne controller', () => {
    it('find one character', async () => {
      const id = 12;

      const character: Character = {
        id: 12,
        name: 'name',
        species: 'mandalorian',
        sensitivity_to_the_force: 'high',
        current_location: new Planet(),
        starship: new Starship(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(character);

      const response = await controller.findOne(id);
      expect(response).toStrictEqual(character);
    });
  });

  describe('findAll controller', () => {
    it('find all characters', async () => {
      const character: Character = {
        id: 12,
        name: 'name',
        species: 'mandalorian',
        sensitivity_to_the_force: 'high',
        current_location: new Planet(),
        starship: new Starship(),
      };

      jest.spyOn(service, 'findAll').mockResolvedValue([character]);

      const response = await controller.findAll();
      expect(response).toStrictEqual([character]);
    });
  });

  describe('update', () => {
    it('update character by id', async () => {
      const id = 12;
      const character: UpdateCharacterDto = {
        species: 'mandalorian',
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ message: 'Character 12 succesfully updated' });

      const response = await controller.update(id, character);
      expect(response).toStrictEqual({
        message: 'Character 12 succesfully updated',
      });
    });
  });

  describe('relocateCharacter controller', () => {
    it('relocate character by id', async () => {
      const id = 12;
      const planetId = 1;

      jest
        .spyOn(service, 'relocateCharacter')
        .mockResolvedValue({ message: 'Character 12 succesfully relocated' });

      const response = await controller.relocateCharacter(id, planetId);
      expect(response).toStrictEqual({
        message: 'Character 12 succesfully relocated',
      });
    });
  });

  describe('remove character controller', () => {
    it('remove character by id', async () => {
      const id = 12;

      jest
        .spyOn(service, 'remove')
        .mockResolvedValue({ message: 'Character 12 succesfully removed' });

      const response = await controller.remove(id);
      expect(response).toStrictEqual({
        message: 'Character 12 succesfully removed',
      });
    });
  });
});
