using System;

namespace ZooApiService.BLL.Contracts.DTO
{
    public class EmployeeDto
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Gender { get; set; }

        public string Position { get; set; }

        public string Role { get; set; }

        public byte[] Picture { get; set; }

        public string ContentType { get; set; }
    }
}
