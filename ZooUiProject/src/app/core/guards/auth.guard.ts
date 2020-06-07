import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/features/authentication/services/account.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AccountService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.getCurrentUser;

        if (currentUser) {
            return true;
        }

        this.router.navigate(['/authentication']);
        return false;
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        const currentUser = this.authService.getCurrentUser;

        if (currentUser) {
            return true;
        }

        this.router.navigate(['/authentication']);
        return false;
    }
}
