import { TestBed } from '@angular/core/testing';

import { TipoMateriaPrimaService } from './tipo-materia-prima.service';

describe('TipoMateriaPrimaService', () => {
  let service: TipoMateriaPrimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMateriaPrimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
