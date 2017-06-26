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

    changeFeedbackStatus(feedbackId, feedback):Observable<any> {
        return this.http.put(`//localhost:3000/feedbacks/${feedbackId}`, feedback)
            .map((response:Response) => {
                return response.json();
            });
    }

    getModerationFeedbacks(clientid:string, dateFrom:string, dateTo:string, pageOffset:number, pageLimit:number):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
        return this.http.get(`//localhost:3000/feedbacks?filter={"order": "created DESC", "limit": ${pageLimit}, "skip": ${pageOffset}, "include": ["product", "customer"], "where": {"and":[{"clientid": "${clientid}"}, ${dateFilterStr} {"rejected": null}, {"approved": null}]}}`)
            .map((response:Response) => {
                return response.json();
            });
    };
    getModerationFeedbacksCount(clientid:string, dateFrom:string, dateTo:string):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
        return this.http.get(`//localhost:3000/feedbacks/count?where={"and":[{"clientid": "${clientid}"}, ${dateFilterStr} {"rejected": null}, {"approved": null}]}`)
            .map((response:Response) => {
                return response.json();
            });
    };

    getAcceptedFeedbacks(clientid:string, dateFrom:string, dateTo:string, pageOffset:number, pageLimit:number):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
        return this.http.get(`//localhost:3000/feedbacks?filter={"order": "created DESC", "limit": ${pageLimit}, "skip": ${pageOffset}, "include": ["product", "customer"],"where": {"and":[{"clientid": "${clientid}"}, ${dateFilterStr} {"rejected": null}, {"approved": "1"}]}}`)
            .map((response:Response) => {
                return response.json();
            });
    };
    getAcceptedFeedbacksCount(clientid:string, dateFrom:string, dateTo:string):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
        return this.http.get(`//localhost:3000/feedbacks/count?where={"and":[{"clientid": "${clientid}"}, ${dateFilterStr} {"rejected": null}, {"approved": "1"}]}`)
            .map((response:Response) => {
                return response.json();
            });
    };

    getRejectedFeedbacks(clientid:string, dateFrom:string, dateTo:string, pageOffset:number, pageLimit:number):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
        return this.http.get(`//localhost:3000/feedbacks?filter={"order": "created DESC", "limit": ${pageLimit}, "skip": ${pageOffset}, "include": ["product", "customer"],"where": {"and":[{"clientid": "${clientid}"}, ${dateFilterStr} {"rejected": "1"}, {"approved": null}]}}`)
            .map((response:Response) => {
                return response.json();
            });
    };
    getRejectedFeedbacksCount(clientid:string, dateFrom:string, dateTo:string):Observable<any> {
        let dateFilterStr = '';
        if (dateFrom) {
            dateFilterStr += `{"created": {"gte":"${dateFrom}"}},`;
        }
        if (dateTo) {
            dateFilterStr += `{"created": {"lte":"${dateTo}"}},`;
        }
        return this.http.get(`//localhost:3000/feedbacks/count?where={"and":[{"clientid": "${clientid}"}, ${dateFilterStr} {"rejected": "1"}, {"approved": null}]}`)
            .map((response:Response) => {
                return response.json();
            });
    };


}
