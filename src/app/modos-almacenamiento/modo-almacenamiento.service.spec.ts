import { TestBed } from '@angular/core/testing';

import { ModoAlmacenamientoService } from './modo-almacenamiento.service';

describe('ModoAlmacenamientoService', () => {
  let service: ModoAlmacenamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModoAlmacenamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
