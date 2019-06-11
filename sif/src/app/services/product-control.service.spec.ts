import { TestBed } from '@angular/core/testing';

import { ProductControlService } from './product-control.service';

describe('ProductControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductControlService = TestBed.get(ProductControlService);
    expect(service).toBeTruthy();
  });
});
