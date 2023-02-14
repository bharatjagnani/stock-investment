import { TestBed } from '@angular/core/testing';

import { StockRequestInterceptor } from './stock-request.interceptor';

describe('StockRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StockRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: StockRequestInterceptor = TestBed.inject(StockRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
