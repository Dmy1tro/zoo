import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IEmployee } from 'src/app/core/interfaces/employee-interface';
import { EmployeeService } from '../common/employee.service';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ChangeAvatarComponent } from '../change-avatar/change-avatar.component';
import { ChangePasswordComponent } from '../../authentication/change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  employee: IEmployee = null;

  private destroy$ = new Subject<void>();

  constructor(private employeeService: EmployeeService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.employeeService.profile()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.employee = data;

        if (!this.employee.picture) {
          this.employee.picture = './assets/images/userAvatar.png';
        }
      });
  }

  changeAvatar() {
    this.matDialog.open(ChangeAvatarComponent, { width: '30%', autoFocus: true })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.getProfile();
        }
      });
  }

  changePassword() {
    this.matDialog.open(ChangePasswordComponent, { width: '30%', autoFocus: true });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
