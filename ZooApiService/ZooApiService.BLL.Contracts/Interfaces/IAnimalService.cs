using System.Collections.Generic;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IAnimalService
    {
        public Task<AnimalDto> GetAnimalAsync(int id);

        public Task<IList<AnimalDto>> GetAnimalsAsync();

        public Task<CreatedData> CreateAnimalAsync(AnimalDto animal);

        public Task UpdateAnimalAsync(AnimalDto animal);

        public Task DeleteAnimalAsync(int animalId);
    }
}
