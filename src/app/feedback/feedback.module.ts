import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SmartadminModule} from "../shared/smartadmin.module";
import {SmartadminInputModule} from "../shared/forms/input/smartadmin-input.module";

import {FeedbackRoutingModule} from './feedback-routing.module';
import {FeedbackComponent} from './feedback.component';
import {SmartadminDatatableModule} from "../shared/ui/datatable/smartadmin-datatable.module";

@NgModule({
    imports: [
        CommonModule,
        FeedbackRoutingModule,
        SmartadminModule,
        SmartadminInputModule,
        SmartadminDatatableModule
    ],
    declarations: [FeedbackComponent]
})
export class FeedbackModule {
}
