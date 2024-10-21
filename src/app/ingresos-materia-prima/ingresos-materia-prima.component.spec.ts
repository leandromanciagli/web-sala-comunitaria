import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosMateriaPrimaComponent } from './ingresos-materia-prima.component';

describe('IngresosMateriaPrimaComponent', () => {
  let component: IngresosMateriaPrimaComponent;
  let fixture: ComponentFixture<IngresosMateriaPrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresosMateriaPrimaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresosMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
