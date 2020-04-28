using System;
using Microsoft.AspNetCore.Identity;
using ZooApiService.DAL.Data.Enums;

namespace ZooApiService.DAL.Data.Entities
{
    public class Employee : IdentityUser
    {
        public DateTime DateOfBirth { get; set; }

        public Gender Gender { get; set; }

        public JobPosition Position { get; set; }
    }
}
