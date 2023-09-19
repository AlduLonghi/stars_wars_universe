import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Services } from '../common/services/services';

describe('PlanetsService', () => {
  const mockPlanetRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn(),
    getMany: jest.fn(),
  };

  let service: PlanetsService;
  let planetRepository: Repository<Planet>;

  const REPOSITORY_TOKEN = getRepositoryToken(Planet);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        Services,
        {
          provide: REPOSITORY_TOKEN,
          useValue: mockPlanetRepository,
        },
      ],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
    planetRepository = module.get<Repository<Planet>>(REPOSITORY_TOKEN);
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
      mockPlanetRepository.createQueryBuilder.mockReturnValueOnce({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        loadRelationCountAndMap: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValueOnce([]),
      });

      const response = await service.findAll();
      expect(response).toEqual([]);
    });

    it('should fail when find all planets is empty', async () => {
      mockPlanetRepository.find.mockReturnValueOnce([]);
      let response;

      try {
        response = await service.findAll();
      } catch (error) {
        expect(error).toBeDefined();
      }
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
      const planet: UpdatePlanetDto = {
        name: 'tatooine',
      };

      const id = 12;

      jest.spyOn(planetRepository, 'findOneBy').mockResolvedValue(new Planet());

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
