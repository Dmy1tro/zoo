using System.ComponentModel.DataAnnotations;

namespace ZooApiService.API.ViewModels.AnimalTypeViewModels
{
    public class AnimalTypeViewModel
    {
        public int AnimalTypeId { get; set; }

        [Required]
        public string TypeName { get; set; }
    }
}
