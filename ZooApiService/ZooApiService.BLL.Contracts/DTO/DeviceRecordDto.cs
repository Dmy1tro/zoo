using System;

namespace ZooApiService.BLL.Contracts.DTO
{
    public class DeviceRecordDto
    {
        public int DeviceRecordId { get; set; }

        public int SmartDeviceId { get; set; }

        public string Value { get; set; }

        public DateTime Date { get; set; }
    }
}
