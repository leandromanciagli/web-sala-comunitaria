import { TestBed } from '@angular/core/testing';

import { UnidadDeMedidaService } from './unidad-de-medida.service';

describe('UnidadesDeMedidaService', () => {
  let service: UnidadDeMedidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadDeMedidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
