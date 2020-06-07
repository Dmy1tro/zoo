using System.ComponentModel.DataAnnotations;

namespace ZooApiService.API.ViewModels.AnimalTypeViewModels
{
    public class AnimalTypeCreateViewModel
    {
        [Required]
        public string TypeName { get; set; }
    }
}
