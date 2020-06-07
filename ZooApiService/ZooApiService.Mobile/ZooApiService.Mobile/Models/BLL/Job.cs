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

        public string CreationDate { get; set; }

        public string StartDate { get; set; }

        public string FinishDate { get; set; }
    }

}
