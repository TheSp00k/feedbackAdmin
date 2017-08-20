import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LayoutService} from '../layout.service';


declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private layoutService: LayoutService) {
  }

  ngOnInit() {
  }


  searchMobileActive = false;

  toggleSearchMobile(){
    this.searchMobileActive = !this.searchMobileActive;

    $('body').toggleClass('search-mobile', this.searchMobileActive);
  }

  onSubmit() {
    this.router.navigate(['/miscellaneous/search']);

  }
  toggle() {
    this.layoutService.onMinifyMenu()
  }
  
}
