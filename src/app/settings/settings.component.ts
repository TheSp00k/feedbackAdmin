import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {SettingsService} from "./settings.service";
import {NotificationService} from "../shared/utils/notification.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    providers: [SettingsService]
})
export class SettingsComponent implements OnInit {
    elementRef:ElementRef;
    public client;
    public dropdownOpen = false;
	public currentUser = JSON.parse(localStorage.getItem('currentUser'));
    public requestDelayDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

    onPicked(time:Date) {
        this.client.requesttime = time;
    };
    
    onSpin(days:number) {
        this.client.requestdelay = days;
    };

    public toggleDropdown = () => {
        this.dropdownOpen = this.dropdownOpen ? false : true;
    };
    
    public selectDropdown = (option) => {
        // event.stopPropagation();
        this.client.requestdelay = option;
        this.dropdownOpen = false;
    };

    public addEmptyCrit = () => {
        if (this.client.ratingcrits.length < 4) {
            this.client.ratingcrits.push({clientid: this.client.id, active: false, name: ''});
            this.settingsService.saveRatingCrits(this.currentUser, this.client.ratingcrits)
                .subscribe(result => {
                    this.client.ratingcrits = result;
                    this.notificationService.smallBox({
                        title: "Criteria has been added",
                        // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                        color: "rgba(0, 0, 0, 0.63)",
                        iconSmall: "fa fa-check bounce animated",
                        timeout: 1000
                    });
                });
        } else {
            this.notificationService.smallBox({
                title: "Rating criterias limit reached",
                color: "rgba(0, 0, 0, 0.63)",
                iconSmall: "fa fa-warning shake animated red",
                timeout: 1000
            });
        }
    };
    public enableCrit = (key, id) => {
        this.client.ratingcrits[key].active = true;
        this.saveRatingCrits();
        // this.settingsService.saveRatingCrits(this.currentUser, this.client.ratingcrits)
        // .subscribe(result => {
        //     this.client.ratingcrits = result;
        //     this.notificationService.smallBox({
        //         title: "Criteria has been updated",
        //         // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
        //         color: "rgba(0, 0, 0, 0.63)",
        //         iconSmall: "fa fa-check bounce animated",
        //         timeout: 1000
        //     });
        // });
    };
    // public addCrit = (crit) => {
    //     crit.clientid = this.client.id;
    //     this.client.ratingcrits.push(crit);
    // };
    public saveRatingCrits = () => {
        this.settingsService.saveRatingCrits(this.currentUser, this.client.ratingcrits)
        .subscribe(result => {
            // this.client.ratingcrits = result;
            this.notificationService.smallBox({
                title: "Criteria has been updated",
                // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                color: "rgba(0, 0, 0, 0.63)",
                iconSmall: "fa fa-check bounce animated",
                timeout: 1000
            });
        });
    };
    public saveClientSettings = () => {
        console.log(this.client);
		this.settingsService.saveClient(this.currentUser, this.client)
            .subscribe(result => {
				// this.notificationService.bigBox({
				// 	title: "Settings have been updated",
				// 	color: "#739e73",
				// 	icon: "fa fa-check bounce animated",
				// 	timeout: 3000
                // });
                this.saveRatingCrits();
                // this.settingsService.saveRatingCrits(this.currentUser, this.client.ratingcrits)
                // .subscribe(result => {
                //     this.client.ratingcrits = result;
                //     this.notificationService.smallBox({
                //         title: "Settings have been updated",
                //         // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                //         color: "rgba(0, 0, 0, 0.63)",
                //         iconSmall: "fa fa-check bounce animated",
                //         timeout: 1000
                //     });
                // });
            });
    };

    public disableCrit = (key, id) => {
        this.client.ratingcrits[key].active = false;
        this.saveRatingCrits();
        // this.settingsService.saveRatingCrits(this.currentUser, this.client.ratingcrits)
        // .subscribe(result => {
        //     this.client.ratingcrits = result;
        //     this.notificationService.smallBox({
        //         title: "Settings have been updated",
        //         // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
        //         color: "rgba(0, 0, 0, 0.63)",
        //         iconSmall: "fa fa-check bounce animated",
        //         timeout: 1000
        //     });
        // });
    }

    constructor(private settingsService:SettingsService, @Inject(ElementRef) elementRef:ElementRef, private notificationService:NotificationService) {
        this.elementRef = elementRef;
        this.init();
    }

    init() {
        this.settingsService.getClient(this.currentUser)
            .subscribe(result => {
                this.client = result;
            });
    }

    ngOnInit() {

    }
}
