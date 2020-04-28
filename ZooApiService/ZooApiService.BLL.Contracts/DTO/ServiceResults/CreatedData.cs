namespace ZooApiService.BLL.Contracts.DTO.ServiceResults
{
    public class CreatedData
    {
        public CreatedData(object createdId)
        {
            CreatedId = createdId;
        }

        public object CreatedId { get; }
    }
}
