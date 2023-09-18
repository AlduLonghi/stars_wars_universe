import { Test, TestingModule, } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { CreatePlanetDto } from './dto/create-planet.dto';

describe('PlanetsService', () => {
  let service: PlanetsService;
  let planetRepository: Repository<Planet>

  const REPOSITORY_TOKEN = getRepositoryToken(Planet);
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        {
          provide: REPOSITORY_TOKEN,
          useValue: jest.fn(() => ({
            findOne: jest.fn(entity => entity),
          })),
      }
      ],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
    planetRepository = module.get<Repository<Planet>>(REPOSITORY_TOKEN)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('planet repository should be defined', () => {
    expect(planetRepository).toBeDefined();
  });

  describe('create planet', () => {
    it('should create a new planet', async () => {
      const planet: CreatePlanetDto ={
        name: 'tatooine',
        climate: 'dry',
        terrain: 'hill',
        coordinates: '1234,2345'
      };
    
    await service.create(planet);
    expect(planetRepository.create).toHaveBeenCalled();
    })
  })


  // it('should find planet',  async () => {
  //   const id = 12;

  //   const planetEntity: Planet = {
  //     id: 12,
  //     name: 'Tatooine',
  //     climate: 'dry',
  //     terrain: 'hill',
  //     coordinates: '40.004989,-78.890945',
  //     population: [{id: 121, name: 'Name', species: 'mandalorian', sensitivity_to_the_force: 'medium'}],
  //   };

  //   repository.createQueryBuilder.mockReturnValue(planetEntity)

  //   const result = service.findOne(id)

  //   expect(result).toEqual(planetEntity);
  // })

  // describe('find planet', () => {
  // })
});
