using System;
using System.Collections.Generic;
using ZooApiService.DAL.Data.Enums;

namespace ZooApiService.DAL.Data.Entities
{
    public class Animal
    {
        public int AnimalId { get; set; }

        public int AnimalTypeId { get; set; }

        public string Name { get; set; }

        public Gender Gender { get; set; }

        public DateTime DateOfBirth { get; set; }

        public byte[] Picture { get; set; }

        public string ContentType { get; set; }

        public AnimalDetails AnimalDetails { get; set; }

        public AnimalType AnimalType { get; set; }

        public ICollection<SmartDevice> SmartDevices { get; set; }
    }
}
