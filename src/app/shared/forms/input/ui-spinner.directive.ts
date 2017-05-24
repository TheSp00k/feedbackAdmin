import {Directive, OnInit, ElementRef, Input, Output, EventEmitter} from '@angular/core';

declare var $:any;

@Directive({
    selector: '[saUiSpinner]'
})
export class UiSpinner implements OnInit {

    @Input() saUiSpinner:any;
    @Output() onSpin = new EventEmitter<Number>();

    constructor(private el:ElementRef) {
    }

    ngOnInit() {
        let options;

        if (this.saUiSpinner == 'decimal') {
            options = {
                step: 0.01,
                numberFormat: "n",
                spin: (event, ui) => {
                    this.onSpin.emit(ui.value);
                }
            };
        } else if (this.saUiSpinner == 'currency') {
            options = {
                min: 5,
                max: 2500,
                step: 25,
                start: 1000,
                numberFormat: "C",
                spin: (event, ui) => {
                    this.onSpin.emit(ui.value);
                }
            };
        }
        $(this.el.nativeElement).spinner((options || this.saUiSpinner) || {
                spin: (event, ui) => {
                    this.onSpin.emit(ui.value);
                }
            })
    }
}
