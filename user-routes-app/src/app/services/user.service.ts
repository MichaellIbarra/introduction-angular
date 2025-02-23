import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    { id: 1, name: 'Matichelo', lastname: 'Ibarra', email: 'mati@mati.com', username: 'matichelo', password: '123456'},
    { id: 2, name: 'Estiven', lastname: 'Martinez', email: 'estiven@mati.com', username: 'estiven', password: '123456'},

  ]

  constructor() { }

  // Observable es una clase que permite la comunicación entre componentes y servicios para compartir información
  getUsers(): Observable<User[]>{
    // of() es una función que permite retornar un observable
    return of(this.users);
  }

}
