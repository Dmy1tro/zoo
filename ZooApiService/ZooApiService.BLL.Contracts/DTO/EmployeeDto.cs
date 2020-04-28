using System;

namespace ZooApiService.BLL.Contracts.DTO
{
    public class EmployeeDto
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Gender { get; set; }

        public string Position { get; set; }
    }
}
