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

    public saveClientSettings = () => {
		this.settingsService.saveClient(this.currentUser, this.client)
            .subscribe(result => {
				// this.notificationService.bigBox({
				// 	title: "Settings have been updated",
				// 	color: "#739e73",
				// 	icon: "fa fa-check bounce animated",
				// 	timeout: 3000
				// });
                // this.notificationService.smallBox({
                //     title: "Settings have been updated",
                //     // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                //     color: "#659265",
                //     iconSmall: "fa fa-check bounce animated",
                //     timeout: 4000
                // });
            });
    };

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
