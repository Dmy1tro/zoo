using System.ComponentModel.DataAnnotations;
using ZooApiService.Common.Constants;

namespace ZooApiService.API.ViewModels.RationViewModels
{
    public class RationViewModel
    {
        public int RationId { get; set; }

        public int AnimalId { get; set; }

        [Required]
        [MaxLength(LengthConstants.SmallLength)]
        public string FoodName { get; set; }

        [MaxLength(LengthConstants.MediumLength)]
        public string Description { get; set; }
    }
}
