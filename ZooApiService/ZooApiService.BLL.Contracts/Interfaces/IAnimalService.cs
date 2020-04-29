using System.Collections.Generic;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IAnimalService
    {
        Task<AnimalDto> GetAnimalAsync(int id);

        Task<IList<AnimalDto>> GetAnimalsAsync();

        Task<CreatedData> CreateAnimalAsync(AnimalDto animalDto);

        Task UpdateAnimalAsync(AnimalDto animalDto);

        Task DeleteAnimalAsync(int animalId);
    }
}
