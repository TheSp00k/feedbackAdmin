import {Injectable} from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {Router} from "@angular/router";
import {Http, Response} from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";
import { AuthGuard } from "app/+auth/auth.guard.service";


@Injectable()
export class SettingsService {

	constructor(private router: Router, private http: Http, private authGuard: AuthGuard) {}

    getClient(currentUser):Observable<any> {
		return this.http.get(`${environment.apiUrl}/clients/${currentUser.clientid}?access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
			})
			.catch((err: Response) => {
				console.log(err);
				this.authGuard.checkResponse(err);
				return Observable.throw(err);
			});
    }

    saveClient(currentUser, client):Observable<any> {
		return this.http.put(`${environment.apiUrl}/clients/${client.id}?access_token=${currentUser.token}`, client)
            .map((response:Response) => {
                return response.json();
			}).catch((err: Response) => {
				console.log(err);
				this.authGuard.checkResponse(err);
				return Observable.throw(err);
			});
    }
}
