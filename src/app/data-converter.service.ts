import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataConverterService {

  constructor() { }

  ConvertDateToString(dateToConvert: Date): string {
    if (dateToConvert) {
      return dateToConvert.toDateString();
    } else {
      return '';
    }
  }
}
