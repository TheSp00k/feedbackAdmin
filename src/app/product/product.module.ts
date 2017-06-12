import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { SmartadminModule } from "../shared/smartadmin.module";
import { SmartadminInputModule } from "../shared/forms/input/smartadmin-input.module";
import { ProductComponent } from "./product.component";

@NgModule({
	imports: [
		CommonModule,
		ProductRoutingModule,
		SmartadminModule,
		SmartadminInputModule

	],
	declarations: [ProductComponent]
})
export class ProductModule {
}
