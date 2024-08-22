import { Injectable } from '@angular/core';
import {throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MessageService {
  fullWidth: boolean = true;
  constructor() { }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Ha ocurrido un Error y no se podrá realizar su solicitud..........
      Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  toggleFullWidth(): void {
    this.fullWidth = !this.fullWidth;
  }
}
