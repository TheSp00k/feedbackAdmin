import {Injectable}       from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
}                           from '@angular/router';
import {AuthService}      from './auth.service';
import {NotificationService} from "../shared/utils/notification.service";

@Injectable()
export class AuthGuard implements CanActivate {
	public notificationCheck;
    constructor(private authService:AuthService, private router:Router, private notificationService:NotificationService) {
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
	checkResponse(response):void {
		if (response.status == 200) {
			this.notificationCheck = false;
			return;
		}
		let notificationText = 'You are unauthorized';
		if (response.status == 401) {
			this.router.navigate(['/auth/login']);
		} else {
			notificationText = "Connection lost";
		}
		if (!this.notificationCheck) {
			this.notificationCheck = true;
			this.notificationService.smallBox({
				title: notificationText,
				color: "rgba(0, 0, 0, 0.63)",
				iconSmall: "fa fa-warning shake animated red",
				timeout: 4000
			});
		}
	}
}