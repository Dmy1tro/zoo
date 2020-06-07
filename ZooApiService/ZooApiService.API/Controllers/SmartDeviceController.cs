using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZooApiService.API.ViewModels.SmartDeviceViewModels;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.Common.Authentication;

namespace ZooApiService.API.Controllers
{
    [Route("api/devices")]
    [ApiController]
    [Authorize(Policy = PolicyName.ForAllUsers)]
    public class SmartDeviceController : ControllerBase
    {
        private readonly ISmartDeviceService _smartDeviceService;

        public SmartDeviceController(ISmartDeviceService smartDeviceService)
        {
            _smartDeviceService = smartDeviceService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> All()
        {
            var devices = await _smartDeviceService.GetAllDevices();

            return Ok(devices);
        }

        [HttpGet("{deviceId}")]
        public async Task<IActionResult> Get(int deviceId)
        {
            var device = await _smartDeviceService.GetDevice(deviceId);

            return Ok(device);
        }

        [HttpGet("for-animal/{animalId}")]
        public async Task<IActionResult> GetForAnimal(int animalId)
        {
            var devices = await _smartDeviceService.GetDevices(animalId);

            return Ok(devices);
        }

        [HttpPost]
        public async Task<IActionResult> Create(SmartDeviceCreateViewModel model)
        {
            var created = await _smartDeviceService.CreateDeviceAsync(model.AnimalId, model.Name, model.DeviceType);

            return Ok(created);
        }

        [HttpPut]
        public async Task<IActionResult> Rename(SmartDeviceUpdateViewModel model)
        {
            await _smartDeviceService.UpdateAsync(model.SmartDeviceId, model.NewName, model.DeviceType);

            return NoContent();
        }

        [HttpDelete("{deviceId}")]
        public async Task<IActionResult> Delete(int deviceId)
        {
            await _smartDeviceService.Delete(deviceId);

            return NoContent();
        }
    }
}