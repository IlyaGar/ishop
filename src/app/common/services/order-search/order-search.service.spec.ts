import { TestBed } from '@angular/core/testing';

import { OrderSearchService } from './order-search.service';

describe('OrderSearchService', () => {
  let service: OrderSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
