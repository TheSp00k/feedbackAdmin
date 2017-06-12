import {Injectable} from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {Router} from "@angular/router";
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";


@Injectable()
export class ProductService {

    constructor(private router:Router, private http:Http) {
    }

    getProducts(clientId):Observable<any> {
        return this.http.get(`//localhost:3000/api/clients/${clientId}/products`)
            .map((response:Response) => {
                return response.json();
            });
    }
    saveProduct(product):Observable<any> {
        return this.http.put(`//localhost:3000/api/products/${product.id}`, product)
            .map((response:Response) => {
                return response.json();
            })
    }
    getProductsCount(clientid:string):Observable<any> {
        return this.http.get(`//localhost:3000/api/clients/${clientid}/products/count`)
            .map((response:Response) => {
                return response.json();
            });
    };
}
