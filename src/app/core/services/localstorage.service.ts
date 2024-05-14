import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../constants/localstorage-keys';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string {
    return localStorage.getItem(key) || '';
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setObject(key: LocalStorageKeys, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getObject(key: any): any {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  removeObject(key: LocalStorageKeys, id: string): void {
    const data = this.getObject(key);
    delete data[id];
    this.setObject(key, data);
  }
}
