import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-localstorage-sessionstorage',
  standalone: true,
  imports: [],
  templateUrl: './localstorage-sessionstorage.component.html',
  styleUrl: './localstorage-sessionstorage.component.css'
})
export class LocalstorageSessionstorageComponent implements OnInit{

  counter1: number= 0;
  counter2: number= 0;

  ngOnInit(): void {
    // Diferencia entre SessionStorage y LocalStorage 
    // SessionStorage: se borra al cerrar la pestaña del navegador
    // LocalStorage: es persistente, se borra al cerrar el navegador
    // el uso de ! es para indicar que el valor no es nulo o indefinido
    // ? es para indicar que el valor puede ser nulo o indefinido
    this.counter1 = parseInt(localStorage.getItem('counter1')!) || 0;
    this.counter2 = parseInt(sessionStorage.getItem('counter2')!) || 0;
  }


  setCounterLocalStorage(){
    this.counter1++;
    localStorage.setItem('counter1', this.counter1.toString());
  }

  setCounterSessionStorage(){
    this.counter2++;
    sessionStorage.setItem('counter2', this.counter2.toString());
  }


}
