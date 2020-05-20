using System.ComponentModel.DataAnnotations;

namespace ZooApiService.API.ViewModels.DeviceRecordViewModels
{
    public class DeviceRecordCreateViewModel
    {
        public int SmartDeviceId { get; set; }

        [Required]
        public string Value { get; set; }
    }
}
