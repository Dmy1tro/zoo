import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IEmployee } from 'src/app/core/interfaces/employee-interface';
import { EmployeeService } from '../common/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { enumSelector } from 'src/app/core/helpers';
import { Job } from 'src/app/core/constants/enums';
import { CreateUpdateEmployeeComponent } from '../create-update-employee/create-update-employee.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {

  employees: IEmployee[] = [];
  employeeFiltered: IEmployee[] = [];
  employeeSelected: IEmployee = null;
  jobs: any;
  filterForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private employeeService: EmployeeService,
              private toastr: ToastrService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.jobs = enumSelector(Job);
    this.createForm();
    this.getEmployees();
  }

  createForm() {
    this.filterForm = this.fb.group({
      job: null,
      id: null
    });
  }

  getEmployees() {
    this.employeeService.all()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.employees = data;
          this.employeeFiltered = this.employees;
          if (this.employeeSelected) {
            this.selectEmployee(this.employeeSelected.id);
          }
        },
        err => {
          console.log(err);
        });
  }

  selectEmployee(id) {
    this.employeeSelected = this.employeeFiltered.find(x => x.id === id);
  }

  addOrUpdate(id) {
    const employee = this.selectedOrDefaultEmployee(id);

    this.dialog.open(CreateUpdateEmployeeComponent, { width: '34%', autoFocus: true, data: employee })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getEmployees());
  }

  filterJobs(value) {
    this.employeeFiltered = this.employees.filter(x =>
      x.position.toUpperCase().includes(this.filterForm.value.job.toUpperCase()));
  }

  resetForm() {
    this.filterForm.reset();
    this.employeeSelected = null;
    this.employeeFiltered = this.employees;
  }

  selectedOrDefaultEmployee(id): IEmployee {
    if (id) {
      return this.employeeFiltered.find(x => x.id === id);
    }

    return { id: null, firstName: null, lastName: null, gender: null, dateOfBirth: null, position: null, email: null };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
