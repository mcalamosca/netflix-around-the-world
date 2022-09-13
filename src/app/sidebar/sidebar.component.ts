import { Component, OnInit, ViewChild} from '@angular/core';
import { MatList } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  //Defining an array of pages to represent in the sidebar
  public pages: Page[] = [
    {
      title: "Home",
      route: "/home"
    },
    {
      title: "Dashboard",
      route: "/dashboard"
    },
    {
      title: "Test1",
      route: "/test1"
    },
    {
      title: "Test2",
      route: "/test2"
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(route: string){
    this.router.navigate([route])
  }

}

//typically interfaces would reside in their own files, but for the sake of time I'm including them in the component file
export interface Page {
  title: string,
  route: string
}