using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using ZooApiService.Mobile.Constants;
using ZooApiService.Mobile.Helper;
using ZooApiService.Mobile.Models.BLL;
using ZooApiService.Mobile.Models.ViewModels;

namespace ZooApiService.Mobile.Services
{
    public class ApiService: IDisposable
    {
        private readonly HttpClient _httpClient;

        public ApiService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<(bool, string)> SignIn(string email, string password)
        {
            var model = new LoginViewModel
            {
                Email = email,
                Password = password
            };

            var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(ApiUri.SignIn, stringContent);
            var raw = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var token = JsonConvert.DeserializeObject<TokenResponse>(raw);

                LocalStorage.AddItem("token", token.Token);

                return (true, null);
            }

            return (false, JsonConvert.DeserializeObject<ErrorResponse>(raw).Error);
        }

        public async Task<List<Job>> GetJobs()
        {
            var token = LocalStorage.GetItem("token");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var jobs = await Task.Run(() =>
            {
                var data = GetDataFromApi<List<Job>>(ApiUri.MyJobs);

                return data;
            });

            return jobs;
        }

        public void Dispose()
        {
            _httpClient.Dispose();
        }

        private T GetDataFromApi<T>(string endpoint)
        {
            var rawData = _httpClient.GetStringAsync(endpoint).GetAwaiter().GetResult();

            var serializedData = JsonConvert.DeserializeObject<T>(rawData);

            return serializedData;
        }

        private void PutDataToApi<T>(HttpClient client, string endpoint, T item)
        {
            var request = JsonConvert.SerializeObject(item);

            var stringContent = new StringContent(request, Encoding.UTF8, "application/json");

            var response = client.PostAsync(endpoint, stringContent).GetAwaiter().GetResult();

            stringContent.Dispose();
            response.Dispose();
        }
    }
}
