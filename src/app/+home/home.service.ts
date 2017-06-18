import {Injectable} from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {Router} from "@angular/router";
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";


@Injectable()
export class HomeService {

    constructor(private router: Router, private http: Http) {

    }

    getTotalInvitations(clientid: string, dateFrom: string, dateTo: string): Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
        return this.http.get(`//localhost:3000/api/requests/count?where={"and":[${dateFilterStr} {"clientid": "${clientid}"}]}`)
            .map((response:Response) => {
                return response.json();
            });
    };
    getTotalVerifiedReviews(clientid:string, dateFrom: string, dateTo: string): Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
        return this.http.get(`//localhost:3000/api/feedbacks/count?where={"and":[${dateFilterStr} {"clientid": "${clientid}"}]}`)
            .map((response:Response) => {
                return response.json();
            });
    };
    getTotalRating(clientid:string, dateFrom: string, dateTo: string): Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
        return this.http.get(`//localhost:3000/api/feedbacks?filter={"where":{"and":[${dateFilterStr} {"clientid": "${clientid}"}, {"approved": 1}]}}`)
            .map((response:Response) => {
                let feedbacks = response.json();
                let totalScoreSum = 0;
                let totalRatingScores = 0;
                for (let feedback of feedbacks) {
                    if (feedback.totalratingscore > 0 && feedback.totalratingscore) {
                        totalScoreSum += feedback.totalratingscore;
                        totalRatingScores += 1;
                    }
                }
                return totalScoreSum / totalRatingScores;
            });
    };

    // login(email:string, password:string): Observable<boolean> {
    //     return this.http.post('//localhost:3000/api/appusers/login', {email: email, password: password})
    //         .map((response: Response) => {
    //             // login successful if there is a jwt token in response
    //             let token = response.json() && response.json().id;
    //             if (token) {
    //                 // set token
    //                 this.token = token;
    //                 localStorage.setItem('currentUser', JSON.stringify({email: email, token: token}));
    //                 this.isLoggedIn = true;
    //                 this.router.navigate(this.redirectUrl ? [this.redirectUrl] : ['/home']);
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         });
    // }

    // logout():void {
    //     this.token = null;
    //     localStorage.removeItem('currentUser');
    //     this.isLoggedIn = false;
    // }
}
