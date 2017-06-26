import {Injectable} from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {Router} from "@angular/router";
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";


@Injectable()
export class SettingsService {

    constructor(private router:Router, private http:Http) {
    }

    getClient(clientId):Observable<any> {
        return this.http.get(`//localhost:3000/clients/${clientId}`)
            .map((response:Response) => {
                return response.json();
            });
    }

    saveClient(client):Observable<any> {
        return this.http.put(`//localhost:3000/clients/${client.id}`, client)
            .map((response:Response) => {
                return response.json();
            })
    }
}
