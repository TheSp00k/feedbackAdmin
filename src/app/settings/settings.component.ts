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

    onPicked(time:Date) {
        this.client.requesttime = time;
    };

    onSpin(days:number) {
        this.client.requestdelay = days;
    };

    public saveClientSettings = () => {
        this.settingsService.saveClient(this.client)
            .subscribe(result => {
                this.notificationService.smallBox({
                    title: "Settings have been updated",
                    // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                    color: "#659265",
                    iconSmall: "fa fa-check bounce animated",
                    timeout: 4000
                });
            });
    };

    constructor(private settingsService:SettingsService, @Inject(ElementRef) elementRef:ElementRef, private notificationService:NotificationService) {
        this.elementRef = elementRef;
        this.init();
    }

    init() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.settingsService.getClient(currentUser.clientid)
            .subscribe(result => {
                this.client = result;
            });
    }

    ngOnInit() {

    }
}
