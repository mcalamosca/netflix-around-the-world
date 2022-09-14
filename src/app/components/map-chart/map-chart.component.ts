import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { Observable } from 'rxjs';
import { MediaDashboardComponent } from 'src/app/dashboards/media-dashboard/media-dashboard.component';
import { HighchartsDataService } from 'src/app/services/highcharts-data.service';

@Component({
  selector: 'app-map-chart',
  templateUrl: './map-chart.component.html',
  styleUrls: ['./map-chart.component.scss']
})
export class MapChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";

  @Input()parent!:MediaDashboardComponent;
  @Input()chartData!: any;
  @Input()dataChanged!: Observable<any>
  updateFlag: boolean = false;
  countryCountMap: any = {};
  chartOptions!: Highcharts.Options;
  doneLoading: boolean = false;

  constructor(private highchartsDataService:HighchartsDataService) {
    
  }

  ngOnInit(): void {
    //initialize the chart with data from this directive
    this.chartOptions = this.highchartsDataService.parseMapData(this.chartData.data,this.parent)
    this.doneLoading = true;
    //observable provided for when data is changed via the sidebar menu - rebuild the chart using the update flag
    this.dataChanged.subscribe(next => {
      this.chartOptions = this.highchartsDataService.parseMapData(next, this.parent)
      this.updateFlag = next;
    })
  }
}

