using System;
using System.ComponentModel.DataAnnotations;
using ZooApiService.Common.Constants;

namespace ZooApiService.API.ViewModels.JobViewModels
{
    public class JobViewModel
    {
        public int JobId { get; set; }

        [Required]
        [MaxLength(LengthConstants.SmallLength)]
        public string Title { get; set; }

        [MaxLength(LengthConstants.MediumLength)]
        public string Description { get; set; }

        [Required]
        public string Status { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? FinishDate { get; set; }
    }
}
