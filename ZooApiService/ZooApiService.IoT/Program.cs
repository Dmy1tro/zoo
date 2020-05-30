using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using ZooApiService.IoT.Models;
using ZooApiService.IoT.Emulator;

namespace ZooApiService.IoT
{
    class Program
    {
        static void Main(string[] args)
        {
            var configuration = CreateBuilder().Build();

            var endpoints = configuration.GetSection(nameof(Endpoints)).Get<Endpoints>();
            var emulator = new EmulatorService(endpoints);

            Task.Delay(5000).GetAwaiter().GetResult();

            var tokenSource = new CancellationTokenSource();
            emulator.Emulate(tokenSource.Token);

            Console.ReadKey();
            tokenSource.Cancel();
        }

        private static IConfigurationBuilder CreateBuilder()
        {
            return new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");
        }
    }
}
