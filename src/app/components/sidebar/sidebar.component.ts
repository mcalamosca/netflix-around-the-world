import { Component} from '@angular/core';
import { MatList } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  //Defining an array of pages to represent in the sidebar
  public pages: IPage[] = [
    {
      title: "TV Shows",
      route: "dashboard/tvshows"
    },
    {
      title: "Movies",
      route: "dashboard/movies"
    }
  ];

  constructor(private router: Router) { }
  navigate(route: string){
    this.router.navigate([route])
  }

}

//typically interfaces would reside in their own files, but for the sake of time I'm including them in the component file
export interface IPage {
  title: string,
  route: string
}