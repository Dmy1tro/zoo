using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Dynamic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ZooApiService.BLL.Contracts.Interfaces;

namespace ZooApiService.BLL.Domain.Services
{
    public class AdminService : IAdminService
    {
        private readonly string _connectionString;

        public AdminService(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:ZooDb"];
        }

        public async Task<IList<ExpandoObject>> ExecuteQuery(string query)
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            var command = new SqlCommand(query, connection);

            var reader = await command.ExecuteReaderAsync();

            var list = new List<ExpandoObject>();

            foreach (DbDataRecord record in reader)
            {
                var obj = new ExpandoObject();

                for (int i = 0; i < reader.FieldCount; i++)
                {
                    obj.TryAdd(reader.GetName(i), record[i]);
                }

                list.Add(obj);
            }

            return list;
        }

        public async Task<int> ExecuteCommand(string sqlCommand)
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            var command = new SqlCommand(sqlCommand, connection);

            var result = await command.ExecuteNonQueryAsync();

            return result;
        }

        public async Task CreateBackup(string location)
        {
            location = Path.Combine(location, "Backup.bak");

            if (File.Exists(location))
            {
                File.Delete(location);
            }

            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            var command = new SqlCommand($"Backup database [ZooDb] to disk='{location}'", connection);

            await command.ExecuteNonQueryAsync();
        }
    }
}
