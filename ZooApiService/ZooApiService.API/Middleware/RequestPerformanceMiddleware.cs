using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace ZooApiService.API.Middleware
{
    public class RequestPerformanceMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestPerformanceMiddleware> _logger;
        private readonly Stopwatch _timer;

        public RequestPerformanceMiddleware(RequestDelegate next, ILogger<RequestPerformanceMiddleware> logger)
        {
            _next = next;
            _logger = logger;
            _timer = new Stopwatch();
        }

        public async Task InvokeAsync(HttpContext context)
        {
            _timer.Reset();

            await _next.Invoke(context);

            _timer.Stop();

            if (_timer.ElapsedMilliseconds > 500)
            {
                _logger.LogWarning($"Long running Request '{context.Request.Path}' with time: {_timer.ElapsedMilliseconds} ms");
            }
            else
            {
                _logger.LogInformation($"Request '{context.Request.Path}' with time: {_timer.ElapsedMilliseconds} ms");
            }
        }
    }
}
