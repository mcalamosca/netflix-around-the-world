import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MediaDataService } from 'src/app/services/media-data.service';
import { IGridConfig } from 'src/app/components/data-grid/data-grid.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MapChartComponent } from 'src/app/components/map-chart/map-chart.component';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'media-dashboard',
  templateUrl: './media-dashboard.component.html',
  styleUrls: ['./media-dashboard.component.scss'],
})
export class MediaDashboardComponent implements OnInit, OnDestroy {
  //Pivot titles on cards according to either TV Shows or Movies
  type: string = "";
  //wait for api calls to init components that use the data
  doneLoading: boolean = false;
  //config for the data grid component to use
  gridConfig: IGridConfig = {
    rowData: []
  };
  //data for the map chart to use
  mapChart: any = {
    data: [],
    update: false
  }
  //subscription object to allow unsubscribe on destroy
  subscription: Subscription = new Subscription;
  dataUpdated: Subject<any> = new Subject();
  dataUpdated$: Observable<any> = this.dataUpdated.asObservable();
  countrySelected: Subject<any> = new Subject();
  countrySelected$: Observable<any> = this.countrySelected.asObservable();
  
  get self():MediaDashboardComponent {
    return this;
  }
  
  //Based on the screen size, switch from large view to small view
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          {
            title: ' by Country',
            cols: 3,
            rows: 2,
            type: "map-chart",
            chart: this.mapChart
          },
          {
            title: 'All ',
            cols: 3,
            rows: 2,
            type: "grid",
            gridConfig: this.gridConfig
          },
          { title: 'Card 3', cols: 3, rows: 1 },
          { title: 'Card 4', cols: 3, rows: 1 },
        ];
      }

      return [
        {
          title: ' by Country',
          cols: 3,
          rows: 2,
          type: "map-chart",
          chart: this.mapChart
        },
        {
          title: 'All ',
          cols: 3,
          rows: 2,
          type: "grid",
          gridConfig: this.gridConfig
        },
        { title: 'Card 3', cols: 2, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mediaDataService: MediaDataService,
    private route: ActivatedRoute
  ) {
    this.subscription = this.mediaDataService.mediaData$.subscribe(next => {
      this.gridConfig.rowData = next as any;
      this.mapChart.data = next as any;
      this.dataUpdated.next(next);
      this.doneLoading = true;
    });
    this.route.params.subscribe(next => {
      if(next['type'] === "tvshows"){
        this.type = "TV Shows"
        this.mediaDataService.getMediaByType("TV Show");
      } else if(next['type'] === "movies"){
        this.type = "Movies"
        this.mediaDataService.getMediaByType("Movie");
      }
    })
  }

  applyCountryFilter(e:Highcharts.PointInteractionEventObject){
    let country = (e.target as any).name;
    this.countrySelected.next(country);
  }
  removeCountryFilter(){
    this.countrySelected.next("remove");
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
