using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.IoT.Models;

namespace ZooApiService.IoT.Emulator
{
    public class EmulatorService
    {
        private static Random _random = new Random();
        private readonly Endpoints _endpoints;

        public EmulatorService(Endpoints endpoints)
        {
            _endpoints = endpoints;
        }

        public void Emulate(CancellationToken token)
        {
            using var httpClient = new HttpClient();

            while (!token.IsCancellationRequested)
            {
                var allDevices = GetDataFromApi<List<SmartDeviceDto>>(httpClient, _endpoints.Devices);

                allDevices.ForEach(device =>
                {
                    SendMessage(httpClient, device);
                });

                Task.Delay(TimeSpan.FromSeconds(15)).GetAwaiter().GetResult();
            }
        }

        private void SendMessage(HttpClient client, SmartDeviceDto device)
        {
            var message = GenerateMessage(device.DeviceType);

            var request = new
            {
                SmartDeviceId = device.SmartDeviceId,
                Value = message
            };

            PostDataToApi(client, _endpoints.DeviceRecords, request);
        }

        private string GenerateMessage(string type)
        {
            return type switch
            {
                "Location" => $"Animal in area {_random.Next(100)}",

                "Temperature" => $"Temperature is {_random.Next(35, 45)} gradus by Celsius",

                "Pulsometer" => $"Pulse is {_random.Next(80, 160)}"
            };
        }

        private T GetDataFromApi<T>(HttpClient client, string endpoint)
        {
            var rawData = client.GetStringAsync(endpoint).GetAwaiter().GetResult();

            var serializedData = JsonConvert.DeserializeObject<T>(rawData);

            return serializedData;
        }

        private void PostDataToApi<T>(HttpClient client, string endpoint, T item)
        {
            var request = JsonConvert.SerializeObject(item);

            using var stringContent = new StringContent(request, Encoding.UTF8, "application/json");

            using var response = client.PostAsync(endpoint, stringContent).GetAwaiter().GetResult();
        }
    }
}
