import {Component, OnInit} from '@angular/core';
import {ProductService} from "./product.service";
import {NotificationService} from "../shared/utils/notification.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    providers: [ProductService]
})
export class ProductComponent implements OnInit {

    public products;
    public filters = {};
    public filterStr = '';
    public productsCount;
    public pageLimit = 10;
    public pageOffset = 0;
    public totalProductPages;
    public totalProductPagesArray;
    public currentPage = 1;
    public currentUser = JSON.parse(localStorage.getItem('currentUser'));
	public boolFilterSelect = [
		{title: 'Both', value: undefined},
		{title: 'On', value: true},
		{title: 'Off', value: false}
	];
    public currentFilters = {
        showfeedbacks: undefined,
        sendrequests: undefined,
    };
	
    constructor(private productService:ProductService, private notificationService: NotificationService) {
    }

    public goToPage = (page) => {
        if (page <= this.totalProductPages && page != 0) {
            this.pageOffset = (page * this.pageLimit) - this.pageLimit;
            this.currentPage = page;
            this.getproducts();
            this.getproductsCount();
        }
    };

    public toggleSetting = (product) => {
		this.productService.saveProduct(this.currentUser, product)
            .subscribe(result => {
				// this.notificationService.bigBox({
				// 	title: "Product has been updated",
				// 	color: "#739e73",
				// 	icon: "fa fa-check bounce animated",
				// 	timeout: 3000
				// });
                this.notificationService.smallBox({
                    title: "Product has been updated",
                    // content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                    color: "rgba(0, 0, 0, 0.63)",
                    iconSmall: "fa fa-check bounce animated",
                    timeout: 500
                });
            });
    };

	public filterBool = (value, model) => {
        this.currentFilters[model] = value;
        if (value === undefined) {
			delete this.filters[model];
		} else {
			this.filters[model] = value;
		}
		this.generateFilter();
	}

    public generateFilter = () => {
        console.log(this.filters);
        let filterIndex = 1;
        this.filterStr = '';

        for (let n in this.filters) {
            if (this.filters[n].length == 0 || this.filters[n] == undefined) {
                delete this.filters[n];
            }
        }

        for (let i in this.filters) {
            if (typeof this.filters[i] == 'boolean') {
                this.filterStr += `{"${i}": "${this.filters[i]}"}`;
            }
            if (typeof this.filters[i] == 'string') {
                this.filterStr += `{"${i}": {"like": "%25${this.filters[i]}%25"}}`;
            }
            var size = Object.keys(this.filters).length;
            if (size > 1 && filterIndex != size) {
                this.filterStr += ',';
                filterIndex++;
            }
        }

        this.getproductsCount();
        this.getproducts();
    };

    private getproducts = () => {
        this.productService.getProducts(this.currentUser, this.pageOffset, this.pageLimit, this.filterStr)
            .subscribe(result => {
                console.log(result);
                this.products = result;
            });
    };
    private getproductsCount = () => {
        this.productService.getProductsCount(this.currentUser, this.filterStr)
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
