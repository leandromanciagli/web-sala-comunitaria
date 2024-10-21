import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductoraAgricolaComponent } from './productora-agricola/productora-agricola.component';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    LoaderComponent,
    SidebarComponent,
    UserSettingsComponent,
    HomeComponent,
    UsuariosComponent,
    ProductoraAgricolaComponent,
  ],
  providers: [
    NgbTooltipConfig,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent 
{ 
  constructor(private tooltipConfig: NgbTooltipConfig) { }

  ngOnInit(): void 
  {
    this.tooltipConfig.triggers = 'hover'
  }
}
