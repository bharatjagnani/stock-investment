import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStockDetailComponent } from './add-new-stock-detail.component';

describe('AddNewStockDetailComponent', () => {
  let component: AddNewStockDetailComponent;
  let fixture: ComponentFixture<AddNewStockDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewStockDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewStockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
