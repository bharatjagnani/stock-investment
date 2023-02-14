import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStockPurchaseDetailComponent } from './add-new-stock-purchase-detail.component';

describe('AddNewStockPurchaseDetailComponent', () => {
  let component: AddNewStockPurchaseDetailComponent;
  let fixture: ComponentFixture<AddNewStockPurchaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewStockPurchaseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewStockPurchaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
