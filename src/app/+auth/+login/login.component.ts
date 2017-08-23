import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {NotificationService} from "../../shared/utils/notification.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    public email;
    public password;
    public error;
    // constructor(private router:Router) {
    constructor(private authService:AuthService, private notificationService:NotificationService) {
    }

    ngOnInit() {
    }

    login(event) {
        event.preventDefault();
		if (!this.email || !this.password || this.email.length == 0 || this.password == 0) {
			this.notificationService.smallBox({
				title: "Credencials are required",
				// content: errorJson.error.statusCode == 401 ? 'Email or password is incorrect' : errorJson.error.message,
				color: "rgba(0, 0, 0, 0.63)",
				iconSmall: "fa fa-warning shake animated red",
				timeout: 4000
			});
			return;
		}
        this.authService.login(this.email, this.password)
            .subscribe(result => {
                    if (result) {
                        // login successful
                        // this.notificationService.bigBox({
							// content: "You have successfully logged in",
							// title: "Success!",
							// color: "#739e73",
							// icon: "fa fa-check bounce animated",
							// timeout: 3000
                        // });
                        // this.notificationService.smallBox({
                        //     title: "You have successfully logged in",
                        //     // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                        //     color: "#739e73",
						// 	iconSmall: "fa fa-check bounce animated",
                        //     timeout: 4000
                        // });
                    }
                },
                error => {
                    let errorJson = error.json();
					// this.notificationService.bigBox({
					// 	content: errorJson.error.statusCode == 401 ? 'Email or password is incorrect' : errorJson.error.message,
					// 	title: "Login failed",
					// 	color: "#c46a69",
					// 	icon: "fa fa-warning shake animated",
					// 	timeout: 3000
					// });

					let errorText = 'Connection lost';
					console.log(errorJson);
					if (!errorJson.error) {
						errorText = 'Connection lost';
					} else if (errorJson.error.statusCode == 401) {
						errorText = 'Credencials are incorrect';
					}

                    this.notificationService.smallBox({
                        // title: "Credencials are incorrect",
						title: errorText,
						color: "rgba(0, 0, 0, 0.63)",
                        iconSmall: "fa fa-warning shake animated red",
                        timeout: 4000
                    });
                });
    }

}
