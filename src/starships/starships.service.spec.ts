import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsService } from './starships.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Character } from '../characters/entities/character.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Starship } from './entities/starship.entity';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { Services } from '../common/services/services';
import { Coordinates } from '../common/coordinates/coordinates';
import { UpdateStarshipDto } from './dto/update-starship.dto';

describe('StarshipsService', () => {
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn(),
    setEnemy: jest.fn(),
    findOne: jest.fn(),
  };
  let service: StarshipsService;
  let starshipsRepository: Repository<Starship>;
  let planetRepository: Repository<Planet>;
  let characterRepository: Repository<Character>;

  const REPOSITORY_TOKEN = getRepositoryToken(Starship);
  const CHARACTERS_REPOSITORY_TOKEN = getRepositoryToken(Character);
  const PLANETS_REPOSITORY_TOKEN = getRepositoryToken(Planet);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipsService,
        Coordinates,
        Services,
        {
          provide: REPOSITORY_TOKEN,
          useValue: mockRepository,
        },
        {
          provide: CHARACTERS_REPOSITORY_TOKEN,
          useValue: mockRepository,
        },
        {
          provide: PLANETS_REPOSITORY_TOKEN,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StarshipsService>(StarshipsService);
    starshipsRepository = module.get<Repository<Starship>>(REPOSITORY_TOKEN);
    characterRepository = module.get<Repository<Character>>(
      CHARACTERS_REPOSITORY_TOKEN,
    );
    planetRepository = module.get<Repository<Planet>>(PLANETS_REPOSITORY_TOKEN);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const starship: Starship = {
    id: 12,
    name: 'Yoda',
    cargo_capacity: 100,
    passengers: [],
    enemies: [],
    current_location: '',
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create starship', () => {
    it('should create a new planet', async () => {
      const starship: CreateStarshipDto = {
        name: 'excecutor',
        cargo_capacity: 10,
        current_location: '88.898765, 32.123212',
      };

      await service.create(starship);
      expect(planetRepository.create).toHaveBeenCalledWith(starship);
    });
  });

  describe('find all starships', () => {
    it('should find all planets', async () => {
      jest.spyOn(mockRepository, 'find').mockResolvedValueOnce([]);

      const response = await service.findAll();
      expect(response).toEqual([]);
    });
  });

  describe('find one', () => {
    it('should find one starship by id', async () => {
      const id = 12;

      jest.spyOn(starshipsRepository, 'findOne').mockResolvedValue(starship);

      const response = await service.findOne(id);
      expect(response).toEqual(starship);
      expect(starshipsRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update by id', async () => {
      const starshipDto: UpdateStarshipDto = {
        name: 'tatooine',
      };

      const id = 12;

      jest.spyOn(starshipsRepository, 'findOneBy').mockResolvedValue(starship);

      await service.update(id, starshipDto);
      expect(starshipsRepository.update).toHaveBeenCalledWith(id, starshipDto);
    });
  });

  describe('remove', () => {
    it('should remove by id', async () => {
      const id = 12;

      jest.spyOn(starshipsRepository, 'findOneBy').mockResolvedValue(starship);

      await service.remove(id);
      expect(starshipsRepository.delete).toHaveBeenCalled();
    });
  });

  describe('set enemy', () => {
    it('should set enemy', async () => {
      const id = 12;
      const enemyId = 1;

      jest.spyOn(starshipsRepository, 'findOne').mockResolvedValue(starship);

      const result = await service.setEnemy(id, enemyId);
      expect(starshipsRepository.save).toHaveBeenCalled();
    });
  });
});
