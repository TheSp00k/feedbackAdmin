import {Component, OnInit} from '@angular/core';
import {LayoutService} from "../../layout.service";

declare var $: any;

@Component({
  selector: 'sa-collapse-menu',
  templateUrl: './collapse-menu.component.html'
})
export class CollapseMenuComponent {

  constructor(
    private layoutService: LayoutService
  ) {

  }

  onToggle() {
    if ($(window).width() < 979) {
      this.layoutService.onCollapseMenu()
    } else {
      this.layoutService.onMinifyMenu()
    }
  }
}
