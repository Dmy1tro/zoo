using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using ZooApiService.DAL.Data.Enums;

namespace ZooApiService.DAL.Data.Entities
{
    public class Employee : IdentityUser
    {
        public DateTime DateOfBirth { get; set; }

        public string Role { get; set; }

        public byte[] Picture { get; set; }

        public string ContentType { get; set; }

        public Gender Gender { get; set; }

        public JobPosition Position { get; set; }

        public ICollection<Job> Jobs { get; set; }
    }
}
