using System;
using System.ComponentModel.DataAnnotations;
using ZooApiService.Common.Constants;

namespace ZooApiService.API.ViewModels.AnimalViewModels
{
    public class AnimalViewModel
    {
        public int AnimalId { get; set; }

        public int AnimalTypeId { get; set; }

        [Required]
        [MaxLength(LengthConstants.SmallLength)]
        public string Name { get; set; }

        [Required]
        public string Gender { get; set; }

        public DateTime DateOfBirth { get; set; }
    }
}
