import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ProductoraAgricolaService {
  
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productoraAgricola`).pipe(delay(500));
  }

  create(productoraAgricola: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/productoraAgricola`, productoraAgricola).pipe(delay(500));
  }

  update(id: string, productoraAgricola: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/productoraAgricola/${id}`, productoraAgricola).pipe(delay(500));
  }

  delete(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/productoraAgricola/${id}`).pipe(delay(500));
  }
}
