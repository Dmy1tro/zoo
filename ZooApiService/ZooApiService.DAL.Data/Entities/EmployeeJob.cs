namespace ZooApiService.DAL.Data.Entities
{
    public class EmployeeJob
    {
        public int EmployeeJobId { get; set; }

        public string EmployeeId { get; set; }

        public int JobId { get; set; }

        public Employee Employee { get; set; }

        public Job Job { get; set; }
    }
}
