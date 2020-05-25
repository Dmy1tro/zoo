using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ZooApiService.API.ViewModels.AnimalTypeViewModels;
using ZooApiService.BLL.Contracts.Interfaces;

namespace ZooApiService.API.Controllers
{
    [Route("api/animalTypes")]
    [ApiController]
    public class AnimalTypeController : ControllerBase
    {
        private readonly IAnimalTypeService _animalTypeService;
        private readonly IMapper _mapper;

        public AnimalTypeController(IAnimalTypeService animalTypeService, IMapper mapper)
        {
            _animalTypeService = animalTypeService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var types = await _animalTypeService.GetAnimalTypes();

            return Ok(types);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var type = await _animalTypeService.GetAsync(id);

            return Ok(type);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AnimalTypeCreateViewModel model)
        {
            var created = await _animalTypeService.CreateAnimalTypeAsync(model.TypeName);

            return Ok(created);
        }

        [HttpPut]
        public async Task<IActionResult> Rename(AnimalTypeViewModel model)
        {
            await _animalTypeService.RenameAnimalType(model.AnimalTypeId, model.TypeName);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _animalTypeService.DeleteAnimalType(id);

            return NoContent();
        }
    }
}