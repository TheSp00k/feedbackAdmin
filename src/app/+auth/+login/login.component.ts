import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    public email;
    public password;
    public error;
    // constructor(private router:Router) {
    constructor(private authService:AuthService) {
    }

    ngOnInit() {
    }

    login(event) {
        event.preventDefault();

        this.authService.login(this.email, this.password)
            .subscribe(result => {
                if (result === true) {

                    // login successful

                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                }

            });

        // this.router.navigate(['/+home'])
    }

}
