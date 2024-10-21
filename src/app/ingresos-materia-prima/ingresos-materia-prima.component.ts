import { Component, TemplateRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from '../utils/sweet-alert/sweet-alert.service';
import { showLoader, hideLoader } from '../loader/loader.actions';
import { Store } from '@ngrx/store';
import { NgbModal, NgbActiveModal, NgbDatepickerModule, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { IngresoMateriaPrimaService } from './ingreso-materia-prima.service';
import { MateriaPrimaService } from '../materias-primas/materia-prima.service';
import { ProductoraAgricolaService } from '../productora-agricola/productora-agricola.service';
import { ModoAlmacenamientoService } from '../modos-almacenamiento/modo-almacenamiento.service';
import { CustomDatePipe } from '../config/CustomDatePipe';
import moment from 'moment';


@Component({
  selector: 'app-ingresos-materia-prima',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    CustomDatePipe,
  ],
  providers: [
    IngresoMateriaPrimaService,
    ProductoraAgricolaService,
    MateriaPrimaService,
    ModoAlmacenamientoService,
    SweetAlertService,
    NgbModal,
    NgbActiveModal,
  ],
  templateUrl: './ingresos-materia-prima.component.html',
  styleUrl: './ingresos-materia-prima.component.css'
})
export class IngresosMateriaPrimaComponent {

  ingresoMateriaPrimaForm = new FormGroup({
    fechaDeIngreso: new FormControl(this.calendar.getToday(), [Validators.required]),
    productoraAgricola: new FormControl('', [Validators.required]),
    materiaPrima: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required]),
    modoAlmacenamiento: new FormControl('', [Validators.required]),
    fechaDeAlmacenamiento: new FormControl(this.calendar.getToday(), [Validators.required]),
    agroecologico: new FormControl(''),
    fechaDeCosecha: new FormControl(null),
  });

  ingresosMateriaPrima: any[] = [];
  materiasPrimas: any[] = [];
  productorasAgricolas: any[] = [];
  modosDeAlmacenamiento: any[] = [];
  materiaPrimaSeleccionada: any = null;



  constructor(
    private store: Store,
    private swal: SweetAlertService,
    private modalService: NgbModal,
    private modalGestionIngresoMateriaPrima: NgbActiveModal,
    private ingresoMateriaPrimaService: IngresoMateriaPrimaService, 
    private productoraAgricolaService: ProductoraAgricolaService, 
    private materiaPrimaService: MateriaPrimaService,
    private modoAlmacenamientoService: ModoAlmacenamientoService,
    private calendar: NgbCalendar,
  ) { }

  ngOnInit(): void {
    this.loadIngresosMateriaPrima()
    this.loadProductorasAgricolas()
    this.loadMateriasPrimas()
    this.loadModosDeAlmacenamiento()
  }

  async loadIngresosMateriaPrima() {
    this.store.dispatch(showLoader());
    this.ingresoMateriaPrimaService.getAll().subscribe(
      {
        next: (data) => {
          this.ingresosMateriaPrima = data;
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

  async loadModosDeAlmacenamiento() {
    this.store.dispatch(showLoader());
    this.modoAlmacenamientoService.getAll().subscribe(
      {
        next: (data) => {
          this.modosDeAlmacenamiento = data;
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

  manageIngresoMateriaPrima() {
    let ingresoMateriaPrima = {
      fechaDeIngreso: moment(this.ingresoMateriaPrimaForm.value.fechaDeIngreso).format('DD-MM-YYYY'),
      fechaDeCosecha: this.ingresoMateriaPrimaForm.value.fechaDeCosecha != null ? moment(this.ingresoMateriaPrimaForm.value.fechaDeCosecha).format('DD-MM-YYYY') : '',
      fechaDeAlmacenamiento: this.ingresoMateriaPrimaForm.value.fechaDeAlmacenamiento != null ? moment(this.ingresoMateriaPrimaForm.value.fechaDeAlmacenamiento).format('DD-MM-YYYY') : '',
      cantidad: this.ingresoMateriaPrimaForm.value.cantidad,
      agroecologico: this.ingresoMateriaPrimaForm.value.agroecologico != null ? this.ingresoMateriaPrimaForm.value.agroecologico : '',
      materiaPrima: {
        materiaPrimaId: this.ingresoMateriaPrimaForm.value.materiaPrima,
      },
      productoraAgricola: {
        productoraAgricolaId: this.ingresoMateriaPrimaForm.value.productoraAgricola,
      },
      modoAlmacenamiento: {
        modoAlmacenamientoId: this.ingresoMateriaPrimaForm.value.modoAlmacenamiento,
      },
    }
    this.store.dispatch(showLoader());
    this.ingresoMateriaPrimaService.create(ingresoMateriaPrima).subscribe(
      {
        next: async () => {
          this.store.dispatch(hideLoader());
          await this.swal.displaySuccessMessage("¡Ingreso de materia prima registrado correctamente!")
          this.closeModalGestionIngresoMateriaPrima()
          this.loadIngresosMateriaPrima()
        },
        error: async (e) => {
          console.log(e);
          this.store.dispatch(hideLoader());
          await this.swal.displayErrorMessage()
        }
      }
    )
  }

  openModalGestionIngresoMateriaPrima(content: TemplateRef<any>) {
    this.modalGestionIngresoMateriaPrima = this.modalService.open(content, { animation: true, backdrop: 'static', centered: true, size: 'lg' })
  }

  closeModalGestionIngresoMateriaPrima() {
    this.modalGestionIngresoMateriaPrima.close();
    this.materiaPrimaSeleccionada = null
    this.resetIngresoMateriaPrimaForm()
  }

  resetCantidad(id: number) {
    this.ingresoMateriaPrimaForm.patchValue({ cantidad: '' })
    this.materiaPrimaSeleccionada = this.materiasPrimas.find(materiaPrima => materiaPrima.materiaPrimaId == id);
  }

  resetIngresoMateriaPrimaForm() {
    this.ingresoMateriaPrimaForm = new FormGroup({
      fechaDeIngreso: new FormControl(this.calendar.getToday(), [Validators.required]),
      productoraAgricola: new FormControl('', [Validators.required]),
      materiaPrima: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
      modoAlmacenamiento: new FormControl('', [Validators.required]),
      fechaDeAlmacenamiento: new FormControl(this.calendar.getToday(), [Validators.required]),
      agroecologico: new FormControl(''),
      fechaDeCosecha: new FormControl(null),
    });
  }

  get fechaDeIngreso() {
    return this.ingresoMateriaPrimaForm.get('fechaDeIngreso')!;
  }

  get productoraAgricola() {
    return this.ingresoMateriaPrimaForm.get('productoraAgricola')!;
  }

  get materiaPrima() {
    return this.ingresoMateriaPrimaForm.get('materiaPrima')!;
  }

  get cantidad() {
    return this.ingresoMateriaPrimaForm.get('cantidad')!;
  }

  get modoAlmacenamiento() {
    return this.ingresoMateriaPrimaForm.get('modoAlmacenamiento')!;
  }

  get fechaDeAlmacenamiento() {
    return this.ingresoMateriaPrimaForm.get('fechaDeAlmacenamiento')!;
  }
}
