using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZooApiService.API.Infrastructure;
using ZooApiService.API.ViewModels.AnimalViewModels;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.Common.Authentication;

namespace ZooApiService.API.Controllers
{
    [Route("api/animals")]
    [ApiController]
    [Authorize(Policy = PolicyName.ForAllUsers)]
    public class AnimalController : ControllerBase
    {
        private readonly IAnimalService _animalService;
        private readonly IAnimalDetailsService _animalDetailsService;
        private readonly IMapper _mapper;

        public AnimalController(IAnimalService animalService,
                                IAnimalDetailsService animalDetailsService,
                                IMapper mapper)
        {
            _animalService = animalService;
            _animalDetailsService = animalDetailsService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var animalsDto = await _animalService.GetAnimalsAsync();

            return Ok(animalsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var animalDto = await _animalService.GetAnimalAsync(id);

            return Ok(animalDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] AnimalViewModel model)
        {
            var animalDto = _mapper.Map<AnimalDto>(model);

            var createdId = await _animalService.CreateAnimalAsync(animalDto);
            await _animalDetailsService.CreateAnimalDetailsAsync(new AnimalDetailsDto { AnimalId = (int)createdId.CreatedId });

            if (model.Picture != null)
            {
                var picture = FormFileHelper.ConvertFileToBytes(model.Picture);
                var contentType = model.Picture.ContentType;

                await _animalService.UpdatePicture((int) createdId.CreatedId, picture, contentType);
            }

            return Ok(createdId);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromForm] AnimalViewModel model)
        {
            var animalDto = _mapper.Map<AnimalDto>(model);

            await _animalService.UpdateAnimalAsync(animalDto);

            if (model.Picture != null)
            {
                var picture = FormFileHelper.ConvertFileToBytes(model.Picture);
                var contentType = model.Picture.ContentType;

                await _animalService.UpdatePicture(animalDto.AnimalId, picture, contentType);
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _animalService.DeleteAnimalAsync(id);

            return NoContent();
        }
    }
}