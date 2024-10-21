import { TestBed } from '@angular/core/testing';

import { ProductoraAgricolaService } from './productora-agricola.service';

describe('ProductoraAgricolaService', () => {
  let service: ProductoraAgricolaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoraAgricolaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
