import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeHelper {
  constructor() {}
  /**
   * Formatea una fecha en un string YYYY-MM-DD.
   * @param date Fecha a formatear
   * @returns Fecha en formato YYYY-MM-DD
   */
  formatDateToString(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const monthString = month < 10 ? `0${month}` : `${month}`;
    const dayString = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${monthString}-${dayString}`;
  }
}
