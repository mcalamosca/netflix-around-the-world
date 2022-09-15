import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MediaDataService } from 'src/app/services/media-data.service';
import { IFilterParam, IFilterParamMap, IGridConfig } from 'src/app/components/data-grid/data-grid.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MapChartComponent } from 'src/app/components/map-chart/map-chart.component';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-media-dashboard',
  templateUrl: './media-dashboard.component.html',
  styleUrls: ['./media-dashboard.component.scss'],
})
export class MediaDashboardComponent implements OnDestroy {
  //Pivot titles on cards according to either TV Shows or Movies
  type: string = "tvshows";
  //wait for api calls to init components that use the data
  doneLoading: boolean = false;
  //config for the data grid component to use
  gridConfig: IGridConfig = {
    rowData: []
  };
  //data for the map chart to use
  mediaData: any = {
    data: [],
    update: false
  }
  //subscription object to allow unsubscribe on destroy
  subscription: Subscription = new Subscription;
  dataUpdated: Subject<any> = new Subject();
  dataUpdated$: Observable<any> = this.dataUpdated.asObservable();
  filterSelected: Subject<IFilterParam> = new Subject();
  filterSelected$: Observable<IFilterParam> = this.filterSelected.asObservable();

  currentFilters: IFilterParamMap = {};
  
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
            cols: 4,
            rows: 2,
            type: "map-chart",
            chart: this.mediaData
          },
          {
            title: ' Ratings',
            cols: 4,
            rows: 2,
            type: "pie-chart",
            chart: this.mediaData
          },
          {
            title: 'All ',
            cols: 4,
            rows: 2,
            type: "grid",
            gridConfig: this.gridConfig
          }
        ];
      }

      return [
        {
          title: ' by Country',
          cols: 2,
          rows: 2,
          type: "map-chart",
          chart: this.mediaData
        },
        {
          title: ' Ratings',
          cols: 2,
          rows: 2,
          type: "pie-chart",
          chart: this.mediaData
        },
        {
          title: 'All ',
          cols: 4,
          rows: 2,
          type: "grid",
          gridConfig: this.gridConfig
        }
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
      this.mediaData.data = next as any;
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
    if(!this.type){
      this.type = "TV Shows";
      this.mediaDataService.getMediaByType("TV Show");
    }
  }

  applyFilter(e:Highcharts.PointInteractionEventObject,field:string){
    let name = (e.target as any).name;
    this.currentFilters[field] = name;
    this.filterSelected.next({
      field: field,
      value: name
    })
  }
  removeFilter(field:string){
    delete this.currentFilters[field];
    this.filterSelected.next({
      field: field,
      value: "remove"
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
