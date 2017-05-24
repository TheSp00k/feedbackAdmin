import {Directive, ElementRef, OnInit, Input, EventEmitter, Output} from '@angular/core';

declare var $:any;

@Directive({
    selector: '[smartClockpicker]'
})
export class SmartClockpickerDirective implements OnInit {

    @Input() smartClockpicker:any;
    @Output() onPicked = new EventEmitter<Date>();

    constructor(private el:ElementRef) {
    }

    ngOnInit() {
        System.import('script-loader!clockpicker/dist/bootstrap-clockpicker.min.js').then(()=> {
            this.render()
        })
    }


    render() {
        $(this.el.nativeElement).clockpicker(this.smartClockpicker || {
                placement: 'bottom',
                donetext: 'Done',
                afterDone: () => {
                    let dateTime = new Date(`2017-05-25 ${this.el.nativeElement.value}:00`);
                    console.log(this.el.nativeElement.value);
                    this.onPicked.emit(dateTime);
                }
            });
    }

}
