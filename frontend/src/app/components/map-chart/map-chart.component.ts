import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { Observable, Subscription } from 'rxjs';
import { MediaDashboardComponent } from 'src/app/dashboards/media-dashboard/media-dashboard.component';
import { HighchartsConfigService } from 'src/app/services/highcharts-config.service';

@Component({
  selector: 'app-map-chart',
  templateUrl: './map-chart.component.html',
  styleUrls: ['./map-chart.component.scss'],
})
export class MapChartComponent implements OnInit, OnDestroy {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'mapChart';

  @Input() parent!: MediaDashboardComponent;
  @Input() chartData!: any;
  @Input() dataChanged!: Observable<any>;
  dataChangedSub: Subscription = new Subscription();
  updateFlag: boolean = false;
  chartOptions!: Highcharts.Options;
  doneLoading: boolean = false;

  constructor(private highchartsDataService: HighchartsConfigService) {}

  ngOnDestroy(): void {
    this.dataChangedSub.unsubscribe();
  }

  ngOnInit(): void {
    //initialize the chart with data from this directive
    console.log(this.chartData.data);
    this.chartOptions = this.highchartsDataService.parseMapData(
      this.chartData.data,
      this.parent
    );
    this.doneLoading = true;
    //observable provided for when data is changed via the sidebar menu - rebuild the chart using the update flag
    this.dataChangedSub = this.dataChanged.subscribe((next) => {
      this.chartOptions = this.highchartsDataService.parseMapData(
        next,
        this.parent
      );
      this.updateFlag = next;
    });
  }
}
