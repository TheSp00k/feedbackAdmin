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
            this.token = params['accessToken'];
            this.requestService.getRequestInfo(params['id'], params['accessToken'])
                .subscribe(result => {
                    if (result.messageCode == 'FEEDBACK_LEFT' && !params.feedbackLeft) {
                        this.loadError = result;
                    } else if (params.feedbackLeft == '1') {
                        this.feedbackLeft = result;
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
