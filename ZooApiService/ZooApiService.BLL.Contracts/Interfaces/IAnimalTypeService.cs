using System.Collections.Generic;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IAnimalTypeService
    {
        Task<IList<AnimalTypeDto>> GetAnimalTypes();

        Task<CreatedData> CreateAnimalTypeAsync(string typeName);

        Task RenameAnimalType(int id, string newName);

        Task DeleteAnimalType(int id);
    }
}
