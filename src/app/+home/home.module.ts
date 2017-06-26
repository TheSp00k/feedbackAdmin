import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {homeRouting} from './home.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {SmartadminInputModule} from "../shared/forms/input/smartadmin-input.module";
import {FlotChartModule} from "../shared/graphs/flot-chart/flot-chart.module";
import {HomeComponent} from "./home.component";

@NgModule({
    imports: [
        CommonModule,
        homeRouting,
        SmartadminModule,
        SmartadminInputModule,
        FlotChartModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule {
}
