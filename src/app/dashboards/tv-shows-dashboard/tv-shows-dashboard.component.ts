import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MediaDataService } from 'src/app/services/media-data.service';
import { IGridConfig } from 'src/app/components/data-grid/data-grid.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tv-shows-dashboard',
  templateUrl: './tv-shows-dashboard.component.html',
  styleUrls: ['./tv-shows-dashboard.component.scss'],
})
export class TvShowsDashboardComponent implements OnInit, OnDestroy {
  doneLoading: boolean = false;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          {
            title: 'All Shows',
            cols: 3,
            rows: 2,
            type: "grid",
            gridConfig: this.gridConfig
          },
          {
            title: 'Shows by Country',
            cols: 3,
            rows: 2,
            type: "map-chart",
            chart: this.mapChart
          },
          { title: 'Card 3', cols: 3, rows: 1 },
          { title: 'Card 4', cols: 3, rows: 1 },
        ];
      }

      return [
        {
          title: 'All Shows',
          cols: 3,
          rows: 2,
          type: "grid",
          gridConfig: this.gridConfig
        },
        {
          title: 'Shows by Country',
          cols: 3,
          rows: 2,
          type: "map-chart",
          chart: this.mapChart
        },
        { title: 'Card 3', cols: 2, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );

  gridConfig: IGridConfig = {
    rowData: []
  };

  mapChart: any = {
    data: []
  }

  subscription: Subscription = new Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mediaDataService: MediaDataService
  ) {
    this.subscription = this.mediaDataService.tvShowData$.subscribe(next => {
      this.gridConfig.rowData = next as any;
      this.mapChart.data = next as any;
      this.doneLoading = true;
    });
  }

  ngOnInit(): void {
    this.mediaDataService.getTvShows();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
