import { Test, TestingModule } from '@nestjs/testing';
import { Services } from '../common/services/services';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';

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

  let controller: PlanetsController;
  let service: PlanetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [
        Services,
        {
          provide: PlanetsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PlanetsController>(PlanetsController);
    service = module.get<PlanetsService>(PlanetsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const planet: Planet = {
    id: 12,
    name: 'name',
    terrain: 'hill',
    climate: 'ice',
    coordinates: '',
    population: [],
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create planet', async () => {
      const planet: CreatePlanetDto = {
        name: 'name',
        coordinates: '',
        climate: 'dry',
        terrain: 'hill',
      };

      await controller.create(planet);
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('find one planet', async () => {
      const id = 12;

      jest.spyOn(service, 'findOne').mockResolvedValue(planet);

      const response = await controller.findOne(id);
      expect(response).toStrictEqual(planet);
    });
  });

  describe('findAll', () => {
    it('find all planets', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([planet]);

      const response = await controller.findAll();
      expect(response).toStrictEqual([planet]);
    });
  });

  describe('update', () => {
    it('update planet by id', async () => {
      const id = 12;
      const planetDto: UpdatePlanetDto = {
        name: 'new planet name',
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ message: 'Planet 12 succesfully updated' });

      const response = await controller.update(id, planetDto);
      expect(response).toStrictEqual({
        message: 'Planet 12 succesfully updated',
      });
    });
  });

  describe('remove', () => {
    it('remove planet by id', async () => {
      const id = 12;

      jest
        .spyOn(service, 'remove')
        .mockResolvedValue({ message: 'Planet 12 succesfully removed' });

      const response = await controller.remove(id);
      expect(response).toStrictEqual({
        message: 'Planet 12 succesfully removed',
      });
    });
  });
});
