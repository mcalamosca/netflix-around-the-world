import { TestBed } from '@angular/core/testing';

import { HighchartsDataService } from './highcharts-data.service';

describe('HighchartsDataService', () => {
  let service: HighchartsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighchartsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
