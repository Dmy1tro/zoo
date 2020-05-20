using System.ComponentModel.DataAnnotations;
using ZooApiService.Common.Constants;

namespace ZooApiService.API.ViewModels.JobViewModels
{
    public class CreateJobViewModel
    {
        [Required]
        public string EmployeeId { get; set; }

        [Required]
        [MaxLength(LengthConstants.SmallLength)]
        public string Title { get; set; }

        [MaxLength(LengthConstants.MediumLength)]
        public string Description { get; set; }
    }
}
