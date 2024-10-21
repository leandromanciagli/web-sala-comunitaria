import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class MateriaPrimaService {
  
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/materiaPrima`).pipe(delay(500));
  }

  create(materiaPrima: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/materiaPrima`, materiaPrima).pipe(delay(500));
  }

  update(id: string, materiaPrima: any): Observable<any[]> {
    return this.http.patch<any[]>(`${this.apiUrl}/materiaPrima/${id}`, materiaPrima).pipe(delay(500));
  }

  delete(id: string): Observable<any[]> {    
    return this.http.delete<any[]>(`${this.apiUrl}/materiaPrima/${id}`).pipe(delay(500));
  }
}
