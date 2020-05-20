using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ZooApiService.API.ViewModels.SmartDeviceViewModels;
using ZooApiService.BLL.Contracts.Interfaces;

namespace ZooApiService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmartDeviceController : ControllerBase
    {
        private readonly ISmartDeviceService _smartDeviceService;

        public SmartDeviceController(ISmartDeviceService smartDeviceService)
        {
            _smartDeviceService = smartDeviceService;
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
            var created = await _smartDeviceService.CreateDeviceAsync(model.AnimalId, model.Name);

            return Ok(created);
        }

        [HttpPut]
        public async Task<IActionResult> Rename(SmartDeviceRenameViewModel model)
        {
            await _smartDeviceService.Rename(model.SmartDeviceId, model.NewName);

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