import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellStockDetailComponent } from './sell-stock-detail.component';

describe('SellStockDetailComponent', () => {
  let component: SellStockDetailComponent;
  let fixture: ComponentFixture<SellStockDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellStockDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellStockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
