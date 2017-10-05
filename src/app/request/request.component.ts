import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from "./request.service";
import {NotificationService} from "../shared/utils/notification.service";

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.css'],
    providers: [RequestService]
})
export class RequestComponent implements OnInit {

    public request;
    public payload;
    public loadError;
    public feedbackLeft;
    private token;

    constructor(private route:ActivatedRoute, private requestService:RequestService, private notificationService:NotificationService) {
    }

    public sendFeedback = () => {
        console.log(this.request);
        for (let i = 0; i < this.request.products.length; i++) {
            let product = this.request.products[i];
            product.productid = product.id;
            delete product.id;
        }
        this.payload = {
            clientid: this.request.clientid,
            feedbacks: this.request.products,
            requestid: this.request.id,
            token: this.token
        };
        this.requestService.sendFeedback(this.payload)
            .subscribe(result => {
                if (result.code == 200) {
                    this.feedbackLeft = result;
                }
            },
            error => {
                let errorJson = error.json();
                if (errorJson.error.statusCode === 400) {
                    this.notificationService.smallBox({
                        // title: "Credencials are incorrect",
                        title: errorJson.error.message,
                        color: "rgba(0, 0, 0, 0.63)",
                        iconSmall: "fa fa-warning shake animated red",
                        timeout: 4000
                    });
                }
            });
    };

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params); //log the entire params object
            console.log(params['id']); //log the value of id
            // this.request = {"type":"request","status":"sent","created":"2017-09-05T21:12:36.000Z","clientid":1,"customerid":2,"id":9,"products":[{"productnumber":"7B","name":"7B","description":"rodo gerai","created":"2017-09-05T21:12:36.000Z","clientid":1,"photourl":"https://origincdn.azureedge.net/cdn/gaming/desktops/Millennium/img/main.png","sendrequests":true,"showfeedbacks":true,"id":8},{"productnumber":"6A","name":"6A","description":"Rodo gerai","created":"2017-09-05T21:12:36.000Z","clientid":1,"photourl":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5768/5768401_sd.jpg;maxHeight=1000;maxWidth=1000","sendrequests":true,"showfeedbacks":true,"id":9}],"customer":{"name":"Kęstutis","surname":"Tautvydas","email":"k.tautvydas@gmail.com","clientid":1,"id":2}};
            // console.log(this.request);
            this.token = params['accessToken'];
            this.requestService.getRequestInfo(params['id'], params['accessToken'])
                .subscribe(result => {
                    if (result.messageCode == 'FEEDBACK_LEFT') {
                        this.loadError = result;
                    } else {
                        this.request = result;
                    }
                },
                error => {
                    let err = error.json();
                    this.loadError = err.error;
                });
        });
    }
}
