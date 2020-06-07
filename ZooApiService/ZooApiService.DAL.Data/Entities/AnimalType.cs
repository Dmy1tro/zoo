using System.Collections.Generic;

namespace ZooApiService.DAL.Data.Entities
{
    public class AnimalType
    {
        public int AnimalTypeId { get; set; }

        public string TypeName { get; set; }

        public ICollection<Animal> Animals{ get; set; }
    }
}
