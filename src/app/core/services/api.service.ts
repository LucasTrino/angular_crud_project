import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IApiResponse } from '../interfaces/api-response';
import { environment } from '../../../environments/environment';
import { HttpsErrorHandling } from '../services/https-error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiHost;

  constructor(private http: HttpClient, private httpsErrorHandler: HttpsErrorHandling) { }

  // GET request
  get(endpoint: string, params?: any): Observable<any> {
    const options = params ? { params: new HttpParams({ fromObject: params }) } : {};
    return this.http.get<IApiResponse>(`${this.apiUrl}/${endpoint}`, options)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  // POST request
  post(endpoint: string, body: any): Observable<any> {
    return this.http.post<IApiResponse>(`${this.apiUrl}/${endpoint}`, body)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  // PUT request
  put(endpoint: string, body: any): Observable<any> {
    return this.http.put<IApiResponse>(`${this.apiUrl}/${endpoint}`, body)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  // DELETE request
  delete(endpoint: string): Observable<any> {
    return this.http.delete<IApiResponse>(`${this.apiUrl}/${endpoint}`)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    const CustomHttpsError = this.httpsErrorHandler.handleHttpError(error);
    console.error(`${CustomHttpsError.code} : ${CustomHttpsError.message}`);
    return throwError(() => CustomHttpsError);
  }
}
