import {Component, OnInit} from '@angular/core';
import {ProductService} from "./product.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    providers: [ProductService]
})
export class ProductComponent implements OnInit {

    public products;
    public productsCount;
    public pageLimit = 10;
    public pageOffset = 0;
    public totalProductPages;
    public totalProductPagesArray;
    public currentPage = 1;
    public currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    constructor(private productService:ProductService) {
    }

    public goToPage = (page) => {
        if (page <= this.totalProductPages && page != 0) {
            this.pageOffset = (page * this.pageLimit) - this.pageLimit;
            this.currentPage = page;
            this.getproducts();
            this.getproductsCount();
        }
    };

    private getproducts = () => {
        this.productService.getProducts(this.currentUser.clientid)
            .subscribe(result => {
                console.log(result);
                this.products = result;
            });
    };
    private getproductsCount = () => {
        this.productService.getProductsCount(this.currentUser.clientid)
            .subscribe(result => {
                console.log(result);
                this.productsCount = result.count;
                this.totalProductPages = this.productsCount / this.pageLimit;
                if (this.totalProductPages % 1 > 0) {
                    this.totalProductPages = parseInt(this.totalProductPages) + 1;
                }
                this.totalProductPagesArray = Array.from({length: this.totalProductPages}, (v, i) => i + 1);
            })
    };

    ngOnInit() {
        this.pageOffset = (this.pageLimit * this.currentPage) - this.pageLimit;
        this.getproductsCount();

        this.getproducts();
    }

}
