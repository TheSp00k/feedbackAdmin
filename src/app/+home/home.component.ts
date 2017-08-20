import {Component, OnInit} from '@angular/core';
import {HomeService} from "./home.service";
import {NotificationService} from "../shared/utils/notification.service";
// import { SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [HomeService]
})
export class HomeComponent implements OnInit {

    public invitationCount:number;
    public verifiedReviewsCount:number;
    public verifiedReviewsPercent:number;
    public totalRating:number;
    public dateFrom;
    public dateTo;
    public currentUser;


    onMinPicked(date: Date) {
        this.dateFrom = date;
        let dateFilter = JSON.parse(localStorage.getItem('dateFilter'));
        if (!dateFilter) {
            dateFilter = {};
        }
        dateFilter.dateFrom = this.dateFrom;
        localStorage.setItem('dateFilter', JSON.stringify(dateFilter));
        // this.init();
		// this.notificationService.bigBox({
		// 	title: "Dashboard has been filtered by date",
		// 	color: "#739e73",
		// 	icon: "fa fa-check bounce animated",
		// 	timeout: 3000
		// });
        // this.notificationService.smallBox({
        //     title: "Dashboard has been filtered by date",
        //     // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
        //     color: "#659265",
        //     iconSmall: "fa fa-check bounce animated",
        //     timeout: 4000
        // });
    }
    onMaxPicked(date: Date) {
        this.dateTo = date;
        let dateFilter = JSON.parse(localStorage.getItem('dateFilter'));
        if (!dateFilter) {
            dateFilter = {};
        }
        dateFilter.dateTo = this.dateTo;
        localStorage.setItem('dateFilter', JSON.stringify(dateFilter));
        // this.init();
		// this.notificationService.bigBox({
		// 	title: "Dashboard has been filtered by date",
		// 	color: "#739e73",
		// 	icon: "fa fa-check bounce animated",
		// 	timeout: 3000
		// });
        // this.notificationService.smallBox({
        //     title: "Dashboard has been filtered by date",
        //     // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
        //     color: "#659265",
        //     iconSmall: "fa fa-check bounce animated",
        //     timeout: 4000
        // });
    }

    constructor(private homeService:HomeService, private notificationService: NotificationService) {
        let dateFilter = JSON.parse(localStorage.getItem('dateFilter'));
        if (dateFilter && dateFilter.dateFrom) {
            this.dateFrom = dateFilter.dateFrom;
        }
        if (dateFilter && dateFilter.dateTo) {
            this.dateTo = dateFilter.dateTo;
        }
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            this.currentUser = currentUser;
        }
        this.init();
    }

    init() {
        this.homeService.getTotalInvitations( this.currentUser, this.dateFrom, this.dateTo)
            .subscribe(result => {
                this.invitationCount = result.count;
            });
        this.homeService.getTotalVerifiedReviews( this.currentUser, this.dateFrom, this.dateTo)
            .subscribe(result => {
                this.verifiedReviewsCount = result.count;
                this.verifiedReviewsPercent = (this.verifiedReviewsCount / this.invitationCount) * 100;
            });
        this.homeService.getTotalRating( this.currentUser, this.dateFrom, this.dateTo)
            .subscribe(result => {
                this.totalRating = result;
            });


    }

    ngOnInit() {

    }
}
