using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using ZooApiService.API.Infrastructure.ModelValidations;

namespace ZooApiService.API.ViewModels.EmployeeViewModels
{
    public class ChangeAvatarViewModel
    {
        [DataType(DataType.Upload)]
        [AllowedExtensions(new[] { ".jpeg", ".bmp", ".png", ".jpg" })]
        public IFormFile Picture { get; set; }
    }
}
