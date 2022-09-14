import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { HighchartsDataService } from 'src/app/services/highcharts-data.service';

@Component({
  selector: 'app-map-chart',
  templateUrl: './map-chart.component.html',
  styleUrls: ['./map-chart.component.scss']
})
export class MapChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";

  @Input()chartData!: any;
  countryCountMap: any = {};
  chartOptions!: Highcharts.Options;
  doneLoading: boolean = false;

  constructor(private highchartsDataService:HighchartsDataService) { }

  ngOnInit(): void {
    this.chartOptions = this.highchartsDataService.parseMapData(this.chartData.data)
    this.doneLoading = true;
  }

}

