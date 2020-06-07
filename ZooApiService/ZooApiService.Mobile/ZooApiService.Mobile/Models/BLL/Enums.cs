namespace ZooApiService.Mobile.Models.BLL
{
    public static class Enums
    {
        public enum JobStatus
        {
            Created = 1,
            InProgress,
            Finished
        }

        public enum JobPosition
        {
            Worker = 1,
            Manager,
            Vet
        }

        public enum Gender
        {
            Male = 1,
            Female
        }
    }
}
