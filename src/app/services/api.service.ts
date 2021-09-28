import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  get(path: string, prms?: HttpParams): Observable<any> {
    return this.http.get(`${environment.API_URL_BASE}${path}`, {params: prms})
      .pipe(
        catchError(ApiService.handleError)
      );
  }

  getBlob(path: string): Observable<any> {
    return this.http.get(`${environment.API_URL_BASE}${path}`,
      {
        responseType: 'blob'
      })
      .pipe(
        catchError(ApiService.handleError)
      );
  }

  post(path: string, body: any = {}): Observable<any> {
    return this.http.post(`${environment.API_URL_BASE}${path}`, body)
      .pipe(
        catchError(ApiService.handleError)
      );
  }


  put(path: string, body: any = {}): Observable<any> {
    return this.http.put(`${environment.API_URL_BASE}${path}`, body)
      .pipe(
        catchError(ApiService.handleError)
      );
  }

  delete(path: string, body: any = {}): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {...body}
    };
    return this.http.delete(`${environment.API_URL_BASE}${path}`, options)
      .pipe(
        catchError(ApiService.handleError)
      );
  }

  static handleError(err: any): Observable<any> {
    return throwError(err.error);
  }
}
