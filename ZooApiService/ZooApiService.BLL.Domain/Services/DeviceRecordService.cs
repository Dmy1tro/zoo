using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ZooApiService.BLL.Contracts.DTO;
using ZooApiService.BLL.Contracts.DTO.ServiceResults;
using ZooApiService.BLL.Contracts.Interfaces;
using ZooApiService.DAL.Data.Context;
using ZooApiService.DAL.Data.Entities;

namespace ZooApiService.BLL.Domain.Services
{
    public class DeviceRecordService : IDeviceRecordService
    {
        private readonly ZooDbContext _context;
        private readonly IMapper _mapper;

        public DeviceRecordService(ZooDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CreatedData> CreateRecordAsync(int deviceId, string value, DateTime date)
        {
            var record = new DeviceRecord
            {
                SmartDeviceId = deviceId,
                Value = value,
                Date = date
            };

            _context.DeviceRecords.Add(record);
            await _context.SaveChangesAsync();

            return new CreatedData(record.DeviceRecordId);
        }

        public async Task<IList<DeviceRecordDto>> GetRecordsAsync(int deviceId)
        {
            var records = await _context.DeviceRecords
                .AsNoTracking()
                .Take(10)
                .Where(x => x.SmartDeviceId == deviceId)
                .ToListAsync();

            var recordsDto = _mapper.Map<List<DeviceRecordDto>>(records);

            return recordsDto;
        }
    }
}
