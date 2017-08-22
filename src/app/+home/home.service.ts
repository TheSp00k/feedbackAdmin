import {Injectable} from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {Router} from "@angular/router";
import {Http, Response} from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";


@Injectable()
export class HomeService {

    constructor(private router: Router, private http: Http) {

    }

    getTotalInvitations(currentUser: any, dateFrom: string, dateTo: string): Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
		return this.http.get(`${environment.apiUrl}/requests/count?where={"and":[${dateFilterStr} {"clientid": "${currentUser.clientid}"}]}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
            });
    };
    getTotalVerifiedReviews(currentUser:any, dateFrom: string, dateTo: string): Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
		return this.http.get(`${environment.apiUrl}/requests/count?where={"and":[${dateFilterStr} {"clientid": "${currentUser.clientid}"}, {"status": "replied"}]}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
            });
    };
    getTotalRating(currentUser: any, dateFrom: string, dateTo: string): Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
		return this.http.get(`${environment.apiUrl}/feedbacks?filter={"where":{"and":[${dateFilterStr} {"clientid": "${currentUser.clientid}"}, {"approved": 1}]}}&access_token=${currentUser.token}`)
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
				if (totalScoreSum == 0 || totalRatingScores == 0) {
					return 0;
				}
                return totalScoreSum / totalRatingScores;
            });
    };

    // login(email:string, password:string): Observable<boolean> {
    //     return this.http.post('${environment.apiUrl}/appusers/login', {email: email, password: password})
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
