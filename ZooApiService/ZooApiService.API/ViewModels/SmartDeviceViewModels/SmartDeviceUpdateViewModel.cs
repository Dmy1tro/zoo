using System.ComponentModel.DataAnnotations;

namespace ZooApiService.API.ViewModels.SmartDeviceViewModels
{
    public class SmartDeviceUpdateViewModel
    {
        public int SmartDeviceId { get; set; }

        [Required]
        public string NewName { get; set; }

        [Required] 
        public string DeviceType { get; set; }
    }
}
