using System.Collections.Generic;
using System.Threading.Tasks;

namespace ZooApiService.BLL.Contracts.Interfaces
{
    public interface IAdminService
    {
        Task<IList<object>> ExecuteQuery(string query);

        Task<object> ExecuteCommand(string command);

        Task CreateBackup(string location);
    }
}
