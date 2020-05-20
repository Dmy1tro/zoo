using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.Common.Constants;
using ZooApiService.Common.Exceptions.BusinessLogic;
using ZooApiService.DAL.Data.Context;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.BLL.Domain.Services
{
    public class SmartDeviceService : ISmartDeviceService
    {
        private readonly ZooDbContext _context;
        private readonly IMapper _mapper;

        public SmartDeviceService(ZooDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<SmartDeviceDto> GetDevice(int deviceId)
        {
            var device = await _context.SmartDevices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.SmartDeviceId == deviceId);

            var deviceDto = _mapper.Map<SmartDeviceDto>(device);

            return deviceDto;
        }

        public async Task<IList<SmartDeviceDto>> GetDevices(int animalId)
        {
            var devices = await _context.SmartDevices
                .AsNoTracking()
                .Where(x => x.AnimalId == animalId)
                .ToListAsync();

            var devicesDto = _mapper.Map<List<SmartDeviceDto>>(devices);

            return devicesDto;
        }

        public async Task<CreatedData> CreateDeviceAsync(int animalId, string name)
        {
            var device = new SmartDevice
            {
                AnimalId = animalId,
                Name = name
            };

            _context.SmartDevices.Add(device);
            await _context.SaveChangesAsync();

            return new CreatedData(device.SmartDeviceId);
        }

        public async Task Rename(int deviceId, string newName)
        {
            var device = await _context.SmartDevices
                .FirstOrDefaultAsync(x => x.SmartDeviceId == deviceId);

            if (device is null)
            {
                throw new NotFoundException(EntityName.SmartDevice, deviceId);
            }

            device.Name = newName;

            await _context.SaveChangesAsync();
        }

        public async Task Delete(int deviceId)
        {
            var device = await _context.SmartDevices
                .FirstOrDefaultAsync(x => x.SmartDeviceId == deviceId);

            if (device is null)
            {
                throw new NotFoundException(EntityName.SmartDevice, deviceId);
            }

            _context.SmartDevices.Remove(device);
            await _context.SaveChangesAsync();
        }
    }
}
