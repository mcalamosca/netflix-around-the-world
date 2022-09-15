import { TestBed } from '@angular/core/testing';

import { HighchartsConfigService } from './highcharts-config.service';

describe('HighchartsConfigService', () => {
  let service: HighchartsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighchartsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
