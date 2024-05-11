import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../constants/localstorage-keys';
import { HttpClient } from '@angular/common/http';
import { JWT } from '../models/jwt.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(): Observable<JWT> {
    return this.http.get<JWT>('./assets/data/login.json');
  }

  getUsername() {
    return localStorage.getItem(LocalStorageKeys.USERNAME);
  }

  isLoggedIn() {
    return localStorage.getItem(LocalStorageKeys.TOKEN) !== null;
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
