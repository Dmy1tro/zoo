using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IDeviceRecordService
    {
        Task<IList<DeviceRecordDto>> GetRecordsAsync(int deviceId);

        Task<CreatedData> CreateRecordAsync(int deviceId, string value, DateTime date);
    }
}
