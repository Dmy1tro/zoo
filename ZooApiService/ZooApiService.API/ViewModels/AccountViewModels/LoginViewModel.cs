using System.ComponentModel.DataAnnotations;

namespace ZooApiService.API.ViewModels.AccountViewModels
{
    public class LoginViewModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
