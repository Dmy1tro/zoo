using System.Collections.Generic;
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

        public async Task<AnimalDto> GetAnimalAsync(int id)
        {
            var animalDbo = await _dbContext.Animals
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AnimalId == id);

            if (animalDbo is null)
            {
                throw new NotFoundException(EntityName.Animal, id);
            }

            var animalDto = _mapper.Map<AnimalDto>(animalDbo);

            return animalDto;
        }

        public async Task<IList<AnimalDto>> GetAnimalsAsync()
        {
            var animalDbo = await _dbContext.Animals
                .AsNoTracking()
                .ToListAsync();

            var animalsDto = _mapper.Map<List<AnimalDto>>(animalDbo);

            return animalsDto;
        }

        public async Task<CreatedData> CreateAnimalAsync(AnimalDto animalDto)
        {
            var animalDbo = _mapper.Map<Animal>(animalDto);

            _dbContext.Animals.Add(animalDbo);

            await _dbContext.SaveChangesAsync();

            return new CreatedData(animalDbo.AnimalId);
        }

        public async Task UpdateAnimalAsync(AnimalDto animalDto)
        {
            var animalDbo = _mapper.Map<Animal>(animalDto);

            _dbContext.Animals.Update(animalDbo);

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
    }
}
