using System.Collections.Generic;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IRationService
    {
        Task<RationDto> GetRationAsync(int id);

        Task<IList<RationDto>> GetRationsAsync();

        Task<IList<RationDto>> GetRationsForAnimalAsync(int animalId);

        Task<CreatedData> CreateRationAsync(RationDto rationDto);

        Task UpdateRationAsync(RationDto rationDto);

        Task DeleteRationAsync(int id);
    }
}
