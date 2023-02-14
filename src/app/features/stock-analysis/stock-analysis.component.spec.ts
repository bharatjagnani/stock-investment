import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAnalysisComponent } from './stock-analysis.component';

describe('StockAnalysisComponent', () => {
  let component: StockAnalysisComponent;
  let fixture: ComponentFixture<StockAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
