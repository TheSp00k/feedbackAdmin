import {Component, OnInit} from '@angular/core';
import {HomeService} from "./home.service";
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

    public setDateFilter() {
        console.log('asdasd');
    }

    onMinPicked(date: Date) {
        console.log(date);
        this.dateFrom = date;
        let dateFilter = JSON.parse(localStorage.getItem('dateFilter'));
        if (!dateFilter) {
            dateFilter = {};
        }
        dateFilter.dateFrom = this.dateFrom;
        localStorage.setItem('dateFilter', JSON.stringify(dateFilter));
        this.init();
    }
    onMaxPicked(date: Date) {
        this.dateTo = date;
        let dateFilter = JSON.parse(localStorage.getItem('dateFilter'));
        if (!dateFilter) {
            dateFilter = {};
        }
        dateFilter.dateTo = this.dateTo;
        localStorage.setItem('dateFilter', JSON.stringify(dateFilter));
        this.init();
    }


    
    test() {
        console.log(this.dateFrom);
        this.dateFrom = 'asdasd';
    }

    // public ngOnChanges(changes: {[ propName: string]: SimpleChanges}) {
    //     console.log(changes);
    // }

    constructor(private homeService:HomeService) {

        // this.setDateFilter = () => {
        //     console.log(this.dateFrom);
        //     console.log(this.dateTo);
        // };
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
        this.homeService.getTotalInvitations( this.currentUser.clientid, this.dateFrom, this.dateTo)
            .subscribe(result => {
                console.log(result);
                this.invitationCount = result.count;
            });
        this.homeService.getTotalVerifiedReviews( this.currentUser.clientid, this.dateFrom, this.dateTo)
            .subscribe(result => {
                console.log(result);
                this.verifiedReviewsCount = result.count;
                this.verifiedReviewsPercent = (this.verifiedReviewsCount / this.invitationCount) * 100;
            });
        this.homeService.getTotalRating( this.currentUser.clientid, this.dateFrom, this.dateTo)
            .subscribe(result => {
                this.totalRating = result;
            });


    }

    ngOnInit() {

    }
}
