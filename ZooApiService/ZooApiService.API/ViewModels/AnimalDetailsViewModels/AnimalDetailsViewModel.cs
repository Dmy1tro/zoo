using System.ComponentModel.DataAnnotations;
using ZooApiService.Common.Constants;

namespace ZooApiService.API.ViewModels.AnimalDetailsViewModels
{
    public class AnimalDetailsViewModel
    {
        public int AnimalDetailsId { get; set; }

        public int AnimalId { get; set; }

        public double? Weight { get; set; }

        public double? Height { get; set; }

        public double? BodyLength { get; set; }

        public double? TailLength { get; set; }

        public decimal? Price { get; set; }

        [MaxLength(LengthConstants.MediumLength)]
        public string AdditionalInfo { get; set; }
    }
}
