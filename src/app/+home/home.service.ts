import {Injectable} from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {Router} from "@angular/router";
import {Http, Response} from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";
import { AuthGuard } from "app/+auth/auth.guard.service";



@Injectable()
export class HomeService {

	constructor(private router: Router, private http: Http, private authGuard: AuthGuard) {

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
				let responseJson = response.json();
				console.log(responseJson);
                return response.json();
			})
			.catch((err: Response) => {
				console.log(err);
				this.authGuard.checkResponse(err);
				return Observable.throw(err);
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
			})
			.catch((err: Response) => {
				console.log(err);
				this.authGuard.checkResponse(err);
				return Observable.throw(err);
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
		return this.http.get(`${environment.apiUrl}/feedbacks?filter={"where":{"and":[${dateFilterStr} {"clientid": "${currentUser.clientid}"}, {"purchased": 1}]}}&access_token=${currentUser.token}`)
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
			})
			.catch((err: Response) => {
				console.log(err);
				this.authGuard.checkResponse(err);
				return Observable.throw(err);
			});
    };
}
