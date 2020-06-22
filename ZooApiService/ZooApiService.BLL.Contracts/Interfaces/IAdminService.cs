using System.Collections.Generic;
using System.Dynamic;
using System.Threading.Tasks;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IAdminService
    {
        Task<IList<ExpandoObject>> ExecuteQuery(string query);

        Task<int> ExecuteCommand(string command);

        Task CreateBackup(string location);
    }
}
