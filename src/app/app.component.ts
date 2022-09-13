import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'torqata-poc';
  bars = faBars;
  homeIcon = faHouse;

  goHome(){
    this.router.navigate(['home'])
  }

  constructor(private router: Router) { }

  log(drawer: any){
    console.log(drawer)
  }
}
