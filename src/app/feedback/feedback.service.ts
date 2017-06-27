import {Injectable} from '@angular/core';
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {Router} from "@angular/router";
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class FeedbackService {

    constructor(private router:Router, private http:Http) {

    }

	changeFeedbackStatus(currentUser, feedback):Observable<any> {
		return this.http.put(`//localhost:3000/feedbacks/${feedback.id}?access_token=${currentUser.token}`, feedback)
            .map((response:Response) => {
                return response.json();
            });
    }

    getModerationFeedbacks(currentUser:any, dateFrom:string, dateTo:string, pageOffset:number, pageLimit:number):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
		return this.http.get(`//localhost:3000/feedbacks?filter={"order": "created DESC", "limit": ${pageLimit}, "skip": ${pageOffset}, "include": ["product", "customer"], "where": {"and":[{"clientid": "${currentUser.clientid}"}, ${dateFilterStr} {"rejected": null}, {"approved": null}]}}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
            });
    };
	getModerationFeedbacksCount(currentUser:any, dateFrom:string, dateTo:string):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
		return this.http.get(`//localhost:3000/feedbacks/count?where={"and":[{"clientid": "${currentUser.clientid}"}, ${dateFilterStr} {"rejected": null}, {"approved": null}]}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
            });
    };

	getAcceptedFeedbacks(currentUser:any, dateFrom:string, dateTo:string, pageOffset:number, pageLimit:number):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
		return this.http.get(`//localhost:3000/feedbacks?filter={"order": "created DESC", "limit": ${pageLimit}, "skip": ${pageOffset}, "include": ["product", "customer"],"where": {"and":[{"clientid": "${currentUser.clientid}"}, ${dateFilterStr} {"rejected": null}, {"approved": "1"}]}}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
            });
    };
	getAcceptedFeedbacksCount(currentUser:any, dateFrom:string, dateTo:string):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
		return this.http.get(`//localhost:3000/feedbacks/count?where={"and":[{"clientid": "${currentUser.clientid}"}, ${dateFilterStr} {"rejected": null}, {"approved": "1"}]}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
            });
    };

	getRejectedFeedbacks(currentUser:any, dateFrom:string, dateTo:string, pageOffset:number, pageLimit:number):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
		return this.http.get(`//localhost:3000/feedbacks?filter={"order": "created DESC", "limit": ${pageLimit}, "skip": ${pageOffset}, "include": ["product", "customer"],"where": {"and":[{"clientid": "${currentUser.clientid}"}, ${dateFilterStr} {"rejected": "1"}, {"approved": null}]}}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
            });
    };
	getRejectedFeedbacksCount(currentUser:any, dateFrom:string, dateTo:string):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
		return this.http.get(`//localhost:3000/feedbacks/count?where={"and":[{"clientid": "${currentUser.clientid}"}, ${dateFilterStr} {"rejected": "1"}, {"approved": null}]}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
            });
    };


}
