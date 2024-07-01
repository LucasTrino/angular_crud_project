import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';

import { MessageService } from '../services/message.service';
import { UserMessages  } from '../classes/user-messages';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(
    private apiService: ApiService,
    private messageService: MessageService
  ) {}

  getAll(endpoint: string): Observable<any> {
    return this.apiService.get(endpoint).pipe(
      catchError((error) => {
        this.handleError(error, 'getAll', endpoint, null);
        return throwError(() => error);
      })
    );
  }

  getById(endpoint: string, id: string): Observable<any> {
    return this.apiService.get(`${endpoint}/${id}`).pipe(
      catchError((error) => {
        this.handleError(error, 'getById', endpoint, null);
        return throwError(() => error);
      })
    );
  }

  create(endpoint: string, data: any): Observable<any> {
    return this.apiService.post(endpoint, data).pipe(
      tap(() => {
        this.messageService.showSuccess(UserMessages.SUCCESS_RECORD_CREATED);
      }),
      catchError((error) => {
        this.handleError(error, 'create', endpoint, null);
        return throwError(() => error);
      })
    );
  }

  update(endpoint: string, id: string, data: any): Observable<any> {
    return this.messageService.showConfirmation('CONFIRM_UPDATE').pipe(
      switchMap((result) => {
        if (result) {
          return this.apiService.put(`${endpoint}/${id}`, data).pipe(
            tap(() => {
              this.messageService.showSuccess(UserMessages.SUCCESS_RECORD_UPDATED);
            }),
            catchError((error) => {
              this.handleError(error, 'update', endpoint, id);
              return throwError(() => error);
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  delete(endpoint: string, id: string): Observable<any> {
    return this.messageService.showConfirmation('CONFIRM_DELETE').pipe(
      switchMap((result) => {
        if (result) {
          return this.apiService.delete(`${endpoint}/${id}`).pipe(
            tap(() => {
              this.messageService.showSuccess(UserMessages.SUCCESS_RECORD_DELETED);
            }),
            catchError((error) => {
              this.handleError(error, 'delete', endpoint, id);
              return throwError(() => error);
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  private handleError(error: any, operation: string, endpoint: string, id: string | null): void {
    const endpointMessage = id ? `${endpoint}/${id}` : `${endpoint}`
    console.error(`Error during ${operation} operation at endpoint : ${endpointMessage}`, error.message);
  }
}
