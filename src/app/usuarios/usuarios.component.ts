import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from '../utils/sweet-alert/sweet-alert.service';
import { showLoader, hideLoader } from '../loader/loader.actions';
import { Store } from '@ngrx/store';
import { NgbModal, NgbActiveModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from './usuario.service';
import { RolService } from '../roles/rol.service';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbTooltip,
  ],
  providers: [
    UsuarioService,
    RolService,
    SweetAlertService,
    NgbModal,
    NgbActiveModal,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  usuarioForm = new FormGroup({
    nombreYapellido: new FormControl('', [ Validators.required, Validators.minLength(2) ]),
    rol: new FormControl('', [ Validators.required ]),
    email: new FormControl('', [ Validators.email ]),
    telefono: new FormControl('', [ Validators.pattern(/^[0-9]+$/) ]),
    username: new FormControl('', [ Validators.required, Validators.minLength(2), Validators.pattern(/^\S+$/) ]),
    password: new FormControl('', [ Validators.required, Validators.pattern( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&./ ])[A-Za-z\d@$!%*?&./ ]{8,20}$/ ) ]),
  });
  usuarios: any[] = [];
  roles: any[] = [];
  usuarioIdSeleccionado = null;

  passwordEyeIcon = 'ico-eye-grey.png';
  inputPasswordType = 'password';


  constructor(
    private store: Store,
    private swal: SweetAlertService,
    private modalService: NgbModal,
    private modalGestionUsuario: NgbActiveModal,
    private usuarioService: UsuarioService, 
    private rolService: RolService,
  ) { }

  ngOnInit(): void {
    this.loadUsuarios()
    this.loadRoles()
  }

  async loadRoles() {
    this.store.dispatch(showLoader());
    this.rolService.getAll().subscribe(
      {
        next: (data) => {
          this.roles = data;
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

  async loadUsuarios() {
    this.store.dispatch(showLoader());
    this.usuarioService.getAll().subscribe(
      {
        next: (data) => {
          this.usuarios = data;
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

  manageUsuario() {
    let usuario = {
      usuarioId: null,
      nombreYapellido: this.usuarioForm.value.nombreYapellido,
      username: this.usuarioForm.value.username,
      email: this.usuarioForm.value.email,
      telefono: this.usuarioForm.value.telefono,
      password: this.usuarioForm.value.password,
      roles: [
        {
          rolId: this.usuarioForm.value.rol,
        },
      ]
    }
    this.store.dispatch(showLoader());
    if (this.usuarioIdSeleccionado) {
      this.usuarioService.update(this.usuarioIdSeleccionado, usuario).subscribe(
        {
          next: async () => {
            this.store.dispatch(hideLoader());
            await this.swal.displaySuccessMessage("¡Usuario editado correctamente!")
            this.closeModalGestionUsuario()
            this.loadUsuarios()
          },
          error: async (e) => {
            console.log(e);
            this.store.dispatch(hideLoader());
            await this.swal.displayErrorMessage()
          }
        }
      )
    } else {
      this.usuarioService.create(usuario).subscribe(
        {
          next: async () => {
            this.store.dispatch(hideLoader());
            await this.swal.displaySuccessMessage("¡Usuario creado correctamente!")
            this.closeModalGestionUsuario()
            this.loadUsuarios()
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

  async deleteUsuario(usuario: any) {
    const userChoise = await this.swal.displayDeleteMessage("usuario")
    if (userChoise.isConfirmed) {
      this.store.dispatch(showLoader());
      this.usuarioService.delete(usuario.usuarioId).subscribe(
        {
          next: async () => {
            this.store.dispatch(hideLoader());
            await this.swal.displaySuccessMessage("¡Usuario eliminado!")
            this.loadUsuarios()
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

  openModalGestionUsuario(content: TemplateRef<any>, usuario?: any) {
    if (usuario) {
      this.setUsuarioForm(usuario)
    }
    this.modalGestionUsuario = this.modalService.open(content, { animation: true, backdrop: 'static', centered: true, size: 'lg' })
  }

  closeModalGestionUsuario() {
    this.modalGestionUsuario.close();
    this.resetUsuarioForm()
  }

  setUsuarioForm(usuario: any)
  {
    this.usuarioIdSeleccionado = usuario.usuarioId
    this.usuarioForm.patchValue({
      nombreYapellido: usuario.nombreYapellido,
      username: usuario.username,
      email: usuario.email,
      telefono: usuario.telefono,
      password: usuario.password,
      rol: usuario.roles[0].rolId,
    })
  }

  resetUsuarioForm() {
    this.usuarioIdSeleccionado = null
    this.usuarioForm = new FormGroup({
      nombreYapellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
      rol: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      telefono: new FormControl('', [Validators.pattern(/^[0-9]+$/)]),
      username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^\S+$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&./ ])[A-Za-z\d@$!%*?&./ ]{8,20}$/)]),
    });
    this.passwordEyeIcon = 'ico-eye-grey.png';
    this.inputPasswordType = 'password';
  }

  changeEyePasswordIco(): void {
    if (this.passwordEyeIcon == 'ico-eye-grey.png') {
      this.passwordEyeIcon = 'ico-eye-closed-grey.png';
      this.inputPasswordType = 'text';
    } else if (this.passwordEyeIcon == 'ico-eye-closed-grey.png') {
      this.passwordEyeIcon = 'ico-eye-grey.png';
      this.inputPasswordType = 'password';
    }
  }

  get nombreYapellido() {
    return this.usuarioForm.get('nombreYapellido')!;
  }

  get rol() {
    return this.usuarioForm.get('rol')!;
  }

  get email() {
    return this.usuarioForm.get('email')!;
  }

  get telefono() {
    return this.usuarioForm.get('telefono')!;
  }

  get username() {
    return this.usuarioForm.get('username')!;
  }

  get password() {
    return this.usuarioForm.get('password')!;
  }

}
