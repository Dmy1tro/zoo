using System;

namespace ZooApiService.BLL.Contracts.DTO
{
    public class AnimalDto
    {
        public int AnimalId { get; set; }

        public string Name { get; set; }

        public string Gender { get; set; }

        public DateTime DateOfBirth { get; set; }
    }
}
