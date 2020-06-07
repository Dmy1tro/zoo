using System.Collections.Generic;
using ZooApiService.DAL.Data.Enums;

namespace ZooApiService.DAL.Data.Entities
{
    public class SmartDevice
    {
        public int SmartDeviceId { get; set; }

        public int AnimalId { get; set; }

        public string Name { get; set; }

        public DeviceType? DeviceType { get; set; }

        public Animal Animal { get; set; }

        public ICollection<DeviceRecord> DeviceRecords { get; set; }
    }
}
