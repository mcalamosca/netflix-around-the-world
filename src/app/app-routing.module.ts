import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesDashboardComponent } from './dashboards/movies-dashboard/movies-dashboard.component';
import { TvShowsDashboardComponent } from './dashboards/tv-shows-dashboard/tv-shows-dashboard.component';

const routes: Routes = [
  {path: 'tvshows', component: TvShowsDashboardComponent},
  {path: 'movies', component: MoviesDashboardComponent},
  {path: '**', redirectTo: 'tvshows', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
