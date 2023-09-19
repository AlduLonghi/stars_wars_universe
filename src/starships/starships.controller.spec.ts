import { Test, TestingModule } from '@nestjs/testing';
import { Services } from '../common/services/services';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { Starship } from './entities/starship.entity';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { GetEnemiesDto } from './dto/get-enemies.dto';

describe('CharactersController', () => {
  const mockService = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    calculateDistance: jest.fn(),
    travelTo: jest.fn(),
    setEnemy: jest.fn(),
    getEnemiesWithinRange: jest.fn(),
  };

  let controller: StarshipsController;
  let service: StarshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipsController],
      providers: [
        Services,
        {
          provide: StarshipsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<StarshipsController>(StarshipsController);
    service = module.get<StarshipsService>(StarshipsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const starship: Starship = {
    id: 12,
    name: 'name',
    cargo_capacity: 10,
    current_location: '',
    passengers: [],
    enemies: [],
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create starship', async () => {
      const starship: CreateStarshipDto = {
        name: 'name',
        cargo_capacity: 10,
        current_location: '',
      };

      await controller.create(starship);
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('find one starship', async () => {
      const id = 12;

      jest.spyOn(service, 'findOne').mockResolvedValue(starship);

      const response = await controller.findOne(id);
      expect(response).toStrictEqual(starship);
    });
  });

  describe('findAll', () => {
    it('find all starships', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([starship]);

      const response = await controller.findAll();
      expect(response).toStrictEqual([starship]);
    });
  });

  describe('update', () => {
    it('update character by id', async () => {
      const id = 12;
      const starshipDto: UpdateStarshipDto = {
        name: 'new starship name',
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ message: 'starship 12 succesfully updated' });

      const response = await controller.update(id, starshipDto);
      expect(response).toStrictEqual({
        message: 'starship 12 succesfully updated',
      });
    });
  });

  describe('calculateDistance', () => {
    it('calculate distance between starship and planet', async () => {
      const id = 12;
      const planetId = 2;

      jest
        .spyOn(service, 'calculateDistance')
        .mockResolvedValue({ distance_in_kilometers: '500' });

      const response = await controller.calculateDistance(id, planetId);
      expect(response).toStrictEqual({ distance_in_kilometers: '500' });
    });
  });

  describe('travelTo', () => {
    it('travel to planet', async () => {
      const id = 12;
      const planetId = 2;

      jest.spyOn(service, 'travelTo').mockResolvedValue({
        message: 'starship 12 succesfully relocated to planet 2',
      });

      const response = await controller.travelTo(id, planetId);
      expect(response).toStrictEqual({
        message: 'starship 12 succesfully relocated to planet 2',
      });
    });
  });

  describe('setEnemy', () => {
    it('set starship enemy', async () => {
      const id = 12;
      const planetId = 2;

      jest.spyOn(service, 'setEnemy').mockResolvedValue({
        message: 'starship 12 succesfully added as enemy of starship 2',
      });

      const response = await controller.setEnemy(id, planetId);
      expect(response).toStrictEqual({
        message: 'starship 12 succesfully added as enemy of starship 2',
      });
    });
  });

  describe('remove', () => {
    it('remove starship by id', async () => {
      const id = 12;

      jest
        .spyOn(service, 'remove')
        .mockResolvedValue({ message: 'starship 12 succesfully removed' });

      const response = await controller.remove(id);
      expect(response).toStrictEqual({
        message: 'starship 12 succesfully removed',
      });
    });
  });

  describe('getEnemiesWithinRange', () => {
    it('get enemies within range', async () => {
      const id = 12;
      const dto: GetEnemiesDto = {
        range: 900,
      };

      await controller.getEnemiesWithinRange(id, dto);
      expect(service.getEnemiesWithinRange).toHaveBeenCalled();
    });
  });
});
