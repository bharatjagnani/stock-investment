import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshStockPriceComponent } from './refresh-stock-price.component';

describe('RefreshStockPriceComponent', () => {
  let component: RefreshStockPriceComponent;
  let fixture: ComponentFixture<RefreshStockPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreshStockPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshStockPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
