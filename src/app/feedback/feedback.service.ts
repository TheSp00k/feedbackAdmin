import {Injectable} from '@angular/core';
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {Router} from "@angular/router";

import {Http, Response} from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";
import { AuthGuard } from "app/+auth/auth.guard.service";

@Injectable()
export class FeedbackService {

	constructor(private router: Router, private http: Http, private authGuard: AuthGuard) {

    }

	changeFeedbackStatus(currentUser, feedback):Observable<any> {
		return this.http.put(`${environment.apiUrl}/feedbacks/${feedback.id}?access_token=${currentUser.token}`, feedback)
            .map((response:Response) => {
                return response.json();
			})
			.catch((err: Response) => {
				console.log(err);
				this.authGuard.checkResponse(err);
				return Observable.throw(err);
			});
    }

    getModerationFeedbacks(currentUser:any, dateFrom:string, dateTo:string, pageOffset:number, pageLimit:number):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}T00:00:00.000Z"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}T23:59:59.999Z"}},`;
        }
		return this.http.get(`${environment.apiUrl}/feedbacks?filter={"order": "created DESC", "limit": ${pageLimit}, "skip": ${pageOffset}, "include": ["product", "customer"], "where": {"and":[{"clientid": "${currentUser.clientid}"}, ${dateFilterStr} {"rejected": null}, {"approved": null}]}}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
			})
			.catch((err: Response) => {
				console.log(err);
				this.authGuard.checkResponse(err);
				return Observable.throw(err);
			});
    };
	getModerationFeedbacksCount(currentUser:any, dateFrom:string, dateTo:string):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}T00:00:00.000Z"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}T23:59:59.999Z"}},`;
        }
		return this.http.get(`${environment.apiUrl}/feedbacks/count?where={"and":[{"clientid": "${currentUser.clientid}"}, ${dateFilterStr} {"rejected": null}, {"approved": null}]}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
			})
			.catch((err: Response) => {
				console.log(err);
				this.authGuard.checkResponse(err);
				return Observable.throw(err);
			});
    };

	getAcceptedFeedbacks(currentUser:any, dateFrom:string, dateTo:string, pageOffset:number, pageLimit:number):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}T00:00:00.000Z"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}T23:59:59.999Z"}},`;
        }
		return this.http.get(`${environment.apiUrl}/feedbacks?filter={"order": "created DESC", "limit": ${pageLimit}, "skip": ${pageOffset}, "include": ["product", "customer"],"where": {"and":[{"clientid": "${currentUser.clientid}"}, ${dateFilterStr} {"rejected": null}, {"approved": "1"}]}}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
			})
			.catch((err: Response) => {
				console.log(err);
				this.authGuard.checkResponse(err);
				return Observable.throw(err);
			});
    };
	getAcceptedFeedbacksCount(currentUser:any, dateFrom:string, dateTo:string):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}T00:00:00.000Z"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}T23:59:59.999Z"}},`;
        }
		return this.http.get(`${environment.apiUrl}/feedbacks/count?where={"and":[{"clientid": "${currentUser.clientid}"}, ${dateFilterStr} {"rejected": null}, {"approved": "1"}]}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
			})
			.catch((err: Response) => {
				console.log(err);
				this.authGuard.checkResponse(err);
				return Observable.throw(err);
			});
    };

	getRejectedFeedbacks(currentUser:any, dateFrom:string, dateTo:string, pageOffset:number, pageLimit:number):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}T00:00:00.000Z"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}T23:59:59.999Z"}},`;
        }
		return this.http.get(`${environment.apiUrl}/feedbacks?filter={"order": "created DESC", "limit": ${pageLimit}, "skip": ${pageOffset}, "include": ["product", "customer"],"where": {"and":[{"clientid": "${currentUser.clientid}"}, ${dateFilterStr} {"rejected": "1"}, {"approved": null}]}}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
			})
			.catch((err: Response) => {
				console.log(err);
				this.authGuard.checkResponse(err);
				return Observable.throw(err);
			});
    };
	getRejectedFeedbacksCount(currentUser:any, dateFrom:string, dateTo:string):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}T00:00:00.000Z"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}T23:59:59.999Z"}},`;
        }
		return this.http.get(`${environment.apiUrl}/feedbacks/count?where={"and":[{"clientid": "${currentUser.clientid}"}, ${dateFilterStr} {"rejected": "1"}, {"approved": null}]}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
			})
			.catch((err: Response) => {
				console.log(err);
				this.authGuard.checkResponse(err);
				return Observable.throw(err);
			});
    };


}
