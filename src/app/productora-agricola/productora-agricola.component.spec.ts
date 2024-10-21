import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoraAgricolaComponent } from './productora-agricola.component';

describe('ProductoraAgricolaComponent', () => {
  let component: ProductoraAgricolaComponent;
  let fixture: ComponentFixture<ProductoraAgricolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoraAgricolaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoraAgricolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
