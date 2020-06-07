namespace ZooApiService.DAL.Data.Entities
{
    public class Ration
    {
        public int RationId { get; set; }

        public int AnimalId { get; set; }

        public string FoodName { get; set; }

        public string Description { get; set; }

        public Animal Animal { get; set; }
    }
}
