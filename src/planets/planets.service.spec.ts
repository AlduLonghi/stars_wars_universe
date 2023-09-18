import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdateCharacterDto } from 'src/characters/dto/update-character.dto';

describe('PlanetsService', () => {
  const mockPlanetRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  let service: PlanetsService;
  let planetRepository: Repository<Planet>;

  const REPOSITORY_TOKEN = getRepositoryToken(Planet);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        {
          provide: REPOSITORY_TOKEN,
          useValue: mockPlanetRepository,
        },
      ],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
    planetRepository = module.get<Repository<Planet>>(REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('planet repository should be defined', () => {
    expect(planetRepository).toBeDefined();
  });

  describe('create planet', () => {
    it('should create a new planet', async () => {
      const planet: CreatePlanetDto = {
        name: 'tatooine',
        climate: 'dry',
        terrain: 'hill',
        coordinates: '1234,2345',
      };

      await service.create(planet);
      expect(planetRepository.create).toHaveBeenCalledWith(planet);
    });
  });

  describe('find all planets', () => {
    it('should find all planets', async () => {
      mockPlanetRepository.find.mockReturnValueOnce([]);

      const response = await service.findAll();
      expect(response).toEqual([]);
    });
  });

  describe('find one', () => {
    it('should find one by id', async () => {
      const planet: Planet = {
        id: 12,
        name: 'tatooine',
        climate: 'dry',
        terrain: 'hill',
        coordinates: '1234,2345',
        population: [],
      };
      const id = 12;

      mockPlanetRepository.createQueryBuilder.mockReturnValueOnce({
        where: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        loadRelationCountAndMap: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(planet),
      });

      const response = await service.findOne(id);
      expect(response).toEqual(planet);
    });
  });

  describe('update', () => {
    it('should update by id', async () => {
      const planet: UpdateCharacterDto = {
        name: 'tatooine',
      };

      const id = 12;

      await service.update(id, planet);
      expect(planetRepository.update).toHaveBeenCalledWith(id, planet);
    });
  });


  describe('remove', () => {
    it('should remove by id', async () => {
      const id = 12;

      await service.remove(id);
      expect(planetRepository.delete).toHaveBeenCalled();
    });
  });
});
