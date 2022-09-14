import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaDashboardComponent } from './dashboards/media-dashboard/media-dashboard.component';

const routes: Routes = [
  {path: 'dashboard/:type', component: MediaDashboardComponent},
  {path: '**', redirectTo: 'dashboard/tvshows', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
