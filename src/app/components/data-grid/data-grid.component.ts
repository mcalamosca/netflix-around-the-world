import { Component, Input, OnInit } from '@angular/core';
import { ColDef, ColGroupDef, GridReadyEvent, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit {
  //definite assignment assertion for this, as it will always be provided to the component even though it isn't initialized in this file
  @Input()
  gridConfig!: IGridConfig;
  gridReady: boolean = false;
  gridAPI!: GridApi;

  //we should always implement provided Types from third party libraries, in this case ColDef,ColGroupDef,GridReadyEvent...etc from Ag-grid
  public defaultColDef: ColDef = {
    width: 150,
    editable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    resizable: true,
    sortable: true,
    maxWidth: 250
  };

  public defaultColGroupDef: Partial<ColGroupDef> = {
    marryChildren: true,
  };

  constructor() {}

  ngOnInit(): void {
    this.gridConfig.columnDefs = this.buildColumnDefs(this.gridConfig.rowData);
    this.gridReady = true;
  }

  //this function takes the data and using the first row, generates the columnDefs required by the grid
  //normally I would put this in it's own service with dedicated business logic and other QOL enhancements for devs
  //the any type is used here because we should support any model of data from API responses
  buildColumnDefs(data: any) {
    //catch for empty response
    if (!data[0]) return [];

    let columnDefs: (ColDef | ColGroupDef)[] = [];
    let row = data[0];
    Object.keys(row).forEach((value) => {
      let colDef: ColDef = {
        field: value,
        //can't take credit for the regex :) https://stackoverflow.com/questions/64489395/converting-snake-case-string-to-title-case
        headerName: value.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase())
      };
      columnDefs.push(colDef)
    });
    return columnDefs;
  }

  onGridReady(params: GridReadyEvent<any>) {
    //placeholder for any logic that would need applied after grid initializes
    //good place to perform any autosizing of columns and other view manipulation
    this.gridAPI = params.api;
    params.columnApi.autoSizeAllColumns();
  }
}

export interface IGridConfig {
  rowData: any[];
  columnDefs?: (ColDef | ColGroupDef)[];
}
