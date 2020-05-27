using System;
using static ZooApiService.Mobile.Models.BLL.Enums;

namespace ZooApiService.Mobile.Models.BLL
{
    public class Employee
    {
        public DateTime DateOfBirth { get; set; }

        public string Role { get; set; }

        public byte[] Picture { get; set; }

        public string ContentType { get; set; }

        public Gender Gender { get; set; }

        public JobPosition Position { get; set; }
    }
}
