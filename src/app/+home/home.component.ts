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

    setDateFilter() {
        console.log('asdasd');
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

        this.init();
    }

    init() {
        this.setDateFilter();
        let dateFilter = JSON.parse(localStorage.getItem('dateFilter'));
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.homeService.getTotalInvitations(currentUser.clientid, this.dateFrom, this.dateTo)
            .subscribe(result => {
                console.log(result);
                this.invitationCount = result.count;
            });
        this.homeService.getTotalVerifiedReviews(currentUser.clientid, this.dateFrom, this.dateTo)
            .subscribe(result => {
                console.log(result);
                this.verifiedReviewsCount = result.count;
                this.verifiedReviewsPercent = (this.verifiedReviewsCount / this.invitationCount) * 100;
            });
        this.homeService.getTotalRating(currentUser.clientid, this.dateFrom, this.dateTo)
            .subscribe(result => {
                this.totalRating = result;
            });


    }

    ngOnInit() {

    }
}
