import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../constants/localstorage-keys';
import { HttpClient } from '@angular/common/http';
import { JWT } from '../models/jwt.model';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalstorageService
  ) {}

  public login(): Observable<JWT> {
    return this.http.get<JWT>('./assets/data/login.json');
  }

  getUsername() {
    return this.localStorageService.getItem(LocalStorageKeys.USERNAME);
  }

  isLoggedIn() {
    return this.localStorageService.getItem(LocalStorageKeys.TOKEN) !== null;
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
