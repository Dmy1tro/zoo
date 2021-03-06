import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IEmployee } from 'src/app/core/interfaces/employee-interface';
import { EmployeeService } from '../common/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { enumSelector, deleteConfirmImport, refreshDataImport } from 'src/app/core/helpers';
import { Job, toastrTitle } from 'src/app/core/constants/enums';
import { CreateUpdateEmployeeComponent } from '../create-update-employee/create-update-employee.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../../authentication/services/account.service';

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
              private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.jobs = enumSelector(Job);
    this.createForm();
    this.getEmployees();
  }

  createForm() {
    this.filterForm = this.fb.group({
      job: '*',
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
      .subscribe((res) => {
        if (res) {
          this.refreshData(res);
        }
      });
  }

  delete(employee: IEmployee) {
    if (!this.accountService.isAdmin && employee.role.toUpperCase() === 'Admin'.toUpperCase()) {
      alert(this.translate.instant('Not-allowed'));
      return;
    }

    if (this.accountService.getCurrentUser.id === employee.id) {
      alert(this.translate.instant('Not-delete-yourself'));
      return;
    }

    if (!deleteConfirmImport(employee.firstName + ' ' + employee.lastName, this.translate)) {
      return;
    }

    this.employeeService.delete(employee.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.employees = this.employees.filter(x => x.id !== employee.id),
        (err) => {
          this.toastr.error(this.translate.instant('Failed'), this.translate.instant(toastrTitle.Error));
          console.log(err);
        });
  }

  goToJobs(id) {
    this.router.navigate(['/job/job-list/', id]);
  }

  filterJobs(value) {
    if (value === '*') {
      this.employeeFiltered = this.employees;
      return;
    }

    this.employeeFiltered = this.employees.filter(x =>
      x.position.toUpperCase().includes(this.filterForm.value.job.toUpperCase()));
  }

  resetForm() {
    this.filterForm.reset();
    this.employeeSelected = null;
    this.employeeFiltered = this.employees;
  }

  private refreshData(dialogResult) {
    const id = dialogResult.data;
    const action = dialogResult.action;
    this.employeeService.get(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        refreshDataImport(action, this.employees, data, (x: IEmployee) => x.id === id);

        if (this.employeeSelected && this.employeeSelected.id === id) {
          this.employeeSelected = data;
        }
      });
  }

  selectedOrDefaultEmployee(id): IEmployee {
    if (id) {
      return this.employeeFiltered.find(x => x.id === id);
    }

    return {
      id: null,
      firstName: null,
      lastName: null,
      gender: null,
      dateOfBirth: null,
      position: null,
      email: null,
      role: null,
      picture: null,
      contentType: null
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
