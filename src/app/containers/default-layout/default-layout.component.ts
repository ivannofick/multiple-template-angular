import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { navItems } from 'src/app/_nav';

@Component({
  // tslint:disable-next-line
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']

})
export class DefaultLayoutComponent implements OnInit {
  sideBar = "d-flex toggled";
  navBar = "navbar-toggler";
  navCollapse = "collapse navbar-collapse";
  dropdownNav = "collapse navbar-collapse";
  dropdownNavRight = "dropdown-menu dropdown-menu-right";
  navItems= navItems;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  
  changePage(path) {
    this.router.navigate(['/' + path]);
  }

  openSideBar(sideBar:string) {
    this.sideBar = this.sideBar != "d-flex" ? "d-flex" : "d-flex toggled";
  }

  openNavBar(sideBar:string) {
    this.navBar = this.navBar != "navbar-toggler" ? "navbar-toggler" : "navbar-toggler collapsed";
    this.navCollapse = this.navCollapse != "collapse navbar-collapse" ? "collapse navbar-collapse" : "navbar-collapse collapse show";
  }
  
  showDropdownNav(event) {
    event.preventDefault();
    this.dropdownNavRight = this.dropdownNavRight != "dropdown-menu dropdown-menu-right" ? "dropdown-menu dropdown-menu-right" : "dropdown-menu dropdown-menu-right show";
    this.dropdownNav = this.dropdownNav != "nav-item dropdown" ? "nav-item dropdown" : "nav-item dropdown show";

  }

}