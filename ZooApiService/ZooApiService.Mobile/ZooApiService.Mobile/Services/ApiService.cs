using System;
using System.Collections.Generic;
using System.Linq;
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

            SetToken();
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

                LocalStorage.SetItem("token", token.Token);

                return (true, null);
            }

            return (false, JsonConvert.DeserializeObject<ErrorResponse>(raw).Error);
        }

        public async Task<Job> GetJob(int id)
        {
            var data = await GetDataFromApi<Job>(ApiUri.Jobs + id);

            return data;
        }

        public async Task<List<Job>> GetJobs()
        {
            var data = await GetDataFromApi<List<Job>>(ApiUri.MyJobs);

            return data
                .OrderByDescending(x => x.CreationDate)
                .ToList();
        }

        public async Task StartJob(int jobId)
        { 
            await _httpClient.PutAsync(ApiUri.StartJob + jobId, null);
        }

        public async Task FinishJob(int jobId)
        {
            await _httpClient.PutAsync(ApiUri.FinishJob + jobId, null);
        }

        public void Dispose()
        {
            _httpClient.Dispose();
        }

        private void SetToken()
        {
            var token = LocalStorage.GetItem("token");

            if (token is null)
            {
                return;
            }

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }

        private async Task<T> GetDataFromApi<T>(string endpoint)
        {
            var rawData = await _httpClient.GetStringAsync(endpoint);

            var serializedData = JsonConvert.DeserializeObject<T>(rawData);

            return serializedData;
        }

    }
}
