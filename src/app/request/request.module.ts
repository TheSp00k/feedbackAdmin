import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestRoutingModule } from './request-routing.module';
import { SmartadminModule } from "../shared/smartadmin.module";
import { SmartadminInputModule } from "../shared/forms/input/smartadmin-input.module";
import { RequestComponent } from "./request.component";

@NgModule({
	imports: [
		CommonModule,
		RequestRoutingModule,
		SmartadminModule,
		SmartadminInputModule

	],
	declarations: [RequestComponent]
})
export class RequestModule {
}
