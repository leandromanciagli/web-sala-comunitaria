import { TestBed } from '@angular/core/testing';

import { IngresoMateriaPrimaService } from './ingreso-materia-prima.service';

describe('IngresoMateriaPrimaService', () => {
  let service: IngresoMateriaPrimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoMateriaPrimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
