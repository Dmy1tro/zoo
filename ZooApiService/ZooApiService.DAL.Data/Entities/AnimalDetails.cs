using System;
using System.Collections.Generic;
using System.Text;

namespace ZooApiService.DAL.Data.Entities
{
    public class AnimalDetails
    {
        public int AnimalDetailsId { get; set; }

        public double Weight { get; set; }

        public double Height { get; set; }

        public double BodyLength { get; set; }
    }
}
