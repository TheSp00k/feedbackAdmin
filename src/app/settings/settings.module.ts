import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {settingsRouting} from './settings.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {SmartadminInputModule} from "../shared/forms/input/smartadmin-input.module";
import {SettingsComponent} from "./settings.component";

@NgModule({
    imports: [
        CommonModule,
        settingsRouting,
        SmartadminModule,
        SmartadminInputModule,
        
    ],
    declarations: [SettingsComponent]
})
export class SettingsModule {
}
