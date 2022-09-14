import { Component } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'torqata-poc';
  bars = faBars;
  github = faGithub;
  earth = faEarthAmericas;

  gotoGithub(){
    window.open("https://github.com/mcalamosca/torqata-poc","_blank")
  }
}
