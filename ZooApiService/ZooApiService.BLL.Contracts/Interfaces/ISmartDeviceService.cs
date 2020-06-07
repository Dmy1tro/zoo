using System.Collections.Generic;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface ISmartDeviceService
    {
        Task<SmartDeviceDto> GetDevice(int deviceId);

        Task<IList<SmartDeviceDto>> GetAllDevices();

        Task<IList<SmartDeviceDto>> GetDevices(int animalId);

        Task<CreatedData> CreateDeviceAsync(int animalId, string name, string deviceType);

        Task UpdateAsync(int deviceId, string newName, string deviceType);

        Task Delete(int deviceId);
    }
}
