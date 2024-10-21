import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class IngresoMateriaPrimaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ingresoMateriaPrima`).pipe(delay(500));
  }

  create(ingresoMateriaPrima: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/ingresoMateriaPrima`, ingresoMateriaPrima).pipe(delay(500));
  }
}

