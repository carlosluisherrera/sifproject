import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot) {
        const currentUser = localStorage.getItem('user');
        if (currentUser) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}