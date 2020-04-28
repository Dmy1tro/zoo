using System.Collections.Generic;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IRationService
    {
        public Task<RationDto> GetRationAsync(int id);

        public Task<IList<RationDto>> GetRationsAsync();

        public Task<IList<RationDto>> GetRationsForAnimalAsync(int animalId);

        public Task<CreatedData> CreateRationAsync(RationDto employee);

        public Task UpdateRationAsync(RationDto employee);

        public Task DeleteRationAsync(int id);
    }
}
