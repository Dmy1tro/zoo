using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IAnimalDetailsService
    {
        Task<AnimalDetailsDto> GetAnimalDetailsAsync(int animalId);

        Task<CreatedData> CreateAnimalDetailsAsync(AnimalDetailsDto model);

        Task UpdateAnimalDetailsAsync(AnimalDetailsDto model);

        Task DeleteAsync(int animalId);
    }
}
