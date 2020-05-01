using System.ComponentModel.DataAnnotations;

namespace ZooApiService.API.ViewModels.EmployeeViewModels
{
    public class CreateEmployeeViewModel : EmployeeViewModel
    {
        [Required]
        public string Role { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
