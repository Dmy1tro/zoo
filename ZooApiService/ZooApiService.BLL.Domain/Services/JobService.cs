﻿using System;
using System.Collections.Generic;
using System.Linq;
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
using ZooApiService.DAL.Data.Enums;

namespace ZooApiService.BLL.Domain.Services
{
    public class JobService : IJobService
    {
        private readonly ZooDbContext _dbContext;
        private readonly IMapper _mapper;

        public JobService(ZooDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<JobDto> GetJobAsync(int id)
        {
            var jobDbo = await _dbContext.Jobs
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.JobId == id);

            if (jobDbo is null)
            {
                throw new NotFoundException(EntityName.Job, id);
            }

            var jobDto = _mapper.Map<JobDto>(jobDbo);

            return jobDto;
        }

        public async Task<IList<JobDto>> GetJobsAsync()
        {
            var jobsDbo = await _dbContext.Jobs
                .AsNoTracking()
                .ToListAsync();

            var jobsDto = _mapper.Map<List<JobDto>>(jobsDbo);

            return jobsDto;
        }

        public async Task<CreatedData> CreateJobAsync(string title, string description)
        {
            var jobDbo = new Job
            {
                Title = title,
                Description = description,
                Status = JobStatus.Created,
                CreationDate = DateTime.UtcNow
            };

            _dbContext.Jobs.Add(jobDbo);

            await _dbContext.SaveChangesAsync();

            return new CreatedData(jobDbo.JobId);
        }

        public async Task StartJobAsync(int id)
        {
            var jobDbo = await _dbContext.Jobs
                .FirstOrDefaultAsync(x => x.JobId == id);

            if (jobDbo is null)
            {
                throw new NotFoundException(EntityName.Job, id);
            }

            if (jobDbo.Status != JobStatus.Created)
            {
                throw new ValidationException($"Job with id '{id}' already started");
            }

            jobDbo.Status = JobStatus.InProgress;
            jobDbo.CreationDate = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
        }

        public async Task FinishJobAsync(int id)
        {
            var jobDbo = await _dbContext.Jobs
                .FirstOrDefaultAsync(x => x.JobId == id);

            if (jobDbo is null)
            {
                throw new NotFoundException(EntityName.Job, id);
            }

            if (jobDbo.Status != JobStatus.InProgress)
            {
                throw new ValidationException($"Job with id '{id}' cannot be finished.");
            }

            jobDbo.Status = JobStatus.Finished;
            jobDbo.FinishDate = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
        }

        public async Task<IList<JobDto>> GetJobsForEmployeeAsync(string employeeId, string minStatus)
        {
            var statusDbo = string.IsNullOrEmpty(minStatus)
                ? JobStatus.Created
                : _mapper.Map<JobStatus>(minStatus);

            var jobsDbo = await _dbContext.Jobs
                .AsNoTracking()
                .Where(x => x.EmployeeId == employeeId)
                .Where(x => x.Status >= statusDbo)
                .ToListAsync();

            var jobsDto = _mapper.Map<List<JobDto>>(jobsDbo);

            return jobsDto;
        }

        public async Task UpdateJobAsync(JobDto jobDto)
        {
            var jobDbo = _mapper.Map<Job>(jobDto);

            _dbContext.Jobs.Update(jobDbo);

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteJobAsync(int id)
        {
            var jobDbo = await _dbContext.Jobs
                .FirstOrDefaultAsync(x => x.JobId == id);

            _dbContext.Jobs.Remove(jobDbo);

            await _dbContext.SaveChangesAsync();
        }
    }
}