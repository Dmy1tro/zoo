using System.Collections.Generic;
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
    public class EmployeeService : IEmployeeService
    {
        private readonly ZooDbContext _dbContext;
        private readonly IMapper _mapper;

        public EmployeeService(ZooDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<EmployeeDto> GetEmployeeAsync(string id)
        {
            var employeeDbo = await _dbContext.Employees
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (employeeDbo is null)
            {
                throw new NotFoundException(EntityName.Employee, id);
            }

            var employeeDto = _mapper.Map<EmployeeDto>(employeeDbo);

            return employeeDto;
        }

        public async Task<IList<EmployeeDto>> GetEmployeesAsync()
        {
            var employeesDbo = await _dbContext.Employees
                .AsNoTracking()
                .ToListAsync();

            var employeesDto = _mapper.Map<List<EmployeeDto>>(employeesDbo);

            return employeesDto;
        }

        public async Task<CreatedData> CreateEmployeeAsync(EmployeeDto employeeDto)
        {
            var employeeDbo = _mapper.Map<Employee>(employeeDto);

            _dbContext.Employees.Add(employeeDbo);

            await _dbContext.SaveChangesAsync();

            return new CreatedData(employeeDbo.Id);
        }

        public async Task UpdateEmployeeAsync(EmployeeDto employeeDto)
        {
            var employeeDbo = _mapper.Map<Employee>(employeeDto);

            var loadedDbo = await _dbContext.Employees
                .FirstOrDefaultAsync(x => x.Id == employeeDbo.Id);

            if (loadedDbo is null)
            {
                throw new NotFoundException(EntityName.Employee, employeeDto.Id);
            }

            loadedDbo.UserName = employeeDbo.UserName;
            loadedDbo.DateOfBirth = employeeDbo.DateOfBirth;
            loadedDbo.Gender = employeeDbo.Gender;
            loadedDbo.Position = employeeDbo.Position;
            loadedDbo.Role = employeeDto.Role;

            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdatePicture(string id, byte[] pictureBytes, string contentType)
        {
            var loadedDbo = await _dbContext.Employees
                .FirstOrDefaultAsync(x => x.Id == id);

            if (loadedDbo is null)
            {
                throw new NotFoundException(EntityName.Employee, id);
            }

            loadedDbo.Picture = pictureBytes;
            loadedDbo.ContentType = contentType;

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteEmployeeAsync(string id)
        {
            var employeeDbo = await _dbContext.Employees
                .FirstOrDefaultAsync(x => x.Id == id);

            if (employeeDbo is null)
            {
                throw new NotFoundException(EntityName.Employee, id);
            }

            _dbContext.Employees.Remove(employeeDbo);

            await _dbContext.SaveChangesAsync();
        }
    }
}
