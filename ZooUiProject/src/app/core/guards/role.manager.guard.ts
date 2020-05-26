import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/features/authentication/services/account.service';

@Injectable({ providedIn: 'root' })
export class RoleManagerGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AccountService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isManager;
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isManager;
    }
}
