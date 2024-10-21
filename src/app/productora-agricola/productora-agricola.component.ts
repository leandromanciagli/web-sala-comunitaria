import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from '../utils/sweet-alert/sweet-alert.service';
import { showLoader, hideLoader } from '../loader/loader.actions';
import { Store } from '@ngrx/store';
import { NgbModal, NgbActiveModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ProductoraAgricolaService } from './productora-agricola.service';


@Component({
  selector: 'app-productora-agricola',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbTooltip,
  ],
  providers: [
    SweetAlertService,
    NgbModal, 
    NgbActiveModal,
  ],
  templateUrl: './productora-agricola.component.html',
  styleUrl: './productora-agricola.component.css'
})
export class ProductoraAgricolaComponent {

  productoraAgricolaForm = new FormGroup({
    nombre: new FormControl('', [ Validators.required ]),
    direccion: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    telefono: new FormControl('', [Validators.pattern(/^[0-9]+$/)]),
  });
  productorasAgricolas: any[] = [];
  productoraAgricolaIdSeleccionada = null;


  constructor(
    private store: Store,
    protected swal: SweetAlertService,
    private modalService: NgbModal,
    private modalGestionProductoraAgricola: NgbActiveModal,
    private productoraAgricolaService: ProductoraAgricolaService,
  ) { }

  ngOnInit(): void {
    this.loadProductorasAgricolas()
  }

  async loadProductorasAgricolas() {
    this.store.dispatch(showLoader());
    this.productoraAgricolaService.getAll().subscribe(
      {
        next: (data) => {
          this.productorasAgricolas = data;
          this.store.dispatch(hideLoader());
        },
        error: async (e) => {
          console.log(e);
          this.store.dispatch(hideLoader());
          await this.swal.displayErrorMessage()
        }
      }
    );
  }

  manageProductoraAgricola() {
    let productoraAgricola = {
      productoraAgricolaId: null,
      nombre: this.productoraAgricolaForm.value.nombre,
      direccion: this.productoraAgricolaForm.value.direccion,
      telefono: this.productoraAgricolaForm.value.telefono,
      email: this.productoraAgricolaForm.value.email,
    }
    this.store.dispatch(showLoader());
    if (this.productoraAgricolaIdSeleccionada) {
      this.productoraAgricolaService.update(this.productoraAgricolaIdSeleccionada, productoraAgricola).subscribe(
        {
          next: async () => {
            this.store.dispatch(hideLoader());
            await this.swal.displaySuccessMessage("¡Productora agrícola editada correctamente!")
            this.closeModalGestionProductoraAgricola()
            this.loadProductorasAgricolas()
          },
          error: async (e) => {
            console.log(e);
            this.store.dispatch(hideLoader());
            await this.swal.displayErrorMessage()
          }
        }
      )
    } else {
      this.productoraAgricolaService.create(productoraAgricola).subscribe(
        {
          next: async () => {
            this.store.dispatch(hideLoader());
            await this.swal.displaySuccessMessage("¡Productora agrícola creada correctamente!")
            this.closeModalGestionProductoraAgricola()
            this.loadProductorasAgricolas()
          },
          error: async (e) => {
            console.log(e);
            this.store.dispatch(hideLoader());
            await this.swal.displayErrorMessage()
          }
        }
      )
    }
  }

  async deleteProductoraAgricola(productoraAgricola: any) {
    const userChoise = await this.swal.displayDeleteMessage("productora agrícola")
    if (userChoise.isConfirmed) {
      this.store.dispatch(showLoader());
      this.productoraAgricolaService.delete(productoraAgricola.productoraAgricolaId).subscribe(
        {
          next: async () => {
            this.store.dispatch(hideLoader());
            await this.swal.displaySuccessMessage("¡Productora agrícola eliminada!")
            this.loadProductorasAgricolas()
          },
          error: async (e) => {
            console.log(e);
            this.store.dispatch(hideLoader());
            await this.swal.displayErrorMessage()
          }
        }
      );
    }
  }

  openModalGestionProductoraAgricola(content: TemplateRef<any>, productoraAgricola?: any) {
    if (productoraAgricola) {
      this.setProductoraAgricolaForm(productoraAgricola)
    }
    this.modalGestionProductoraAgricola = this.modalService.open(content, { animation: true, backdrop: 'static', centered: true, size: 'lg' })
  }

  closeModalGestionProductoraAgricola() {
    this.modalGestionProductoraAgricola.close();
    this.resetProductoraAgricolaForm()
  }

  setProductoraAgricolaForm(productoraAgricola: any) {
    this.productoraAgricolaIdSeleccionada = productoraAgricola.productoraAgricolaId
    this.productoraAgricolaForm.patchValue(productoraAgricola)
  }

  resetProductoraAgricolaForm() {
    this.productoraAgricolaIdSeleccionada = null
    this.productoraAgricolaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      direccion: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      telefono: new FormControl('', [Validators.pattern(/^[0-9]+$/)]),
    });
  }

  get nombre() {
    return this.productoraAgricolaForm.get('nombre')!;
  }

  get email() {
    return this.productoraAgricolaForm.get('email')!;
  }

  get telefono() {
    return this.productoraAgricolaForm.get('telefono')!;
  }

}

