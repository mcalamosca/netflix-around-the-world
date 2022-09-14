import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridComponent } from './data-grid.component';
import 'jasmine'

describe('DataGridComponent', () => {
  let component: DataGridComponent;
  let fixture: ComponentFixture<DataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('grid API is not available until  `detectChanges`', () => {
    expect(component.gridAPI).not.toBeTruthy();
  });
  
  it('grid API is available after `detectChanges`', () => {
    fixture.detectChanges();
    expect(component.gridAPI).toBeTruthy();
  });
});
