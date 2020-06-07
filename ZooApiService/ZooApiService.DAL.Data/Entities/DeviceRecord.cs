using System;

namespace ZooApiService.DAL.Data.Entities
{
    public class DeviceRecord
    {
        public int DeviceRecordId { get; set; }

        public int SmartDeviceId { get; set; }

        public string Value { get; set; }

        public DateTime Date { get; set; }

        public SmartDevice SmartDevice { get; set; }
    }
}
