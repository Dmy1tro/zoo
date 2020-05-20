using System.ComponentModel.DataAnnotations;

namespace ZooApiService.API.ViewModels.SmartDeviceViewModels
{
    public class SmartDeviceCreateViewModel
    {
        public int AnimalId { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
