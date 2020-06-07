using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.Common.Constants;
using ZooApiService.Common.Exceptions.BusinessLogic;
using ZooApiService.DAL.Data.Context;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.BLL.Domain.Services
{
    public class AnimalService : IAnimalService
    {
        private readonly ZooDbContext _dbContext;
        private readonly IMapper _mapper;

        public AnimalService(ZooDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<AnimalFullDto> GetAnimalAsync(int id)
        {
            var animalDbo = await _dbContext.Animals
                .Include(x => x.AnimalType)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AnimalId == id);

            if (animalDbo is null)
            {
                throw new NotFoundException(EntityName.Animal, id);
            }

            var animalDto = _mapper.Map<AnimalFullDto>(animalDbo);

            return animalDto;
        }

        public async Task<IList<AnimalFullDto>> GetAnimalsAsync()
        {
            var animalDbo = await _dbContext.Animals
                .Include(x => x.AnimalType)
                .Select(withoutPicture)
                .AsNoTracking()
                .ToListAsync();

            var animalsDto = _mapper.Map<List<AnimalFullDto>>(animalDbo);

            return animalsDto;
        }

        public async Task<CreatedData> CreateAnimalAsync(AnimalDto animalDto)
        {
            var animalDbo = _mapper.Map<Animal>(animalDto);

            _dbContext.Animals.Add(animalDbo);

            await _dbContext.SaveChangesAsync();

            return new CreatedData(animalDbo.AnimalId);
        }

        public async Task UpdatePicture(int id, byte[] pictureBytes, string contentType)
        {
            var animalDbo = await _dbContext.Animals
                .FirstOrDefaultAsync(x => x.AnimalId == id);

            animalDbo.Picture = pictureBytes;
            animalDbo.ContentType = contentType;

            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAnimalAsync(AnimalDto animalDto)
        {
            var animalDbo = _mapper.Map<Animal>(animalDto);

            var loaded = await _dbContext.Animals
                .FirstOrDefaultAsync(x => x.AnimalId == animalDbo.AnimalId);

            loaded.AnimalTypeId = animalDbo.AnimalTypeId;
            loaded.DateOfBirth = animalDbo.DateOfBirth;
            loaded.Gender = animalDbo.Gender;
            loaded.Name = animalDbo.Name;

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAnimalAsync(int animalId)
        {
            var animalDbo = await _dbContext.Animals
                .FirstOrDefaultAsync(x => x.AnimalId == animalId);

            if (animalDbo is null)
            {
                throw new NotFoundException(EntityName.Animal, animalId);
            }
            
            _dbContext.Animals.Remove(animalDbo);

            await _dbContext.SaveChangesAsync();
        }

        private readonly Expression<Func<Animal, Animal>> withoutPicture =
            (x) => new Animal
            {
                AnimalId = x.AnimalId,
                AnimalType = x.AnimalType,
                AnimalTypeId = x.AnimalTypeId,
                DateOfBirth = x.DateOfBirth,
                Gender = x.Gender,
                Name = x.Name,
                ContentType = null,
                Picture = null
            };
    }
}
