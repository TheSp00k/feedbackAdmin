import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {SettingsService} from "./settings.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    providers: [SettingsService]
})
export class SettingsComponent implements OnInit {
    elementRef: ElementRef;
    public client;
    
    onPicked(time: Date) {
        this.client.requesttime = time;
    };
    onSpin(days: number) {
        this.client.requestdelay = days;
    };
    public saveClientSettings = () => {
        this.settingsService.saveClient(this.client)
            .subscribe(result => {
                console.log(result);
            });
    };

    constructor(private settingsService:SettingsService, @Inject(ElementRef) elementRef: ElementRef) {
        this.elementRef = elementRef;
        this.init();
    }

    init() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.settingsService.getClient(currentUser.clientid)
            .subscribe(result => {
                console.log(result);
                this.client = result;
            });
    }

    ngOnInit() {

    }

}
