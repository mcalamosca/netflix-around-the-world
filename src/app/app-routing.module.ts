import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/home/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: HomeComponent},
  {path: 'test1', component: HomeComponent},
  {path: 'test2', component: HomeComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
