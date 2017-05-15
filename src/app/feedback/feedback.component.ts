import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../shared/utils/notification.service";
import {FadeInTop} from "../../shared/animations/fade-in-top.decorator";
import {FeedbackService} from "./feedback.service";
import {Http, Response} from '@angular/http';
import * as moment from 'moment';


import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css'],
    providers: [FeedbackService]
})
export class FeedbackComponent implements OnInit {
    public dateFrom;
    public dateTo;
    public moderationFeedbacks;
    public acceptedFeedbacks;
    public rejectedFeedbacks;

    public state:any = {
        tabs: {
            demo1: 0
        }
    };

    public acceptFeedback = (feedback, from) => {
        feedback.approved = true;
        feedback.rejected = null;
        let feedbackId = feedback.id;
        this.feedbackService.changeFeedbackStatus(feedbackId, feedback)
            .subscribe(result => {
                this[from] = this[from].filter((obj) => {
                    return obj.id !== result.id;
                });
                this.acceptedFeedbacks.push(feedback);
            });
    };
    public rejectFeedback = (feedback, from) => {
        feedback.approved = null;
        feedback.rejected = true;
        let feedbackId = feedback.id;
        this.feedbackService.changeFeedbackStatus(feedbackId, feedback)
            .subscribe(result => {
                this[from] = this[from].filter((obj) => {
                    return obj.id !== result.id;
                });
                this.rejectedFeedbacks.push(feedback);
            });
    };
    public moderateFeedback = (feedback, from) => {
        feedback.approved = null;
        feedback.rejected = null;
        let feedbackId = feedback.id;
        this.feedbackService.changeFeedbackStatus(feedbackId, feedback)
            .subscribe(result => {
                this[from] = this[from].filter((obj) => {
                    return obj.id !== result.id;
                });
                this.moderationFeedbacks.push(feedback);
            });
    };

    constructor(private feedbackService:FeedbackService) {
        this.init();
    }

    init() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.feedbackService.getModerationFeedbacks(currentUser.clientid, this.dateFrom, this.dateTo)
            .subscribe(result => {
                console.log(result);
                this.moderationFeedbacks = result;
            });
        this.feedbackService.getAcceptedFeedbacks(currentUser.clientid, this.dateFrom, this.dateTo)
            .subscribe(result => {
                console.log(result);
                this.acceptedFeedbacks = result;
            });
        this.feedbackService.getRejectedFeedbacks(currentUser.clientid, this.dateFrom, this.dateTo)
            .subscribe(result => {
                console.log(result);
                this.rejectedFeedbacks = result;
            })
    }

    ngOnInit() {
    }

}
