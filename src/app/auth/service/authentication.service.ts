import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }
  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(username: string, password) {
    const params = new HttpParams()
        .set('usuario', username)
        .set('password', password)
        .set("flag", "-1");
    return this._http
        .post<any>(`${environment.apiUrl}/login/auth`, params)
        .pipe(
            map(user => {
              // login successful if there's a jwt token in the response
              if (user.status === -2) { //cuando el socio es reseteado
              }
              if (user.list === 'WRONG_USERNAME') {
              }
              if (user.list === 'MISSING_CREDENTIAL') {
              }
              if (user.list === 'DISABLED') {
              }
              if (user.list === 'WRONG_PASSWORD') {

              }
              if (user.list === 'WRONG_PASSWORD_TEMP') {

              }
              if (user && user.status === 1) {
                // this._toastrService.success(
                //       'Bienvenido a la Banca web, se ha enviado un código transaccional a su teléfono o email revise por favor  Gracias! 👋 ', '',
                //       {toastClass: 'toast ngx-toastr', closeButton: true}
                //   );

                setTimeout(() => {
                }, 2500);
                // notify
                this.currentUserSubject.next(user);
                //console.log(user)
              }
              return user;
            })
        );
  }

  /**
   * User logout
   *
   */
  logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('datosPaciente');
    this.currentUserSubject.next(null);
  }
}
