using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ZooApiService.API.ViewModels.RationViewModels;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.Interfaces;

namespace ZooApiService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RationController : ControllerBase
    {
        private readonly IRationService _rationService;
        private readonly IMapper _mapper;

        public RationController(IRationService rationService, IMapper mapper)
        {
            _rationService = rationService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var rationsDto = await _rationService.GetRationsAsync();

            return Ok(rationsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var rationDto = await _rationService.GetRationAsync(id);

            return Ok(rationDto);
        }

        [HttpGet("for-animal/{animalId}")]
        public async Task<IActionResult> GetForAnimal(int animalId)
        {
            var rationsDto = await _rationService.GetRationsForAnimalAsync(animalId);

            return Ok(rationsDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create(RationViewModel model)
        {
            var rationDto = _mapper.Map<RationDto>(model);

            var createdId = await _rationService.CreateRationAsync(rationDto);

            return Ok(createdId);
        }

        [HttpPut]
        public async Task<IActionResult> Put(RationViewModel model)
        {
            var rationDto = _mapper.Map<RationDto>(model);

            await _rationService.UpdateRationAsync(rationDto);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _rationService.DeleteRationAsync(id);

            return NoContent();
        }

    }
}