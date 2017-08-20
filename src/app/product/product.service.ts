import {Injectable} from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {Router} from "@angular/router";
import {Http, Response} from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";


@Injectable()
export class ProductService {

    constructor(private router:Router, private http:Http) {
    }

	getProducts(currentUser, pageOffset:number, pageLimit:number, filter:string):Observable<any> {

        let filterStr = '';
        if (filter.length > 0) {
            filterStr = `, "where": {"and":[${filter}]}`;
        }
		return this.http.get(`${environment.apiUrl}/clients/${currentUser.clientid}/products?filter={"limit": ${pageLimit}, "skip": ${pageOffset} ${filterStr}}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
            });
    }
	saveProduct(currentUser, product):Observable<any> {
		return this.http.put(`${environment.apiUrl}/products/${product.id}?access_token=${currentUser.token}`, product)
            .map((response:Response) => {
                return response.json();
            })
    }
    getProductsCount(currentUser, filter:string):Observable<any> {
        let filterStr = '';
        if (filter.length > 0) {
            filterStr = `"and":[${filter}]`;
        }
		return this.http.get(`${environment.apiUrl}/clients/${currentUser.clientid}/products/count?where={${filterStr}}&access_token=${currentUser.token}`)
            .map((response:Response) => {
                return response.json();
            });
    };
}
