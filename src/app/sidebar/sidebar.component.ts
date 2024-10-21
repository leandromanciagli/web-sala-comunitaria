import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sections = [
    {
      title: 'Inicio',
      iconUrl: '/ico-inicio.png',
      route: '/',
    },
    {
      title: 'Productoras agrícolas',
      iconUrl: '/ico-produccion.png',
      route: '/produccion',
    },
    {
      title: 'Materias primas',
      iconUrl: '/ico-recetas.png',
      route: '/materiasPrimas',
    },
    {
      title: 'Ingresos',
      iconUrl: '/ico-stock.png',
      route: '/ingresos',
    },
    {
      title: 'Usuarios',
      iconUrl: '/ico-usuarios.png',
      route: '/usuarios',
    }
  ]
}
