using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ZooApiService.API.ViewModels.AnimalDetailsViewModels;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.Common.Authentication;

namespace ZooApiService.API.Controllers
{
    [Route("api/animal-details")]
    [ApiController]
    [Authorize(Policy = PolicyName.ForAllUsers)]
    public class AnimalDetailsController : ControllerBase
    {
        private readonly IAnimalDetailsService _animalDetailsService;
        private readonly IMapper _mapper;

        public AnimalDetailsController(IAnimalDetailsService animalDetailsService, IMapper mapper)
        {
            _animalDetailsService = animalDetailsService;
            _mapper = mapper;
        }

        [HttpGet("{animalId}")]
        public async Task<IActionResult> Get(int animalId)
        {
            var detail = await _animalDetailsService.GetAnimalDetailsAsync(animalId);

            return Ok(detail);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AnimalDetailsViewModel model)
        {
            var dto = _mapper.Map<AnimalDetailsDto>(model);

            var createdData = await _animalDetailsService.CreateAnimalDetailsAsync(dto);

            return Ok(createdData);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(AnimalDetailsViewModel model)
        {
            var dto = _mapper.Map<AnimalDetailsDto>(model);

            await _animalDetailsService.UpdateAnimalDetailsAsync(dto);

            return NoContent();
        }
    }
}
