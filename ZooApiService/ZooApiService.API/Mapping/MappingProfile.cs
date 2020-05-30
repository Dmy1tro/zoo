using System;
using System.Linq;
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

            CreateMap<DeviceType, string>()
                .ConvertUsing(x => x.ToString());

            CreateMap<string, DeviceType>()
                .ConvertUsing(x => Enum.Parse<DeviceType>(x, true));
        }

        private void MapViewModels()
        {
            CreateMap<AnimalViewModel, AnimalDto>()
                .ForMember(d => d.Picture, m => m.Ignore())
                .ForMember(d => d.ContentType, m => m.Ignore());
            CreateMap<EmployeeViewModel, EmployeeDto>();
            CreateMap<JobViewModel, JobDto>();
            CreateMap<RationViewModel, RationDto>();
        }

        private void MapDboModels()
        {
            CreateMap<Animal, AnimalDto>()
                .ReverseMap();

            CreateMap<Animal, AnimalFullDto>()
                .IncludeBase<Animal, AnimalDto>()
                .ForMember(d => d.TypeName, m => m.MapFrom(s => s.AnimalType.TypeName));

            CreateMap<AnimalType, AnimalTypeDto>()
                .ReverseMap();

            CreateMap<DeviceRecord, DeviceRecordDto>()
                .ReverseMap();

            CreateMap<Employee, EmployeeDto>()
                .ForMember(d => d.FirstName, m => m.MapFrom((s, d) => s.UserName.Split('|').First()))
                .ForMember(d => d.LastName, m => m.MapFrom((s, d) => s.UserName.Split('|').Last()))
                .ReverseMap()
                .ForMember(d => d.Id, m => m.MapFrom(s => string.IsNullOrEmpty(s.Id) 
                    ? Guid.NewGuid().ToString() 
                    : s.Id))
                .ForMember(d => d.UserName, m => m.MapFrom(s => string.Concat(s.FirstName.Trim(), '|', s.LastName.Trim())));

            CreateMap<Job, JobDto>()
                .ReverseMap();

            CreateMap<Ration, RationDto>()
                .ReverseMap();

            CreateMap<SmartDevice, SmartDeviceDto>()
                .ReverseMap();
        }
    }
}
