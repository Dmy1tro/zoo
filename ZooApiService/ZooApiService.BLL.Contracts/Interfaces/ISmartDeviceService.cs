using System.Collections.Generic;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface ISmartDeviceService
    {
        Task<SmartDeviceDto> GetDevice(int deviceId);

        Task<IList<SmartDeviceDto>> GetDevices(int animalId);

        Task<CreatedData> CreateDeviceAsync(int animalId, string name);

        Task Rename(int deviceId, string newName);

        Task Delete(int deviceId);
    }
}
