import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, of } from 'rxjs';
import { map, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { AccountService } from 'src/app/features/authentication/services/account.service';
import { Router } from '@angular/router';
import { IUserInfo } from 'src/app/core/interfaces/user-info.interface';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/features/authentication/change-password/change-password.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  currentUser: IUserInfo = null;
  opened$ = false;
  private destroy$ = new Subject<void>();

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AccountService,
              private router: Router,
              private matDialog: MatDialog) {}

  ngOnInit() {
    this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.currentUser = data;
        this.opened$ = this.isAuthenticated;
      });
  }

  get isAuthenticated(): boolean {
    return this.currentUser != null;
  }

  get isManager(): boolean {
    return this.authService.isManager;
  }

  changePassword() {
    this.matDialog.open(ChangePasswordComponent, { width: '30%', autoFocus: true });
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/authentication']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
