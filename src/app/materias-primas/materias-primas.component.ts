import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from '../utils/sweet-alert/sweet-alert.service';
import { showLoader, hideLoader } from '../loader/loader.actions';
import { Store } from '@ngrx/store';
import { NgbModal, NgbActiveModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MateriaPrimaService } from './materia-prima.service';
import { TipoMateriaPrimaService } from '../tipo-materia-prima/tipo-materia-prima.service';
import { UnidadDeMedidaService } from '../unidades-de-medida/unidad-de-medida.service';



@Component({
  selector: 'app-materias-primas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbTooltipModule,
  ],
  providers: [
    TipoMateriaPrimaService,
    SweetAlertService,
    NgbModal,
    NgbActiveModal,
  ],
  templateUrl: './materias-primas.component.html',
  styleUrl: './materias-primas.component.css'
})
export class MateriasPrimasComponent {

  materiaPrimaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.maxLength(255)]),
    unidadDeMedida: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
  });
  materiasPrimas: any[] = [];
  tiposMateriaPrima: any[] = [];
  unidadesDeMedida: any[] = [];
  materiaPrimaSeleccionada = {
    materiaPrimaId: '',
    nombre: null,
    descripcion: null,
    cantidad: 0,
    unidadDeMedida: {
      unidadDeMedidaId: null,
    },
    tipo: {
      tipoMateriaPrimaId: null,
    },
  }    

  constructor(
    private store: Store,
    protected swal: SweetAlertService,
    private modalService: NgbModal,
    private modalGestionMateriaPrima: NgbActiveModal,
    private materiaPrimaService: MateriaPrimaService, 
    private tipoMateriaPrimaService: TipoMateriaPrimaService,
    private unidadDeMedidaService: UnidadDeMedidaService
  ) { }

  ngOnInit(): void {
    this.loadMateriasPrimas()
    this.loadTiposMateriaPrima()
    this.loadUnidadesDeMedida()
  }

  async loadMateriasPrimas() {
    this.store.dispatch(showLoader());
    this.materiaPrimaService.getAll().subscribe(
      {
        next: (data) => {
          this.materiasPrimas = data;
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

  async loadTiposMateriaPrima() {
    this.store.dispatch(showLoader());
    this.tipoMateriaPrimaService.getAll().subscribe(
      {
        next: (data) => {
          this.tiposMateriaPrima = data;
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

  async loadUnidadesDeMedida() {
    this.store.dispatch(showLoader());
    this.unidadDeMedidaService.getAll().subscribe(
      {
        next: (data) => {
          this.unidadesDeMedida = data;
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

  isUpdate() {
    return this.materiaPrimaSeleccionada.materiaPrimaId != ''
  }

  manageMateriaPrima() {
    let materiaPrima = {
      materiaPrimaId: this.isUpdate() ? this.materiaPrimaSeleccionada.materiaPrimaId : '',
      nombre: this.materiaPrimaForm.value.nombre,
      descripcion: this.materiaPrimaForm.value.descripcion,
      cantidad: this.materiaPrimaSeleccionada ? this.materiaPrimaSeleccionada.cantidad : 0,
      unidadDeMedida: {
        unidadDeMedidaId: this.materiaPrimaForm.value.unidadDeMedida,
      },
      tipo: {
        tipoMateriaPrimaId: this.materiaPrimaForm.value.tipo,
      },
    }
    this.store.dispatch(showLoader());
    if (this.isUpdate()) {      
      this.materiaPrimaService.update(this.materiaPrimaSeleccionada.materiaPrimaId, materiaPrima).subscribe(
        {
          next: async () => {
            this.store.dispatch(hideLoader());
            await this.swal.displaySuccessMessage("¡Materia prima editada correctamente!")
            this.modalGestionMateriaPrima.close()
            this.resetMateriaPrimaForm()
            this.loadMateriasPrimas()
          },
          error: async (e) => {
            console.log(e);
            this.store.dispatch(hideLoader());
            await this.swal.displayErrorMessage()
          }
        }
      )
    } else {
      this.materiaPrimaService.create(materiaPrima).subscribe(
        {
          next: async () => {
            this.store.dispatch(hideLoader());
            await this.swal.displaySuccessMessage("¡Materia prima creada correctamente!")
            this.closeModalGestionMateriaPrima()
            this.loadMateriasPrimas()
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

  async deleteMateriaPrima(materiaPrima: any) {
    const userChoise = await this.swal.displayDeleteMessage("materia prima")
    if (userChoise.isConfirmed) {
      this.store.dispatch(showLoader());
      this.materiaPrimaService.delete(materiaPrima.materiaPrimaId).subscribe(
        {
          next: async () => {
            this.store.dispatch(hideLoader());
            await this.swal.displaySuccessMessage("¡Materia prima eliminada!")
            this.loadMateriasPrimas()
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

  openModalGestionMateriaPrima(content: TemplateRef<any>, materiaPrima?: any) {
    if (materiaPrima) {
      this.setMateriaPrimaForm(materiaPrima)
    }
    this.modalGestionMateriaPrima = this.modalService.open(content, { animation: true, backdrop: 'static', centered: true, size: 'lg' })
  }
  
  closeModalGestionMateriaPrima() {
    this.modalGestionMateriaPrima.close();
    this.resetMateriaPrimaForm()
  }

  setMateriaPrimaForm(materiaPrima: any) {
    this.materiaPrimaSeleccionada = materiaPrima
    this.materiaPrimaForm.patchValue({
      nombre: materiaPrima.nombre,
      descripcion: materiaPrima.descripcion,
      unidadDeMedida: materiaPrima.unidadDeMedida.unidadDeMedidaId,
      tipo: materiaPrima.tipo.tipoMateriaPrimaId,
    })
  }

  resetMateriaPrimaForm() {
    this.materiaPrimaSeleccionada = {
      materiaPrimaId: '',
      nombre: null,
      descripcion: null,
      cantidad: 0,
      unidadDeMedida: {
        unidadDeMedidaId: null,
      },
      tipo: {
        tipoMateriaPrimaId: null,
      },
    }     
    this.materiaPrimaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.maxLength(255)]),
      unidadDeMedida: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
    });
  }

  get nombre() {
    return this.materiaPrimaForm.get('nombre')!;
  }

  get descripcion() {
    return this.materiaPrimaForm.get('descripcion')!;
  }

  get unidadDeMedida() {
    return this.materiaPrimaForm.get('unidadDeMedida')!;
  }

  get tipo() {
    return this.materiaPrimaForm.get('tipo')!;
  }

}

