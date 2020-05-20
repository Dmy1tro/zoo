using System;

namespace ZooApiService.BLL.Contracts.DTO
{
    public class JobDto
    {
        public int JobId { get; set; }

        public string EmployeeId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Status { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? FinishDate { get; set; }
    }
}
