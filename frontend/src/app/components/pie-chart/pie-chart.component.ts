import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { Observable } from 'rxjs';
import { MediaDashboardComponent } from 'src/app/dashboards/media-dashboard/media-dashboard.component';
import { HighchartsConfigService } from 'src/app/services/highcharts-config.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'mapChart';

  @Input() parent!: MediaDashboardComponent;
  @Input() chartData!: any;
  @Input() dataChanged!: Observable<any>;

  updateFlag: boolean = false;
  chartOptions!: Highcharts.Options;
  doneLoading: boolean = false;

  constructor(private highchartsDataService: HighchartsConfigService) {}

  ngOnInit(): void {
    //initialize the chart with data from this directive
    this.chartOptions = this.highchartsDataService.parsePieData(
      this.chartData.data,
      this.parent
    );
    this.doneLoading = true;
    //observable provided for when data is changed via the sidebar menu - rebuild the chart using the update flag
    this.dataChanged?.subscribe((next) => {
      this.chartOptions = this.highchartsDataService.parsePieData(
        next,
        this.parent
      );
      this.updateFlag = next;
    });
    //observable for when a filter is changed - rebuild chart using update flag
    this.parent.filterSelected$.subscribe((next) => {
      if (next.type !== "pie" && !this.parent.currentFilters['rating']) {
        this.chartOptions = this.highchartsDataService.parsePieData(
          this.chartData.data,
          this.parent
        );
        this.updateFlag = true;
      }
    });
  }
}
