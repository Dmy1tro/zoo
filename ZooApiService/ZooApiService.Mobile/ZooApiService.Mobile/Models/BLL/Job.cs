using System;
using static ZooApiService.Mobile.Models.BLL.Enums;

namespace ZooApiService.Mobile.Models.BLL
{
    public class Job
    {
        public int JobId { get; set; }

        public string EmployeeId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public JobStatus Status { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? FinishDate { get; set; }
    }

}
