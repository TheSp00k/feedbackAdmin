import {Component, OnInit} from '@angular/core';
import {FadeInTop} from "../../shared/animations/fade-in-top.decorator";
import {FeedbackService} from "./feedback.service";
import {Http, Response} from '@angular/http';
import * as moment from 'moment';


import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {NotificationService} from "../shared/utils/notification.service";

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
    public moderationFeedbacksCount;
    public acceptedFeedbacks;
    public acceptedFeedbacksCount;
    public rejectedFeedbacks;
    public rejectedFeedbacksCount;
    public pageLimit = 10;
    public pageOffset = 0;
    public totalModeratedPages;
    public totalModeratedPagesArray;
    public totalAcceptedPages;
    public totalAcceptedPagesArray;
    public totalRejectedPages;
    public totalRejectedPagesArray;
    public currentPage = 1;
    public currentUser = JSON.parse(localStorage.getItem('currentUser'));

    public state:any = {
        tabs: {
            current: 0
        }
    };

    public changeTab = (nr) => {
        this.state.tabs.current = nr;
        this.pageOffset = 0;
        this.currentPage = 1;
    };
    
    onMinPicked(date:Date) {

        this.dateFrom = date;
        let dateFilter = JSON.parse(localStorage.getItem('dateFilter'));
        if (!dateFilter) {
            dateFilter = {};
        }
        dateFilter.dateFrom = this.dateFrom;
        localStorage.setItem('dateFilter', JSON.stringify(dateFilter));
        // this.init();
		// this.notificationService.bigBox({
		// 	title: "Feedback list has been filtered by date",
		// 	color: "#739e73",
		// 	icon: "fa fa-check bounce animated",
		// 	timeout: 3000
		// });
        // this.notificationService.smallBox({
        //     title: "Feedback list filtered by date",
        //     // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
        //     color: "#659265",
        //     iconSmall: "fa fa-check bounce animated",
        //     timeout: 4000
        // });
    };

    onMaxPicked(date:Date) {
        this.dateTo = date;
        let dateFilter = JSON.parse(localStorage.getItem('dateFilter'));
        if (!dateFilter) {
            dateFilter = {};
        }
        dateFilter.dateTo = this.dateTo;
        localStorage.setItem('dateFilter', JSON.stringify(dateFilter));
        // this.init();
        // this.notificationService.smallBox({
        //     title: "Feedback list filtered by date",
        //     // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
        //     color: "#659265",
        //     iconSmall: "fa fa-check bounce animated",
        //     timeout: 4000
        // });
        // this.notificationService.bigBox({
			// title: "Feedback list has been filtered by date",
			// color: "#739e73",
			// icon: "fa fa-check bounce animated",
			// timeout: 3000
        // });
    };

    public showNotification = () => {
        this.notificationService.smallBox({
            title: "Feedback list filtered by date",
            // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
            color: "rgba(0, 0, 0, 0.63)",
            iconSmall: "fa fa-check bounce animated",
            timeout: 1000
        });
    };

    public calculatePage = () => {
        this.pageOffset = this.pageLimit * this.currentPage;

        this.totalAcceptedPages = this.acceptedFeedbacksCount / this.pageLimit;
        this.totalRejectedPages = this.rejectedFeedbacksCount / this.pageLimit;
        this.totalModeratedPages = this.moderationFeedbacksCount / this.pageLimit;

        if (this.totalAcceptedPages % 1 > 0) {
            this.totalAcceptedPages = parseInt(this.totalAcceptedPages) + 1;
        }
        if (this.totalRejectedPages % 1 > 0) {
            this.totalRejectedPages = parseInt(this.totalRejectedPages) + 1;
        }
        if (this.totalModeratedPages % 1 > 0) {
            this.totalModeratedPages = parseInt(this.totalModeratedPages) + 1;
        }
    };

    public goToPage = (type, page) => {
        if (type == 'moderated') {
            if (page <= this.totalModeratedPages && page != 0) {
                this.pageOffset = (page * this.pageLimit) - this.pageLimit;
                this.currentPage = page;
                this.getModerationFeedbacks();
                this.getModerationFeedbacksCount();
            }
        }
        if (type == 'accepted') {
            if (page <= this.totalAcceptedPages && page != 0) {
                this.pageOffset = (page * this.pageLimit) - this.pageLimit;
                this.currentPage = page;
                this.getAcceptedFeedbacks();
                this.getAcceptedFeedbacksCount();
            }
        }
        if (type == 'rejected') {
            if (page <= this.totalRejectedPages && page != 0) {
                this.pageOffset = (page * this.pageLimit) - this.pageLimit;
                this.currentPage = page;
                this.getRejectedFeedbacks();
                this.getRejectedFeedbacksCount();
            }
        }
    };


    public acceptFeedback = (feedback, from) => {
        feedback.approved = true;
        feedback.rejected = null;
		this.feedbackService.changeFeedbackStatus(this.currentUser, feedback)
            .subscribe(result => {
                this[from] = this[from].filter((obj) => {
                    return obj.id !== result.id;
                });
                // this.acceptedFeedbacks.push(feedback);
                this.getRejectedFeedbacksCount();
                this.getModerationFeedbacksCount();
                this.getAcceptedFeedbacksCount();
                this.getModerationFeedbacks();
                this.getAcceptedFeedbacks();
                this.getRejectedFeedbacks();
				// this.notificationService.bigBox({
				// 	title: "This feedback was sent to accepted tab",
				// 	color: "#739e73",
				// 	icon: "fa fa-check bounce animated",
				// 	timeout: 3000
				// });
                this.notificationService.smallBox({
                    title: "This feedback was accepted",
                    // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                    // color: "#659265",
                    color: "rgba(0, 0, 0, 0.63)",
                    iconSmall: "fa fa-check bounce animated",
                    timeout: 1000
                });
            });
    };
    public rejectFeedback = (feedback, from) => {
        feedback.approved = null;
        feedback.rejected = true;
		this.feedbackService.changeFeedbackStatus(this.currentUser, feedback)
            .subscribe(result => {
                this[from] = this[from].filter((obj) => {
                    return obj.id !== result.id;
                });
                this.getRejectedFeedbacksCount();
                this.getModerationFeedbacksCount();
                this.getAcceptedFeedbacksCount();
                this.getModerationFeedbacks();
                this.getAcceptedFeedbacks();
                this.getRejectedFeedbacks();
				// this.notificationService.bigBox({
				// 	title: "This feedback was sent to rejected tab",
				// 	color: "#739e73",
				// 	icon: "fa fa-check bounce animated",
				// 	timeout: 3000
				// });
                this.notificationService.smallBox({
                    title: "This feedback was rejected",
                    // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                    color: "rgba(0, 0, 0, 0.63)",
                    iconSmall: "fa fa-check bounce animated",
                    timeout: 1000
                });
            });
    };
    public moderateFeedback = (feedback, from) => {
        feedback.approved = null;
        feedback.rejected = null;
		this.feedbackService.changeFeedbackStatus(this.currentUser, feedback)
            .subscribe(result => {
                this[from] = this[from].filter((obj) => {
                    return obj.id !== result.id;
                });
                this.getRejectedFeedbacksCount();
                this.getModerationFeedbacksCount();
                this.getAcceptedFeedbacksCount();
                this.getModerationFeedbacks();
                this.getAcceptedFeedbacks();
                this.getRejectedFeedbacks();
				// this.notificationService.bigBox({
				// 	title: "This feedback was sent to moderated tab",
				// 	color: "#739e73",
				// 	icon: "fa fa-check bounce animated",
				// 	timeout: 3000
				// });
                this.notificationService.smallBox({
                    title: "This feedback was moderated",
                    // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                    color: "rgba(0, 0, 0, 0.63)",
                    iconSmall: "fa fa-check bounce animated",
                    timeout: 1000
                });
            });
    };

    private getModerationFeedbacks = () => {
        this.feedbackService.getModerationFeedbacks(this.currentUser, this.dateFrom, this.dateTo, this.pageOffset, this.pageLimit)
            .subscribe(result => {
                this.moderationFeedbacks = result;
            });
    };
    private getModerationFeedbacksCount = () => {
        this.feedbackService.getModerationFeedbacksCount(this.currentUser, this.dateFrom, this.dateTo)
            .subscribe(result => {
                this.moderationFeedbacksCount = result.count;
                this.totalModeratedPages = this.moderationFeedbacksCount / this.pageLimit;
                if (this.totalModeratedPages % 1 > 0) {
                    this.totalModeratedPages = parseInt(this.totalModeratedPages) + 1;
                }
                this.totalModeratedPagesArray = Array.from({length: this.totalModeratedPages}, (v, i) => i + 1);
            });
    };
    private getAcceptedFeedbacks = () => {
        this.feedbackService.getAcceptedFeedbacks(this.currentUser, this.dateFrom, this.dateTo, this.pageOffset, this.pageLimit)
            .subscribe(result => {
                this.acceptedFeedbacks = result;
            });
    };
    private getAcceptedFeedbacksCount = () => {
        this.feedbackService.getAcceptedFeedbacksCount(this.currentUser, this.dateFrom, this.dateTo)
            .subscribe(result => {
                this.acceptedFeedbacksCount = result.count;
                this.totalAcceptedPages = this.acceptedFeedbacksCount / this.pageLimit;
                if (this.totalAcceptedPages % 1 > 0) {
                    this.totalAcceptedPages = parseInt(this.totalAcceptedPages) + 1;
                }
                this.totalAcceptedPagesArray = Array.from({length: this.totalAcceptedPages}, (v, i) => i + 1);
            });
    };
    private getRejectedFeedbacks = () => {
        this.feedbackService.getRejectedFeedbacks(this.currentUser, this.dateFrom, this.dateTo, this.pageOffset, this.pageLimit)
            .subscribe(result => {
                console.log(result);
                this.rejectedFeedbacks = result;
            });
    };
    private getRejectedFeedbacksCount = () => {
        this.feedbackService.getRejectedFeedbacksCount(this.currentUser, this.dateFrom, this.dateTo)
            .subscribe(result => {
                this.rejectedFeedbacksCount = result.count;
                this.totalRejectedPages = this.rejectedFeedbacksCount / this.pageLimit;
                if (this.totalRejectedPages % 1 > 0) {
                    this.totalRejectedPages = parseInt(this.totalRejectedPages) + 1;
                }
                this.totalRejectedPagesArray = Array.from({length: this.totalRejectedPages}, (v, i) => i + 1);
            })
    };

    constructor(private feedbackService:FeedbackService, private notificationService: NotificationService) {
        let dateFilter = JSON.parse(localStorage.getItem('dateFilter'));
        if (dateFilter && dateFilter.dateFrom) {
            this.dateFrom = dateFilter.dateFrom;
        }
        if (dateFilter && dateFilter.dateTo) {
            this.dateTo = dateFilter.dateTo;
        }
        this.init();
    }

    init() {
        this.pageOffset = (this.pageLimit * this.currentPage) - this.pageLimit;
        this.getRejectedFeedbacksCount();
        this.getModerationFeedbacksCount();
        this.getAcceptedFeedbacksCount();

        // this.calculatePage();

        this.getModerationFeedbacks();
        this.getAcceptedFeedbacks();
        this.getRejectedFeedbacks();

    }

    ngOnInit() {
    }

}
