
namespace ZooApiService.Common.Exceptions.BusinessLogic
{
    public class NotFoundException : BusinessLogicException
    {
        public NotFoundException(string name, object key) : base($"Entity '{name}' with key '{key}' was not found")
        {
        }
    }
}
