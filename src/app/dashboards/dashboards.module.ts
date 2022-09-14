import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowsDashboardComponent } from './tv-shows-dashboard/tv-shows-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MoviesDashboardComponent } from './movies-dashboard/movies-dashboard.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    TvShowsDashboardComponent,
    MoviesDashboardComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  exports: []
})
export class DashboardsModule { }
