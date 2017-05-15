import {Injectable}       from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
}                           from '@angular/router';
import {AuthService}      from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService, private router:Router) {
    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {
        let url:string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url:string):boolean {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (!currentUser) {
			this.router.navigate(['/auth/login']);
			return false;
		}
        if (currentUser.token) {
            return true;
        }
        if (this.authService.isLoggedIn) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/auth/login']);
        return false;
    }
}