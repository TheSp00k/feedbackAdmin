import {Component, OnInit} from '@angular/core';
import {SettingsService} from "./settings.service";
// import {DateFormatPipe} from 'angular2-moment';
// declare var moment: any;

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    providers: [SettingsService]
})
export class SettingsComponent implements OnInit {

    public client;

    public saveClientSettings = () => {
        this.settingsService.saveClient(this.client)
            .subscribe(result => {
                console.log(result);
            });
    };

    constructor(private settingsService:SettingsService) {
        this.init();
    }

    init() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.settingsService.getClient(currentUser.clientid)
            .subscribe(result => {
                console.log(result);
                // result.requesttime = moment(result.requesttime).format('h:mm');
                this.client = result;
            });
    }

    ngOnInit() {

    }

}
