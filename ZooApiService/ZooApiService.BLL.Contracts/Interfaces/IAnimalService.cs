using System.Collections.Generic;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IAnimalService
    {
        Task<AnimalFullDto> GetAnimalAsync(int id);

        Task<IList<AnimalFullDto>> GetAnimalsAsync();

        Task<CreatedData> CreateAnimalAsync(AnimalDto animalDto);

        Task UpdateAnimalAsync(AnimalDto animalDto);

        Task DeleteAnimalAsync(int animalId);
    }
}
