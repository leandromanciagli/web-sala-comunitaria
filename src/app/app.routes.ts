import { Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HomeComponent } from './home/home.component';
import { ProductoraAgricolaComponent } from './productora-agricola/productora-agricola.component';
import { MateriasPrimasComponent } from './materias-primas/materias-primas.component';
import { IngresosMateriaPrimaComponent } from './ingresos-materia-prima/ingresos-materia-prima.component';



export const routes: Routes = 
    [
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'produccion', component: ProductoraAgricolaComponent },
        { path: 'materiasPrimas', component: MateriasPrimasComponent },
        { path: 'ingresos', component: IngresosMateriaPrimaComponent },
        { path: '', component: HomeComponent },        
    ];
