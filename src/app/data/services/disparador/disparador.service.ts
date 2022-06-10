import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisparadorService {

  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() avatar: EventEmitter<any> = new EventEmitter();
  @Output() deleteArchivo: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
