using System.Collections.Generic;
using System.Linq;
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
    public class RationService : IRationService
    {
        private readonly ZooDbContext _dbContext;
        private readonly IMapper _mapper;

        public RationService(ZooDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<RationDto> GetRationAsync(int id)
        {
            var rationDbo = await _dbContext.Rations
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.RationId == id);

            if (rationDbo is null)
            {
                throw new NotFoundException(EntityName.Ration, id);
            }

            var rationDto = _mapper.Map<RationDto>(rationDbo);

            return rationDto;
        }

        public async Task<IList<RationDto>> GetRationsAsync()
        {
            var rationsDbo = await _dbContext.Rations
                .AsNoTracking()
                .ToListAsync();

            var rationsDto = _mapper.Map<List<RationDto>>(rationsDbo);

            return rationsDto;
        }

        public async Task<IList<RationDto>> GetRationsForAnimalAsync(int animalId)
        {
            var rationsDbo = await _dbContext.Rations
                .AsNoTracking()
                .Where(x => x.AnimalId == animalId)
                .ToListAsync();

            var rationsDto = _mapper.Map<List<RationDto>>(rationsDbo);

            return rationsDto;
        }

        public async Task<CreatedData> CreateRationAsync(RationDto rationDto)
        {
            var rationDbo = _mapper.Map<Ration>(rationDto);

            _dbContext.Rations.Add(rationDbo);

            await _dbContext.SaveChangesAsync();

            return new CreatedData(rationDbo.RationId);
        }

        public async Task UpdateRationAsync(RationDto rationDto)
        {
            var rationDbo = _mapper.Map<Ration>(rationDto);

            _dbContext.Rations.Update(rationDbo);

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteRationAsync(int id)
        {
            var rationDbo = await _dbContext.Rations
                .FirstOrDefaultAsync(x => x.RationId == id);

            if (rationDbo is null)
            {
                throw new NotFoundException(EntityName.Ration, id);
            }

            _dbContext.Rations.Remove(rationDbo);

            await _dbContext.SaveChangesAsync();
        }
    }
}
