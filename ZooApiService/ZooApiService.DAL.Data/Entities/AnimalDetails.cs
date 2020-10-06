namespace ZooApiService.DAL.Data.Entities
{
    public class AnimalDetails
    {
        public int AnimalDetailsId { get; set; }

        public int AnimalId { get; set; }

        public double? Weight { get; set; }

        public double? Height { get; set; }

        public double? BodyLength { get; set; }

        public double? TailLength { get; set; }

        public decimal? Price { get; set; }

        public string AdditionalInfo { get; set; }

        public Animal Animal { get; set; }
    }
}
