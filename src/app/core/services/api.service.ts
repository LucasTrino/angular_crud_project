import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IApiResponse } from '../interfaces/api-response';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiHost;

  constructor(private http: HttpClient) { }

  // GET request
  get(endpoint: string, params?: any): Observable<any> {
    const options = params ? { params: new HttpParams({ fromObject: params }) } : {};
    return this.http.get<IApiResponse>(`${this.apiUrl}/${endpoint}`, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  // POST request
  post(endpoint: string, body: any): Observable<any> {
    return this.http.post<IApiResponse>(`${this.apiUrl}/${endpoint}`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  // PUT request
  put(endpoint: string, body: any): Observable<any> {
    return this.http.put<IApiResponse>(`${this.apiUrl}/${endpoint}`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  // DELETE request
  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => ('Something bad happened; please try again later.'));
  }
}
