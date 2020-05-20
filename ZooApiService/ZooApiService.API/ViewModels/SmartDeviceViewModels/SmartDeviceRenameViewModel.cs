using System.ComponentModel.DataAnnotations;

namespace ZooApiService.API.ViewModels.SmartDeviceViewModels
{
    public class SmartDeviceRenameViewModel
    {
        public int SmartDeviceId { get; set; }

        [Required]
        public string NewName { get; set; }
    }
}
