import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { AccountService } from 'src/app/features/authentication/services/account.service';
import { Router } from '@angular/router';
import { IUserInfo } from 'src/app/core/interfaces/user-info.interface';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LocalizationService } from 'src/app/shared/localization.service';

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

  translateOn: boolean;
  opened$ = false;

  private currentUser: IUserInfo = null;
  private destroy$ = new Subject<void>();

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AccountService,
              private router: Router,
              private localizationService: LocalizationService) {}

  ngOnInit() {
    this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.currentUser = data;
        this.opened$ = this.isAuthenticated;
      });

    this.translateOn = this.localizationService.getLocalization() === 'ua';
  }

  get isAuthenticated(): boolean {
    return this.currentUser != null;
  }

  get isManager(): boolean {
    return this.authService.isManager;
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  changeLanguage(event: MatSlideToggleChange) {
    if (event.checked) {
      this.localeUA();
    } else {
      this.localeEN();
    }
  }

  goProfile() {
    this.router.navigate(['/employee/profile']);
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/authentication']);
  }

  private localeUA() {
    this.localizationService.localeUA();
  }

  private localeEN() {
    this.localizationService.localeEN();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
