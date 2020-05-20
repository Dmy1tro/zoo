using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ZooApiService.API.ViewModels.DeviceRecordViewModels;
using ZooApiService.BLL.Contracts.Interfaces;

namespace ZooApiService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceRecordController : ControllerBase
    {
        private readonly IDeviceRecordService _deviceRecordService;

        public DeviceRecordController(IDeviceRecordService deviceRecordService)
        {
            _deviceRecordService = deviceRecordService;
        }

        [HttpGet("{deviceId}")]
        public async Task<IActionResult> Get(int deviceId)
        {
            var records = await _deviceRecordService.GetRecordsAsync(deviceId);

            return Ok(records);
        }

        [HttpPost]
        public async Task<IActionResult> Create(DeviceRecordCreateViewModel model)
        {
            var created = await _deviceRecordService.CreateRecordAsync(model.SmartDeviceId, model.Value, DateTime.UtcNow);

            return Ok(created);
        }
    }
}