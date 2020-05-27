using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace ZooApiService.API.ViewModels.EmployeeViewModels
{
    public class CreateEmployeeViewModel : EmployeeViewModel
    {
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
