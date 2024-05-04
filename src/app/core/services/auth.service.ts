import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../constants/localstorage-keys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(username: string) {
    localStorage.setItem(LocalStorageKeys.USERNAME, username);
  }

  getUsername() {
    return localStorage.getItem(LocalStorageKeys.USERNAME);
  }
}
