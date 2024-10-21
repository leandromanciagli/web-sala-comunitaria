import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { showLoader, hideLoader } from '../loader/loader.actions';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private store: Store,
  ) { }

}
