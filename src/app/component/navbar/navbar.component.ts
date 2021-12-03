import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  container = "container"

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const a = event.target.innerWidth;  
    if (a >= 565) {
      this.container = "container-fluid"
    } else {
      this.container = "container"
    }
  }

  ngOnInit(): void {
    if (window.screen.width >= 565) {
      this.container = "container-fluid"
    } else {
      this.container = "container"
    }
  }

}
