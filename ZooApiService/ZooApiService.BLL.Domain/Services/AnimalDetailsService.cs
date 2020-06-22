using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.Common.Constants;
using ZooApiService.Common.Exceptions.BusinessLogic;
using ZooApiService.DAL.Data.Context;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.BLL.Domain.Services
{
    public class AnimalDetailsService : IAnimalDetailsService
    {
        private readonly ZooDbContext _context;
        private readonly IMapper _mapper;

        public AnimalDetailsService(ZooDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AnimalDetailsDto> GetAnimalDetailsAsync(int animalId)
        {
            var detail = await _context.AnimalDetails
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AnimalId == animalId);

            var dto = _mapper.Map<AnimalDetailsDto>(detail);

            return dto;
        }

        public async Task<CreatedData> CreateAnimalDetailsAsync(AnimalDetailsDto model)
        {
            var detail = _mapper.Map<AnimalDetails>(model);

            _context.AnimalDetails.Add(detail);

            await _context.SaveChangesAsync();

            return new CreatedData(detail.AnimalDetailsId);
        }

        public async Task UpdateAnimalDetailsAsync(AnimalDetailsDto model)
        {
            var detail = await _context.AnimalDetails
                .FirstOrDefaultAsync(x => x.AnimalDetailsId == model.AnimalDetailsId);

            if (detail is null)
            {
                throw new NotFoundException(EntityName.AnimalDetails, $"AnimalId - '{model.AnimalId}'");
            }

            detail.AdditionalInfo = model.AdditionalInfo;
            detail.BodyLength = model.BodyLength;
            detail.Height = model.Height;
            detail.Price = model.Price;
            detail.TailLength = model.TailLength;
            detail.Weight = model.Weight;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int animalId)
        {
            var detail = await _context.AnimalDetails
                .FirstOrDefaultAsync(x => x.AnimalId == animalId);

            if (detail != null)
            {
                _context.AnimalDetails.Remove(detail);

                await _context.SaveChangesAsync();
            }
        }
    }
}
