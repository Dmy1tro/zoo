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
    public class AnimalTypeService : IAnimalTypeService
    {
        private readonly ZooDbContext _context;
        private readonly IMapper _mapper;

        public AnimalTypeService(ZooDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AnimalTypeDto> GetAsync(int id)
        {
            var type = await _context.AnimalTypes
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AnimalTypeId == id);

            var dto = _mapper.Map<AnimalTypeDto>(type);

            return dto;
        }

        public async Task<IList<AnimalTypeDto>> GetAnimalTypes()
        {
            var types = await _context.AnimalTypes
                .AsNoTracking()
                .ToListAsync();

            var typesDto = _mapper.Map<List<AnimalTypeDto>>(types);

            return typesDto;
        }

        public async Task<CreatedData> CreateAnimalTypeAsync(string typeName)
        {
            var animalType = new AnimalType
            {
                TypeName = typeName
            };

            _context.AnimalTypes.Add(animalType);

            await _context.SaveChangesAsync();

            return new CreatedData(animalType.AnimalTypeId);
        }

        public async Task RenameAnimalType(int id, string newName)
        {
            var type = await _context.AnimalTypes
                .FirstOrDefaultAsync(x => x.AnimalTypeId == id);

            if (type is null)
            {
                throw new NotFoundException(EntityName.AnimalType, id);
            }

            type.TypeName = newName;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAnimalType(int id)
        {
            var type = await _context.AnimalTypes
                .FirstOrDefaultAsync(x => x.AnimalTypeId == id);

            if (type is null)
            {
                throw new NotFoundException(EntityName.AnimalType, id);
            }

            _context.AnimalTypes.Remove(type);

            await _context.SaveChangesAsync();
        }
    }
}
