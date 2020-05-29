using System;
using System.Net.Http;
using System.Text;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace ZooApiService.IoT
{
    class Program
    {
        private const string ApiUrl = "";
        private const int EmulatedId = 123;

        static void Main(string[] args)
        {
            using var httpClient = new HttpClient();

            var request = new
            {
                Id = EmulatedId,
                Message = "Animal is Ok"
            };

            var stringContent = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            httpClient.PostAsync(ApiUrl, stringContent).GetAwaiter().GetResult();
        }
    }
}
