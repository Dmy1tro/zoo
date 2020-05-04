using System;
using AutoMapper;
using ZooApiService.API.ViewModels.AnimalViewModels;
using ZooApiService.API.ViewModels.EmployeeViewModels;
using ZooApiService.API.ViewModels.JobViewModels;
using ZooApiService.API.ViewModels.RationViewModels;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.DAL.Data.Entities;
using ZooApiService.DAL.Data.Enums;

namespace ZooApiService.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            MapEnums();

            MapViewModels();

            MapDboModels();
        }

        private void MapEnums()
        {
            CreateMap<Gender, string>()
                .ConvertUsing(x => x.ToString());

            CreateMap<string, Gender>()
                .ConvertUsing(x => Enum.Parse<Gender>(x, true));

            CreateMap<JobPosition, string>()
                .ConvertUsing(x => x.ToString());

            CreateMap<string, JobPosition>()
                .ConvertUsing(x => Enum.Parse<JobPosition>(x, true));

            CreateMap<JobStatus, string>()
                .ConvertUsing(x => x.ToString());

            CreateMap<string, JobStatus>()
                .ConvertUsing(x => Enum.Parse<JobStatus>(x, true));
        }

        private void MapViewModels()
        {
            CreateMap<AnimalViewModel, AnimalDto>();
            CreateMap<EmployeeViewModel, EmployeeDto>();
            CreateMap<JobViewModel, JobDto>();
            CreateMap<RationViewModel, RationDto>();
        }

        private void MapDboModels()
        {
            CreateMap<Animal, AnimalDto>()
                .ReverseMap();

            CreateMap<Employee, EmployeeDto>()
                .ReverseMap();

            CreateMap<Job, JobDto>()
                .ReverseMap();

            CreateMap<Ration, RationDto>()
                .ReverseMap();
        }
    }
}
