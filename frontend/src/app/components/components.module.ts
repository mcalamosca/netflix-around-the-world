import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { DataGridComponent } from './data-grid/data-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { MapChartComponent } from './map-chart/map-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { PieChartComponent } from './pie-chart/pie-chart.component';



@NgModule({
  declarations: [
    SidebarComponent,
    DataGridComponent,
    MapChartComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    AgGridModule,
    HighchartsChartModule
  ],
  exports: [
    SidebarComponent,
    DataGridComponent,
    MapChartComponent,
    PieChartComponent
  ]
})
export class ComponentsModule { }
