import {Injectable} from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import 'rxjs/add/operator/mergeMap';
import {Router} from "@angular/router";
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";


@Injectable()
export class AuthService {
    isLoggedIn:boolean = false;
    public token:string;
    public userid:string;

    // store the URL so we can redirect after logging in
    redirectUrl:string;

    constructor(private router:Router, private http:Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);
        this.token = currentUser && currentUser.token;
        this.userid = currentUser && currentUser.userid;
    }

    login(email:string, password:string):Observable<any> {
        return this.http.post('//localhost:3000/appusers/login', {email: email, password: password})
            .map((response:Response) => {
                console.log('cia');
                // login successful if there is a jwt token in response
                let token = response.json() && response.json().id;
                let userid = response.json() && response.json().userId;
                if (token) {
                    this.token = token;
                    this.userid = userid;
                    this.isLoggedIn = true;
                    return true;
                } else {
                    return false;
                }
            })
            .flatMap((currentUser) => this.http.get(`//localhost:3000/appusers/${this.userid}?access_token=${this.token}`)).map((res:Response) => {
                let currentUser = res.json();
                currentUser.token = this.token;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                this.router.navigate(this.redirectUrl ? [this.redirectUrl] : ['/home']);
                return res.json();
            });
    }

    logout():void {
        this.token = null;
        localStorage.removeItem('currentUser');
        this.isLoggedIn = false;
    }
}
