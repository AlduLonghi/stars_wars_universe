import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { Planet } from '../planets/entities/planet.entity';
import { Starship } from '../starships/entities/starship.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Services } from '../common/services/services';

describe('CharactersService', () => {
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn(),
  };
  let service: CharactersService;
  let characterRepository: Repository<Character>;
  let planetRepository: Repository<Planet>;
  let starshipRepository: Repository<Starship>;

  const REPOSITORY_TOKEN = getRepositoryToken(Character);
  const PLANET_REPOSITORY_TOKEN = getRepositoryToken(Planet);
  const STARSHIP_REPOSITORY_TOKEN = getRepositoryToken(Starship);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        Services,
        {
          provide: REPOSITORY_TOKEN,
          useValue: mockRepository,
        },
        {
          provide: PLANET_REPOSITORY_TOKEN,
          useValue: mockRepository,
        },
        {
          provide: STARSHIP_REPOSITORY_TOKEN,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
    characterRepository = module.get<Repository<Character>>(REPOSITORY_TOKEN);
    planetRepository = module.get<Repository<Planet>>(PLANET_REPOSITORY_TOKEN);
    starshipRepository = module.get<Repository<Starship>>(
      STARSHIP_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create Character', () => {
    it('should create a new Character', async () => {
      const character: CreateCharacterDto = {
        name: 'Yoda',
        sensitivity_to_the_force: 'medium',
        species: 'jedi',
      };

      await service.create(character);
      expect(planetRepository.create).toHaveBeenCalledWith(character);
      expect(planetRepository.save).toHaveBeenCalled();
    });
  });

  describe('find all characters', () => {
    it('should find all characters', async () => {
      const character: Character = {
        id: 12,
        name: 'Yoda',
        sensitivity_to_the_force: 'medium',
        species: 'jedi',
        current_location: new Planet(),
        starship: new Starship(),
      };

      mockRepository.find.mockReturnValueOnce({ character });
      const response = await service.findAll();

      expect(response).toStrictEqual({ character });
    });

    it('should fail when find all characters is empty', async () => {
      mockRepository.find.mockReturnValueOnce([]);
      let response;

      try {
        response = await service.findAll();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('find one', () => {
    it('should find one character by id', async () => {
      const character: Character = {
        id: 12,
        name: 'Yoda',
        sensitivity_to_the_force: 'medium',
        species: 'jedi',
        current_location: new Planet(),
        starship: new Starship(),
      };
      const id = 12;

      jest.spyOn(characterRepository, 'findOneBy').mockResolvedValue(character);

      const response = await service.findOne(id);
      expect(response).toEqual(character);
      expect(characterRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update by id', async () => {
      const character: UpdateCharacterDto = {
        name: 'tatooine',
      };

      const id = 12;

      await service.update(id, character);
      expect(planetRepository.update).toHaveBeenCalledWith(id, character);
    });
  });

  describe('relocate character', () => {
    it('should update by id', async () => {
      const character: Character = {
        id: 12,
        name: 'Yoda',
        sensitivity_to_the_force: 'medium',
        species: 'jedi',
        current_location: new Planet(),
        starship: new Starship(),
      };

      const id = 12;
      const planetId = 13;

      jest.spyOn(characterRepository, 'findOneBy').mockResolvedValue(character);
      jest.spyOn(planetRepository, 'findOneBy').mockResolvedValue(new Planet());

      await service.relocateCharacter(id, planetId);
      expect(planetRepository.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove by id', async () => {
      const id = 12;

      await service.remove(id);
      expect(planetRepository.delete).toHaveBeenCalled();
    });
  });

  describe('board character to starship', () => {
    it('should board character to starship', async () => {
      const id = 12;
      const starshipId = 2;

      await service.boardToStarship(id, starshipId);
      expect(characterRepository.update).toHaveBeenCalled();
    });
  });

  describe('disembark character to starship', () => {
    it('should board character to starship', async () => {
      const id = 12;
      const starshipId = 2;

      const starship: Starship = {
        id: 2,
        name: 'name',
        cargo_capacity: 10,
        current_location: '',
        passengers: [],
        enemies: [],
      };

      const character: Character = {
        id: 12,
        name: 'name',
        species: 'species',
        sensitivity_to_the_force: 'high',
        starship: starship,
      };

      mockRepository.createQueryBuilder.mockReturnValueOnce({
        where: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(character),
      });

      await service.disembarkFromStarship(id, starshipId);
      expect(characterRepository.update).toHaveBeenCalled();
    });
  });
});
